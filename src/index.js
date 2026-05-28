import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

// Import and init Sentry SDK
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://d7c05a8efa9a5d2a8980c9c3982b28eb@o4511450917634048.ingest.us.sentry.io/4511451558707200",
  integrations: [
      Sentry.browserTracingIntegration(),
      // send console.log, console.warn, and console.error calls as logs to Sentry
      Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
    beforeSendLog: (log) => {
        if (log.level === "info") {
            // Filter out all info logs
            return null;
        }

        if (log.attributes.environment === "development") {
            // Don't send logs from debugging environment
            return null;
        }

        return log;
    },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
