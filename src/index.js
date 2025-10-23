#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "hello-world",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// what tools are available
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "say_hello",
        description: "Says hello to a person",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

// call the requested tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name == "say_hello") {
    const personName = args.name;
    return {
      content: [
        {
          type: "text",
          text: `Hello world, ${personName}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: #{name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport(); // create a communication channel via stdin/stdout
  await server.connect(transport); // starts listening for mcp messages
  console.error("Hello world MCP server running"); // use stderr for logs (stdout for mcp protocol)
}

// handle start up errors
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
