import { spawn } from 'child_process';

const CHROME_PORT = 9235;

async function run() {
  console.log('[VERIFIER] Launching Chrome...');
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--user-data-dir=/tmp/fittrack-verify-profile'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  try {
    const newTab = await (await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://localhost:5173/`, { method: 'PUT' })).json();
    const ws = new WebSocket(newTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const id = msgId++;
        const handler = m => {
          const d = JSON.parse(m.data);
          if (d.id === id) {
            ws.removeEventListener('message', handler);
            resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res?.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 2000));

    console.log('[TEST 1] Verifying app loaded and navigation tabs...');
    const title = await evaluate('document.title');
    console.log('  Page Title:', title);

    const navTabs = await evaluate(`
      Array.from(document.querySelectorAll('.nav-link, .nav-item, nav button')).map(e => e.textContent.trim())
    `);
    console.log('  Navigation items found:', navTabs);

    console.log('[TEST 2] Navigating to Workout Guidance...');
    // Click on Tracker or Guide button
    await evaluate(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Workout Plans') || b.textContent.includes('Tracker') || b.textContent.includes('Start Training'));
      if (btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 1000));

    // Open Exercise Guide for first exercise
    await evaluate(`
      const guideBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Guide') || b.textContent.includes('Workout Guide') || b.textContent.includes('Watch Demonstration') || b.classList.contains('exercise-card') || b.classList.contains('start-exercise-btn'));
      if (guideBtn) guideBtn.click();
    `);
    await new Promise(r => setTimeout(r, 1200));

    console.log('[TEST 3] Checking video initial state & Complete button...');
    const playerCheck = await evaluate(`
      (() => {
        const video = document.querySelector('video');
        const startHeroBtn = document.querySelector('.btn-start-hero');
        const completeBtn = document.querySelector('.btn-mark-done');
        const comingSoon = document.querySelector('.placeholder-title');

        return {
          hasVideo: Boolean(video),
          videoSrc: video ? video.currentSrc || video.src : null,
          isPaused: video ? video.paused : null,
          hasStartHero: Boolean(startHeroBtn),
          completeDisabled: completeBtn ? completeBtn.disabled : null,
          completeText: completeBtn ? completeBtn.textContent.trim() : null,
          hasComingSoon: Boolean(comingSoon)
        };
      })()
    `);
    console.log('  Initial Player Check:', playerCheck);

    if (!playerCheck.isPaused) {
      throw new Error('FAILED: Video must be paused until Start is pressed!');
    }
    if (!playerCheck.completeDisabled) {
      throw new Error('FAILED: Complete button must be DISABLED before exercise starts!');
    }
    if (playerCheck.hasComingSoon) {
      throw new Error('FAILED: Found "Coming Soon" placeholder!');
    }

    console.log('[TEST 4] Pressing Start Exercise & Timer...');
    await evaluate(`
      const startBtn = document.querySelector('.btn-start-hero') || document.querySelector('.timer-toggle-btn');
      if (startBtn) startBtn.click();
    `);
    await new Promise(r => setTimeout(r, 1500));

    const runningCheck = await evaluate(`
      (() => {
        const video = document.querySelector('video');
        const completeBtn = document.querySelector('.btn-mark-done');
        const countdownNumber = document.querySelector('.countdown-number')?.textContent;
        return {
          isPaused: video ? video.paused : null,
          completeDisabled: completeBtn ? completeBtn.disabled : null,
          completeText: completeBtn ? completeBtn.textContent.trim() : null,
          countdownNumber
        };
      })()
    `);
    console.log('  Running State Check:', runningCheck);

    if (runningCheck.isPaused) {
      throw new Error('FAILED: Video should be playing when Start is clicked!');
    }
    if (!runningCheck.completeDisabled) {
      throw new Error('FAILED: Complete button must STAY DISABLED while timer is running!');
    }

    console.log('[TEST 5] Testing all 3 levels (Beginner, Intermediate, Advanced)...');
    for (const level of ['Beginner', 'Intermediate', 'Advanced']) {
      await evaluate(`
        const lvlBtn = Array.from(document.querySelectorAll('.level-pill-btn')).find(b => b.textContent.includes('${level}'));
        if (lvlBtn) lvlBtn.click();
      `);
      await new Promise(r => setTimeout(r, 600));

      const exercisesInLevel = await evaluate(`
        Array.from(document.querySelectorAll('.playlist-chip .chip-name')).map(e => e.textContent.trim())
      `);
      console.log(`  Level "${level}" exercises:`, exercisesInLevel);

      // Verify each exercise in this level loads a valid local video with no errors
      for (let i = 0; i < exercisesInLevel.length; i++) {
        await evaluate(`
          const chips = document.querySelectorAll('.playlist-chip');
          if (chips[${i}]) chips[${i}].click();
        `);
        await new Promise(r => setTimeout(r, 500));

        const exCheck = await evaluate(`
          (() => {
            const video = document.querySelector('video');
            const error = document.querySelector('.video-placeholder-card');
            const heading = document.querySelector('.current-exercise-title')?.textContent;
            return {
              heading,
              videoSrc: video ? (video.currentSrc || video.src || '') : null,
              hasError: Boolean(error)
            };
          })()
        `);
        console.log(`    [${level} ${i + 1}/${exercisesInLevel.length}] ${exCheck.heading}: ${exCheck.videoSrc} (hasError: ${exCheck.hasError})`);
        if (exCheck.hasError) {
          throw new Error('FAILED: Exercise ' + exCheck.heading + ' has video error!');
        }
      }
    }

    console.log('\n[ALL VERIFICATION TESTS PASSED SUCCESSFULLY!]');
  } catch (err) {
    console.error('[TEST_FAILURE]', err);
    process.exit(1);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

run();
