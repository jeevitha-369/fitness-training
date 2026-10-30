import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const exercisesDir = path.join(projectRoot, 'public', 'videos', 'exercises');

const PORT = 8771;
const CHROME_PORT = 9232;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/three')) {
    const fn = path.basename(req.url);
    const p = path.join(projectRoot, 'node_modules', 'three', 'build', fn);
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(p).pipe(res);
    return;
  }
  if (req.url === '/save-video' && req.method === 'POST') {
    let b = [];
    req.on('data', c => b.push(c));
    req.on('end', () => {
      const p = JSON.parse(Buffer.concat(b).toString());
      fs.writeFileSync(path.join(exercisesDir, p.filename), Buffer.from(p.base64, 'base64'));
      console.log('[SAVED_TARGETED]', p.filename);
      res.writeHead(200);
      res.end();
    });
    return;
  }
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getHtml());
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, async () => {
  console.log('[SERVER] Listening on ' + PORT);
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--user-data-dir=/tmp/fittrack-chrome-wall'
  ]);
  await new Promise(r => setTimeout(r, 1200));
  const newTab = await (await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://localhost:${PORT}/`, { method: 'PUT' })).json();
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

  await send('Runtime.enable');
  await send('Page.enable');
  await new Promise(r => setTimeout(r, 1500));

  await send('Runtime.evaluate', { expression: 'window.recordWall()', awaitPromise: false });

  let done = false;
  while (!done) {
    await new Promise(r => setTimeout(r, 1000));
    const res = await send('Runtime.evaluate', { expression: 'window.allDone', returnByValue: true });
    done = res?.result?.value === true;
  }

  console.log('[SUCCESS] Wall Push-Ups video re-recorded!');
  chrome.kill();
  server.close();
  process.exit(0);
});

