import { pageTree } from "../source";
import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import CodeEditor from "./edtior";
import * as fs from "fs";

export function readFileContent({
  pathToFile,
  buildTimeFallBackPath,
  shouldBeParsedAsJson = false,
}: {
  pathToFile: string;
  buildTimeFallBackPath?: string;
  shouldBeParsedAsJson?: boolean;
}) {
  try {
    let filePath = pathToFile;
    if (buildTimeFallBackPath) {
      if (!fs.existsSync(filePath)) {
        filePath = buildTimeFallBackPath;
      }
    }
    const content = fs.readFileSync(filePath, "utf8");
    if (shouldBeParsedAsJson) {
      return JSON.parse(content);
    }
    return content;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return "File not found";
    } else {
      return `An error occurred: ${error.message}`;
    }
  }
}

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  const mdxContent = readFileContent({
    pathToFile: "./content/docs/index.mdx",
  });

  return (
    <div className="flex min-h-screen w-full items-center divide-x-2 divide-dashed">
      <div className="w-5/12 h-full min-h-screen">
        <CodeEditor initialContent={mdxContent} />
      </div>
      <div className="flex-1 h-full min-h-screen">
        <DocsLayout tree={pageTree} nav={{ enabled: false }} sidebar={{ enabled: false }}>
          {children}
        </DocsLayout>
      </div>
    </div>
  );
}
