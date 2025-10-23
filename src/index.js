#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createApp } from "./app.js";

// Start the server
async function main() {
  const server = createApp().server;
  const transport = new StdioServerTransport(); // create a communication channel via stdin/stdout
  await server.connect(transport); // starts listening for mcp messages
  console.error("Hello world MCP server running"); // use stderr for logs (stdout for mcp protocol)
}

// handle start up errors
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