function getHtml() {
  return `<!DOCTYPE html><html><body>
  <div id="c-wrap" style="width:960px;height:540px;"></div>
  <script type="module">
    import * as THREE from '/three.module.js';

    const wrap = document.getElementById('c-wrap');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f111a');

    const camera = new THREE.PerspectiveCamera(45, 960/540, 0.1, 100);
    // Profile side-angle view: camera is on left side looking at character leaning toward wall on right
    camera.position.set(-2.4, 1.25, 0.45);
    camera.lookAt(0, 1.05, 0.45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(960, 540);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    wrap.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight('#ffffff', '#3b335c', 1.2);
    scene.add(hemi);
    const key = new THREE.DirectionalLight('#ffffff', 2.0);
    key.position.set(-3.5, 4.5, 3.5);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight('#00cec9', 0.8);
    rim.position.set(2.5, 3.5, -2.5);
    scene.add(rim);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), new THREE.MeshStandardMaterial({ color: '#161922', roughness: 0.85 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);
    scene.add(new THREE.GridHelper(14, 28, '#2d3436', '#1a1d26'));

    // Studio Wall at z = 0.82
    const wallGroup = new THREE.Group();
    wallGroup.position.set(0, 1.6, 0.82);
    const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.4, 0.16), new THREE.MeshStandardMaterial({ color: '#252936', roughness: 0.85 }));
    wallMesh.receiveShadow = true;
    wallGroup.add(wallMesh);
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.18, 0.04), new THREE.MeshStandardMaterial({ color: '#6c5ce7', roughness: 0.6 }));
    baseboard.position.set(0, -1.6, 0.08);
    wallGroup.add(baseboard);

    // Target hand contact rings
    const ringL = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.085, 32), new THREE.MeshStandardMaterial({ color: '#00cec9', emissive: '#00cec9', emissiveIntensity: 0.6 }));
    ringL.position.set(-0.34, -0.22, 0.086);
    wallGroup.add(ringL);
    const ringR = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.085, 32), new THREE.MeshStandardMaterial({ color: '#00cec9', emissive: '#00cec9', emissiveIntensity: 0.6 }));
    ringR.position.set(0.34, -0.22, 0.086);
    wallGroup.add(ringR);
    scene.add(wallGroup);

    // Human Model
    const charRoot = new THREE.Group();
    scene.add(charRoot);
    const hips = new THREE.Group();
    hips.position.set(0, 1.05, 0);
    charRoot.add(hips);

    const shortsMat = new THREE.MeshStandardMaterial({ color: '#2d3436', roughness: 0.7 });
    const violetMat = new THREE.MeshStandardMaterial({ color: '#6c5ce7', roughness: 0.6 });
    const skinMat = new THREE.MeshStandardMaterial({ color: '#e5a67c', roughness: 0.7 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: '#5b4bc4', roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: '#2d3436', roughness: 0.9 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 });
    const darkEyeMat = new THREE.MeshStandardMaterial({ color: '#1e272e' });
    const smileMat = new THREE.MeshStandardMaterial({ color: '#c0392b' });

    hips.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.26, 24), shortsMat));
    const torso = new THREE.Group();
    torso.position.set(0, 0.14, 0);
    hips.add(torso);
    const midriff = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.21, 0.22, 24), violetMat);
    midriff.position.set(0, 0.16, 0);
    torso.add(midriff);
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.23, 0.32, 24), shirtMat);
    chest.position.set(0, 0.42, 0);
    torso.add(chest);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.105, 0.14, 20), skinMat);
    neck.position.set(0, 0.62, 0);
    torso.add(neck);

    const head = new THREE.Group();
    head.position.set(0, 0.80, 0);
    torso.add(head);
    head.add(new THREE.Mesh(new THREE.SphereGeometry(0.21, 24, 24), skinMat));
    const headband = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.225, 0.06, 32), violetMat);
    headband.position.set(0, 0.07, 0);
    head.add(headband);
    const hair = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 24), hairMat);
    hair.scale.set(0.23, 0.15, 0.24);
    hair.position.set(0, 0.16, -0.04);
    head.add(hair);
    const hairBun = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), hairMat);
    hairBun.scale.set(0.11, 0.09, 0.11);
    hairBun.position.set(0, 0.24, -0.09);
    head.add(hairBun);

    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.34, 0.52, 0);
    torso.add(leftShoulder);
    leftShoulder.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), shirtMat));
    const lUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.26, 20), skinMat);
    lUpperArm.position.set(0, -0.2, 0);
    leftShoulder.add(lUpperArm);
    const leftElbow = new THREE.Group();
    leftElbow.position.set(0, -0.34, 0);
    leftShoulder.add(leftElbow);
    const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.26, 20), skinMat);
    lForearm.position.set(0, -0.18, 0);
    leftElbow.add(lForearm);
    const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), skinMat);
    lHand.position.set(0, -0.34, 0);
    leftElbow.add(lHand);

    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.34, 0.52, 0);
    torso.add(rightShoulder);
    rightShoulder.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), shirtMat));
    const rUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.26, 20), skinMat);
    rUpperArm.position.set(0, -0.2, 0);
    rightShoulder.add(rUpperArm);
    const rightElbow = new THREE.Group();
    rightElbow.position.set(0, -0.34, 0);
    rightShoulder.add(rightElbow);
    const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.26, 20), skinMat);
    rForearm.position.set(0, -0.18, 0);
    rightElbow.add(rForearm);
    const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), skinMat);
    rHand.position.set(0, -0.34, 0);
    rightElbow.add(rHand);

    const leftHip = new THREE.Group();
    leftHip.position.set(-0.15, -0.12, 0);
    hips.add(leftHip);
    const lThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.38, 24), shortsMat);
    lThigh.position.set(0, -0.22, 0);
    leftHip.add(lThigh);
    const leftKnee = new THREE.Group();
    leftKnee.position.set(0, -0.46, 0);
    leftHip.add(leftKnee);
    const lCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.36, 20), skinMat);
    lCalf.position.set(0, -0.22, 0);
    leftKnee.add(lCalf);
    const leftFoot = new THREE.Group();
    leftFoot.position.set(0, -0.44, 0.07);
    leftKnee.add(leftFoot);
    const lSneaker = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), whiteMat);
    lSneaker.scale.set(0.14, 0.1, 0.26);
    leftFoot.add(lSneaker);

    const rightHip = new THREE.Group();
    rightHip.position.set(0.15, -0.12, 0);
    hips.add(rightHip);
    const rThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.38, 24), shortsMat);
    rThigh.position.set(0, -0.22, 0);
    rightHip.add(rThigh);
    const rightKnee = new THREE.Group();
    rightKnee.position.set(0, -0.46, 0);
    rightHip.add(rightKnee);
    const rCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.36, 20), skinMat);
    rCalf.position.set(0, -0.22, 0);
    rightKnee.add(rCalf);
    const rightFoot = new THREE.Group();
    rightFoot.position.set(0, -0.44, 0.07);
    rightKnee.add(rightFoot);
    const rSneaker = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), whiteMat);
    rSneaker.scale.set(0.14, 0.1, 0.26);
    rightFoot.add(rSneaker);

    function setWallPose(t) {
      const cycle = (1 - Math.cos(t * 1.8)) / 2;
      charRoot.rotation.x = 0.26 + cycle * 0.14;
      charRoot.position.z = -0.18 + cycle * 0.20;
      charRoot.position.y = 0;

      leftShoulder.rotation.x = -1.50 + 0.14 * cycle;
      rightShoulder.rotation.x = -1.50 + 0.14 * cycle;
      leftShoulder.rotation.z = -0.12 - 0.35 * cycle;
      rightShoulder.rotation.z = 0.12 + 0.35 * cycle;

      leftElbow.rotation.x = 0.15 + 1.30 * cycle;
      rightElbow.rotation.x = 0.15 + 1.30 * cycle;

      leftFoot.rotation.x = -0.26 - cycle * 0.14;
      rightFoot.rotation.x = -0.26 - cycle * 0.14;
    }

    window.recordWall = async function() {
      // Warmup
      for (let w = 0; w < 15; w++) {
        setWallPose(w * 0.033);
        renderer.render(scene, camera);
      }

      const stream = renderer.domElement.captureStream(30);
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
      const mr = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 2500000 });
      const chunks = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

      const donePromise = new Promise(resolve => {
        mr.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const reader = new FileReader();
          reader.onloadend = async () => {
            const b64 = reader.result.split(',')[1];
            await fetch('/save-video', { method: 'POST', body: JSON.stringify({ filename: 'wall-pushups.webm', base64: b64 }) });
            await fetch('/save-video', { method: 'POST', body: JSON.stringify({ filename: 'wall-pushups.mp4', base64: b64 }) });
            window.allDone = true;
            resolve();
          };
          reader.readAsDataURL(blob);
        };
      });

      mr.start();
      const fps = 30;
      const duration = 6.98; // 2 cycles
      const total = Math.round(fps * duration);
      for (let f = 0; f < total; f++) {
        setWallPose(f / fps);
        renderer.render(scene, camera);
        await new Promise(r => setTimeout(r, 1000 / fps));
      }
      mr.stop();
      await donePromise;
    };
  </script>
</body></html>`;
}
