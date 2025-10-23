import { createApp } from "./app.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

describe("app", () => {
  let app;
  let handlers;

  beforeEach(() => {
    const { server, handlers: h } = createApp();
    app = server;
    handlers = h;
  });

  it("should list the say_hello tool", async () => {
    const handler = handlers.get(ListToolsRequestSchema);
    const result = await handler({});
    expect(result.tools).toHaveLength(1);
    expect(result.tools[0].name).toBe("say_hello");
  });

  it("should call the say_hello tool", async () => {
    const handler = handlers.get(CallToolRequestSchema);
    const result = await handler({
      params: {
        name: "say_hello",
        arguments: { name: "Test" },
      },
    });
    expect(result.content[0].text).toBe("Hello world, Test");
  });

  it("should throw an error for an unknown tool", async () => {
    const handler = handlers.get(CallToolRequestSchema);
    await expect(
      handler({
        params: {
          name: "unknown_tool",
          arguments: {},
        },
      }),
    ).rejects.toThrow("Unknown tool: unknown_tool");
  });
});
