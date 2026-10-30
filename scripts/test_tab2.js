import { spawn } from "child_process";

const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new",
  "--remote-debugging-port=9225",
  "--user-data-dir=/tmp/chrome-tab-test2"
]);

async function check() {
  await new Promise(r => setTimeout(r, 1200));
  const newTab = await (await fetch("http://127.0.0.1:9225/json/new?https://example.com", { method: "PUT" })).json();
  console.log("NEW_TAB:", newTab);
  chrome.kill();
}
check();
