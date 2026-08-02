import pino from "pino";

// NOTE: deliberately not using pino's `transport: { target: "pino-pretty" }` -
// that spawns a worker thread that resolves its file relative to node_modules,
// which breaks under Next.js's bundler (Turbopack/webpack rewrite import
// paths, so the worker can't find itself) and silently kills every log call,
// including the dev-mode "here's your OTP code" message in src/lib/sms.ts.
// Plain JSON lines are a bit less pretty but reliable everywhere.
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: { service: "uzum-clone" },
});
