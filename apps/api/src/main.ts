import * as https from "node:https";
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { isValidEnv } from "./types.js";
import { contentTypeByExtension } from "./commons.js";

if (!isValidEnv(process.env)) {
  process.exit(1);
}

export const { KEY_PATH, CERT_PATH, WEB_ROOT, HOST_NAME, PORT } = process.env;

const webRoot = path.resolve(WEB_ROOT);

const server = https.createServer({
  key: fs.readFileSync(KEY_PATH),
  cert: fs.readFileSync(CERT_PATH),
});

server.listen(Number.parseInt(PORT, 10), HOST_NAME);

server.on(
  "request",
  (
    req: http.IncomingMessage,
    res: http.ServerResponse & {
      req: http.IncomingMessage;
    }
  ) => {
    if (!req.url) {
      res.writeHead(500).end();
      return;
    }

    const url = new URL(req.url, `http://${HOST_NAME}`);
    const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const resolvedPath = path.resolve(webRoot, `.${requestedPath}`);

    if (!resolvedPath.startsWith(webRoot + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(resolvedPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const contentType = contentTypeByExtension.get(path.extname(resolvedPath)) ?? "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  }
);
