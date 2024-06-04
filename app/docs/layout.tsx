import { pageTree } from "../source";
import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import CodeEditor from "./edtior";
import * as fs from "fs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function readFileContent({
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
    <ResizablePanelGroup
      autoSaveId="persistence"
      direction="horizontal"
      className="h-screen w-full"
    >
      <ResizablePanel collapsible={true} defaultSize={40} minSize={40}>
        <div className="h-screen overflow-auto">
          <CodeEditor initialContent={mdxContent} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={60}>
        <div className="h-screen overflow-auto">
          <DocsLayout tree={pageTree} sidebar={{ enabled: false }}>
            {children}
          </DocsLayout>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
