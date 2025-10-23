import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export function createApp() {
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

  const handlers = new Map();

  const sayHelloMeta = {
    name: "say_hello",
    description: "Says hello to a person",
    inputSchema: zodToJsonSchema(
      z.object({
        name: z.string().describe("The name of the person to greet"),
      }),
    ),
  };

  // what tools are available
  const listToolsHandler = async () => {
    return {
      tools: [sayHelloMeta],
    };
  };
  server.setRequestHandler(ListToolsRequestSchema, listToolsHandler);
  handlers.set(ListToolsRequestSchema, listToolsHandler);

  // call the requested tools
  const callToolHandler = async (request) => {
    const { name, arguments: args } = request.params;

    if (name === sayHelloMeta.name) {
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

    throw new McpError(`Unknown tool: ${name}`);
  };
  server.setRequestHandler(CallToolRequestSchema, callToolHandler);
  handlers.set(CallToolRequestSchema, callToolHandler);

  return { server, handlers };
}
