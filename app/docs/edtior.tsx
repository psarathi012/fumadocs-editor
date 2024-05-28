"use client";
import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import * as Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markdown";
import "@/app/prism-one-dark.css";
import { onChangeFileEdit } from "./onChangeFileEdit";

type CodeEditorProps = {
  initialContent: string;
};

export default function CodeEditor(props: CodeEditorProps) {
  const [code, setCode] = React.useState(props.initialContent);

  useEffect(() => {
    onChangeFileEdit({ filePath: "./content/docs/index.mdx", content: code });
  }, [code]);

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => Prism.highlight(code, Prism.languages.markdown, "markdown")}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      className="min-h-screen"
    />
  );
}
