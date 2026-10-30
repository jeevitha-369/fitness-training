import { spawn } from 'child_process';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new',
  '--remote-debugging-port=9238',
  '--user-data-dir=/tmp/fittrack-test-dom'
]);

setTimeout(async () => {
  try {
    const newTab = await (await fetch('http://127.0.0.1:9238/json/new?http://localhost:5173/#exerciseGuide', { method: 'PUT' })).json();
    const ws = new WebSocket(newTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function evalCode(expr) {
      return new Promise(resolve => {
        const id = msgId++;
        const handler = m => {
          const d = JSON.parse(m.data);
          if (d.id === id) {
            ws.removeEventListener('message', handler);
            resolve(d.result?.result?.value);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true, awaitPromise: true } }));
      });
    }

    await new Promise(r => setTimeout(r, 1500));

    console.log('ACTIVE_PAGE:', await evalCode('window.location.hash'));
    console.log('TITLE:', await evalCode('document.querySelector(".current-exercise-title")?.textContent'));
    console.log('CHIPS_INITIAL:', await evalCode('Array.from(document.querySelectorAll(".playlist-chip .chip-name")).map(e => e.textContent)'));

    // Click 2nd chip (Bodyweight Squats)
    await evalCode('document.querySelectorAll(".playlist-chip")[1]?.click()');
    await new Promise(r => setTimeout(r, 600));
    console.log('TITLE_AFTER_CHIP_1:', await evalCode('document.querySelector(".current-exercise-title")?.textContent'));

    // Click Intermediate level pill
    await evalCode('Array.from(document.querySelectorAll(".level-pill-btn")).find(b => b.textContent.includes("Intermediate"))?.click()');
    await new Promise(r => setTimeout(r, 800));
    console.log('TITLE_AFTER_INTERMEDIATE:', await evalCode('document.querySelector(".current-exercise-title")?.textContent'));
    console.log('CHIPS_INTERMEDIATE:', await evalCode('Array.from(document.querySelectorAll(".playlist-chip .chip-name")).map(e => e.textContent)'));

    // Click Advanced level pill
    await evalCode('Array.from(document.querySelectorAll(".level-pill-btn")).find(b => b.textContent.includes("Advanced"))?.click()');
    await new Promise(r => setTimeout(r, 800));
    console.log('TITLE_AFTER_ADVANCED:', await evalCode('document.querySelector(".current-exercise-title")?.textContent'));
    console.log('CHIPS_ADVANCED:', await evalCode('Array.from(document.querySelectorAll(".playlist-chip .chip-name")).map(e => e.textContent)'));

    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('TEST_ERR:', err);
    chrome.kill();
    process.exit(1);
  }
}, 1000);
