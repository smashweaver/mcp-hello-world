# mcp-hello-world

MCP server that says hello.

## Requirements

- Node.js >= 18

## Installation

```bash
npm install
```

## Usage

### Zed

To use this server with Zed, add the following to your `~/.config/zed/settings.json` file:

```json
"context_servers": {
    "hello-world": {
      "enabled": true,
      "source": "custom",
      "command": "node",
      "args": ["/path/to/your/mcp-hello-world/src/index.js"]
    }
  }
```

### Gemini CLI

To use this server with the Gemini CLI, add the following to your `~/.gemini/settings.json` file:

```json
"mcpServers": {
    "hello-world": {
      "command": "node",
      "args": ["/path/to/your/mcp-hello-world/src/index.js"]
    }
  }
```
