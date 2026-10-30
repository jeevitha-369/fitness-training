import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const exercisesDir = path.join(projectRoot, 'public', 'videos', 'exercises');
const previewsDir = path.join(projectRoot, 'public', 'previews');

const PORT = 8769;
const CHROME_PORT = 9239;

// ONLY the 6 targeted exercises specified in the prompt
const TARGETED_EXERCISE_LIST = [
  {
    name: 'Wall Push-Ups',
    id: 'wall-pushups',
    duration: 6.98,
    camera: { pos: [-2.5, 1.25, 0.40], target: [0, 1.05, 0.40] },
    hasWall: true,
    isFloor: false
  },
  {
    name: 'Push-Ups',
    id: 'push-ups',
    duration: 6.28,
    camera: { pos: [-2.4, 0.95, 1.4], target: [0, 0.40, -0.3] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Bodyweight Squats',
    id: 'bodyweight-squats',
    duration: 6.28,
    camera: { pos: [-2.4, 1.20, 2.7], target: [0, 0.90, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Squats',
    id: 'squats',
    duration: 6.28,
    camera: { pos: [-2.4, 1.20, 2.7], target: [0, 0.90, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Reverse Lunges',
    id: 'reverse-lunges',
    duration: 6.98,
    camera: { pos: [-2.4, 1.20, 2.6], target: [0, 0.90, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Mountain Climbers',
    id: 'mountain-climbers',
    duration: 6.61,
    camera: { pos: [-2.6, 0.85, 0.20], target: [0, 0.42, -0.3] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Burpees',
    id: 'burpees',
    duration: 5.60,
    camera: { pos: [-2.4, 1.30, 2.8], target: [0, 0.75, -0.1] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Jumping Lunges',
    id: 'jumping-lunges',
    duration: 6.00,
    camera: { pos: [-2.4, 1.25, 2.5], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  }
];

let savedCount = 0;
const totalExpected = TARGETED_EXERCISE_LIST.length * 2; // both .webm and .mp4

const studioHtmlPath = path.join(__dirname, 'studio.html');

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/three')) {
    const filename = path.basename(req.url);
    const threePath = path.join(projectRoot, 'node_modules', 'three', 'build', filename);
    if (fs.existsSync(threePath)) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      fs.createReadStream(threePath).pipe(res);
      return;
    }
  }

  if (req.url === '/save-video' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(Buffer.concat(body).toString());
        const { filename, base64 } = payload;
        const filePath = path.join(exercisesDir, filename);
        const buf = Buffer.from(base64, 'base64');
        fs.writeFileSync(filePath, buf);
        savedCount++;
        console.log(`[SAVED ${savedCount}/${totalExpected}] ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, size: buf.length }));
      } catch (err) {
        console.error('[SAVE_ERROR]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.url === '/save-preview' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(Buffer.concat(body).toString());
        const { filename, base64 } = payload;
        const filePath = path.join(previewsDir, filename);
        const buf = Buffer.from(base64, 'base64');
        fs.writeFileSync(filePath, buf);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.url === '/exercises.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(TARGETED_EXERCISE_LIST));
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(studioHtmlPath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, async () => {
  console.log(`[HTTP] Targeted animation studio server running at http://localhost:${PORT}`);

  console.log(`[CHROME] Launching headless Chrome with port ${CHROME_PORT}...`);
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--user-data-dir=/tmp/fittrack-targeted-profile',
    '--no-sandbox',
    '--disable-gpu-sandbox',
    '--use-gl=angle'
  ]);

  let connected = false;
  for (let attempt = 0; attempt < 25; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/version`);
      if (res.ok) { connected = true; break; }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 400));
  }
  if (!connected) throw new Error('Could not connect to Chrome on port ' + CHROME_PORT);

  try {
    console.log('[CDP] Creating new page tab pointing to http://localhost:' + PORT + '/ ...');
    const newTab = await (await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://localhost:${PORT}/`, {
      method: 'PUT'
    })).json();

    const wsUrl = newTab.webSocketDebuggerUrl;
    console.log('[CDP] Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const id = msgId++;
        const handler = m => {
          const data = JSON.parse(m.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onmessage = m => {
      const data = JSON.parse(m.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        const text = data.params.args.map(a => a.value || '').join(' ');
        console.log('[BROWSER_CONSOLE]', text);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER_EXCEPTION]', JSON.stringify(data.params.exceptionDetails));
      }
    };

    await send('Runtime.enable');
    await send('Page.enable');

    console.log('[CDP] Waiting for page script to initialize...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('[RECORDER] Triggering window.runAll() for 6 targeted exercises...');
    await send('Runtime.evaluate', {
      expression: 'window.runAll()',
      awaitPromise: false
    });

    let complete = false;
    while (!complete) {
      await new Promise(r => setTimeout(r, 2000));
      const res = await send('Runtime.evaluate', {
        expression: 'window.allDone',
        returnByValue: true
      });
      complete = res?.result?.value === true;
    }

    console.log('[SUCCESS] All 6 targeted exercises genuinely regenerated and recorded in MP4 & WebM!');
  } catch (err) {
    console.error('[FATAL_ERROR]', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
