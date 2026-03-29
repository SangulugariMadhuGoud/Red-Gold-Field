// Server startup - starts the Express server and listens on specified port
import env from "./config/env.js";
import app from "./app.js";

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please stop the running process or use a different port.`,
    );
    process.exit(1);
  }
  console.error("Server error:", err);
  process.exit(1);
});
