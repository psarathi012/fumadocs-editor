"use server";
import * as fs from "fs";
import * as path from "path";

function writeToFile(filePath: string, value: string) {
  // Resolve the relative file path to an absolute path
  const resolvedPath = path.resolve(process.cwd(), filePath);

  // Convert the value to a string if it's not already one
  const valueToWrite = typeof value === "string" ? value : JSON.stringify(value, null, 2);

  // Write the value to the file
  fs.writeFileSync(resolvedPath, valueToWrite);
}

export async function onChangeFileEdit({ filePath, content }: { filePath: string; content: string }) {
  writeToFile(filePath, content);
}
