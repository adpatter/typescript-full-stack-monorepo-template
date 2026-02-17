import { mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = resolve(root, "dist");
const srcDir = resolve(root, "src");

const filesToCopy = ["index.html", "styles.css"];

await mkdir(distDir, { recursive: true });

await Promise.all(filesToCopy.map((file) => copyFile(resolve(srcDir, file), resolve(distDir, file))));
