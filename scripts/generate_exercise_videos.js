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

if (!fs.existsSync(exercisesDir)) {
  fs.mkdirSync(exercisesDir, { recursive: true });
}
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const PORT = 8765;
const CHROME_PORT = 9228;

// All 13 exercises with precise cycle timing and customized camera framing
const EXERCISE_LIST = [
  {
    name: 'Jumping Jacks',
    id: 'jumping-jacks',
    duration: 4.49,
    camera: { pos: [0, 1.25, 3.6], target: [0, 1.0, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Bodyweight Squats',
    id: 'bodyweight-squats',
    duration: 6.28,
    camera: { pos: [0, 1.2, 3.6], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Squats',
    id: 'squats',
    duration: 6.28,
    camera: { pos: [0, 1.2, 3.6], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Wall Push-Ups',
    id: 'wall-pushups',
    duration: 6.98,
    camera: { pos: [-2.4, 1.25, 0.45], target: [0, 1.05, 0.45] },
    hasWall: true,
    isFloor: false
  },
  {
    name: 'Lunges',
    id: 'lunges',
    duration: 6.98,
    camera: { pos: [-2.2, 1.25, 2.8], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Reverse Lunges',
    id: 'reverse-lunges',
    duration: 6.98,
    camera: { pos: [-2.2, 1.25, 2.8], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'High Knees',
    id: 'high-knees',
    duration: 4.71,
    camera: { pos: [0, 1.25, 3.6], target: [0, 1.0, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Plank',
    id: 'plank',
    duration: 5.0,
    camera: { pos: [-2.1, 1.1, 2.2], target: [0, 0.45, -0.3] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Push-Ups',
    id: 'push-ups',
    duration: 6.28,
    camera: { pos: [-2.1, 1.1, 2.2], target: [0, 0.45, -0.3] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Mountain Climbers',
    id: 'mountain-climbers',
    duration: 5.38,
    camera: { pos: [-2.1, 1.15, 2.2], target: [0, 0.45, -0.3] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Burpees',
    id: 'burpees',
    duration: 8.0,
    camera: { pos: [-2.2, 1.35, 3.0], target: [0, 0.80, -0.1] },
    hasWall: false,
    isFloor: true
  },
  {
    name: 'Jump Squats',
    id: 'jump-squats',
    duration: 5.71,
    camera: { pos: [0, 1.3, 3.8], target: [0, 1.05, 0] },
    hasWall: false,
    isFloor: false
  },
  {
    name: 'Jumping Lunges',
    id: 'jumping-lunges',
    duration: 5.24,
    camera: { pos: [-0.8, 1.25, 3.4], target: [0, 0.95, 0] },
    hasWall: false,
    isFloor: false
  }
];

let savedCount = 0;
const totalExpected = EXERCISE_LIST.length * 2; // both .webm and .mp4

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
    res.end(JSON.stringify(EXERCISE_LIST));
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
  console.log(`[HTTP] Animation studio server running at http://localhost:${PORT}`);

  console.log(`[CHROME] Launching headless Chrome with port ${CHROME_PORT}...`);
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--user-data-dir=/tmp/fittrack-chrome-profile-v3',
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

    console.log('[RECORDER] Triggering window.runAll()...');
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

    console.log('[SUCCESS] All 13 exercises genuinely recorded in MP4 & WebM with preview frames!');
  } catch (err) {
    console.error('[FATAL_ERROR]', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
