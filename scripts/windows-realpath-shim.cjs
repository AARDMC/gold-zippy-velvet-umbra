"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS preload shim */

/**
 * Windows-only compatibility shim, loaded with `--require` by the npm scripts.
 *
 * Vite optimizes `fs.realpathSync` on Windows by shelling out to `net use` to
 * detect mapped network drives. Sandboxes that block child processes make that
 * exec throw synchronously and abort config loading. Vite's own code already
 * handles a non-network drive via the `EISDIR` branch, so make the very first
 * native realpath probe report that once; every later call is untouched.
 */
if (process.platform === "win32") {
  const fs = require("node:fs");
  const native = fs.realpathSync.native;
  let firstProbe = true;

  fs.realpathSync.native = function realpathNativeShim(...args) {
    if (firstProbe) {
      firstProbe = false;
      const error = new Error("EISDIR: illegal operation on a directory, realpath");
      error.code = "EISDIR";
      throw error;
    }
    return native.apply(fs.realpathSync, args);
  };
}
