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
  const [saveFile, setSaveFile] = React.useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); // Prevent the default save behavior
      setSaveFile(true);
    }
  };

  useEffect(() => {
    onChangeFileEdit({ filePath: "./content/docs/index.mdx", content: code });
    setSaveFile(false);
  }, [saveFile]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
