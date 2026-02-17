import * as fs from "node:fs";
import * as path from "node:path";

export interface ValidEnv extends NodeJS.ProcessEnv {
  KEY_PATH: string;
  CERT_PATH: string;
  WEB_ROOT: string;
  HOST_NAME: string;
  PORT: string;
}

export const isValidEnv = (env: NodeJS.ProcessEnv): env is ValidEnv => {
  const issues = ["KEY_PATH", "CERT_PATH", "WEB_ROOT", "HOST_NAME", "PORT"]
    .map((key: string) => {
      const value = env[key];
      if (!value || value.trim() == "") {
        return `${key} is missing.`;
      }
      if (key == "PORT") {
        const port = parseInt(value, 10);
        if (!(port > 0 && port <= 65535)) {
          return `${key} is out of range: ${value}`;
        }
      } else if (["KEY_PATH", "CERT_PATH"].includes(key)) {
        try {
          const stats = fs.statSync(value);
          if (!stats.isFile()) {
            return `${key} is not a file: ${value}`;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
          return `${key} is inaccessible: ${value}`;
        }
      } else if (["WEB_ROOT"].includes(key)) {
        try {
          if (!path.isAbsolute(value)) {
            return `${key} must be an absolute path: ${value}`;
          }
          const stats = fs.statSync(value);
          if (!stats.isDirectory()) {
            return `${key} is not a directory: ${value}`;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
          return `${key} is inaccessible: ${value}`;
        }
      }
    })
    .filter((value: unknown): value is string => typeof value === "string");
  if (issues.length) {
    console.error(`Fix your environment settings:\n  ${issues.join("\n  ")}`);
    return false;
  }
  return true;
};
