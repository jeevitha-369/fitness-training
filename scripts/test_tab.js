import { spawn } from "child_process";

const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new",
  "--remote-debugging-port=9224",
  "--user-data-dir=/tmp/chrome-tab-test"
]);

chrome.stderr.on("data", d => console.error("CHROME_ERR:", d.toString()));

async function check() {
  await new Promise(r => setTimeout(r, 1200));
  const res = await fetch("http://127.0.0.1:9224/json/list");
  const list = await res.json();
  console.log("TARGETS_COUNT:", list.length);
  console.log("FIRST_TARGET:", list[0]);
  chrome.kill();
}
check();
