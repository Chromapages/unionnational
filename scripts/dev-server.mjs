import { spawn } from "node:child_process";
import path from "node:path";

const port = process.argv[2] || "3000";
const distDir = process.argv[3] || `.next-${port}`;
const nextBin = path.resolve("node_modules/next/dist/bin/next");

const child = spawn(
  process.execPath,
  [nextBin, "dev", "--webpack", "--port", port],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_DIST_DIR: distDir,
    },
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
