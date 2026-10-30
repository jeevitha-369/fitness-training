import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const previewsDir = '/Users/jeevitha/.gemini/antigravity-ide/brain/29cdc779-81d2-4d42-9e34-80a8662be17f/previews';

const PORT = 8771;
const CHROME_PORT = 9241;

const EXACT_PEAKS = [
  // 1. Wall Push-Ups: elbows bend backward-outward 35-40 deg, hands on wall, safe head clearance
  { exId: 'wall-pushups', name: 'Wall Push-Ups', t: 1.74, label: 'wall-pushups_bottom.png', camera: { pos: [-2.5, 1.25, 0.40], target: [0, 1.05, 0.40] }, hasWall: true, isFloor: false },

  // 2. Push-Ups: toes grounded on mat supporting body, legs straight and aligned with torso
  { exId: 'push-ups', name: 'Push-Ups', t: 1.57, label: 'push-ups_bottom.png', camera: { pos: [-2.4, 0.95, 1.4], target: [0, 0.40, -0.3] }, hasWall: false, isFloor: true },
  { exId: 'push-ups', name: 'Push-Ups', t: 3.14, label: 'push-ups_top.png', camera: { pos: [-2.4, 0.95, 1.4], target: [0, 0.40, -0.3] }, hasWall: false, isFloor: true },

  // 3. Bodyweight Squats & Squats: shoulder-width stance, toes slightly out, heels grounded, no floor penetration
  { exId: 'bodyweight-squats', name: 'Bodyweight Squats', t: 1.57, label: 'bodyweight-squats_bottom.png', camera: { pos: [-2.4, 1.20, 2.7], target: [0, 0.90, 0] }, hasWall: false, isFloor: false },
  { exId: 'squats', name: 'Squats', t: 1.57, label: 'squats_bottom.png', camera: { pos: [-2.4, 1.20, 2.7], target: [0, 0.90, 0] }, hasWall: false, isFloor: false },

  // 4. Reverse Lunges: rear foot backward naturally, front foot flat and stable, no floor sinking
  { exId: 'reverse-lunges', name: 'Reverse Lunges', t: 1.74, label: 'reverse-lunges_lunge.png', camera: { pos: [-2.4, 1.20, 2.6], target: [0, 0.90, 0] }, hasWall: false, isFloor: false },

  // 5. Mountain Climbers: supporting foot toes on floor, smooth knee drive under chest, no floating
  { exId: 'mountain-climbers', name: 'Mountain Climbers', t: 0.45, label: 'mountain-climbers_right_drive.png', camera: { pos: [-2.6, 0.85, 0.20], target: [0, 0.42, -0.3] }, hasWall: false, isFloor: true },

  // 6. Burpees: toes grounded in plank, feet grounded in squat
  { exId: 'burpees', name: 'Burpees', t: 2.40, label: 'burpees_step3_plank.png', camera: { pos: [-2.4, 1.30, 2.8], target: [0, 0.75, -0.1] }, hasWall: false, isFloor: true },

  // 7. Jumping Lunges: feet contact floor correctly, rear knee and foot above floor, no sinking
  { exId: 'jumping-lunges', name: 'Jumping Lunges', t: 0.80, label: 'jumping-lunges_lunge1.png', camera: { pos: [-2.4, 1.25, 2.5], target: [0, 0.95, 0] }, hasWall: false, isFloor: false },
  { exId: 'jumping-lunges', name: 'Jumping Lunges', t: 3.60, label: 'jumping-lunges_lunge2.png', camera: { pos: [-2.4, 1.25, 2.5], target: [0, 0.95, 0] }, hasWall: false, isFloor: false }
];

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

  if (req.url === '/save-frame' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(Buffer.concat(body).toString());
        const { filename, base64 } = payload;
        const filePath = path.join(previewsDir, filename);
        const buf = Buffer.from(base64, 'base64');
        fs.writeFileSync(filePath, buf);
        console.log(`[CAPTURED] ${filename}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
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
  console.log(`[HTTP] Peak capture server running at http://localhost:${PORT}`);

  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--user-data-dir=/tmp/fittrack-peak-profile',
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
    const newTab = await (await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://localhost:${PORT}/`, {
      method: 'PUT'
    })).json();

    const wsUrl = newTab.webSocketDebuggerUrl;
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

    await send('Runtime.enable');
    await send('Page.enable');

    await new Promise(r => setTimeout(r, 2000));

    for (const peak of EXACT_PEAKS) {
      console.log(`[RENDERING_PEAK] ${peak.label} at t = ${peak.t}s...`);
      await send('Runtime.evaluate', {
        expression: `
          (async () => {
            const norm = '${peak.name.toLowerCase().replace(/[^a-z]/g, '')}';
            wallGroup.visible = ${Boolean(peak.hasWall)};
            matGroup.visible = ${Boolean(peak.isFloor)};
            camera.position.set(${peak.camera.pos.join(',')});
            camera.lookAt(${peak.camera.target.join(',')});

            resetTransforms();
            const fps = 30;
            const targetFrame = Math.round(${peak.t} * fps);
            for (let f = 0; f <= targetFrame; f++) {
              applyPose(norm, f / fps);
              renderer.render(scene, camera);
            }

            const canvas = renderer.domElement;
            const dataUrl = canvas.toDataURL('image/png');
            const b64 = dataUrl.split(',')[1];
            await fetch('/save-frame', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: '${peak.label}', base64: b64 })
            });
          })()
        `,
        awaitPromise: true
      });
    }

    console.log('[SUCCESS] All key peak frames captured and saved!');
  } catch (err) {
    console.error('[ERROR]', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
