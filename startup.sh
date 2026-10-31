#!/bin/sh
# Preview/revive entrypoint. Idempotent: exits immediately when the dev server
# is already healthy, otherwise starts it in the background on 0.0.0.0:8080.
cd "$(dirname "$0")" || exit 1
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev > /tmp/irerc-dev.log 2>&1 &
exit 0
