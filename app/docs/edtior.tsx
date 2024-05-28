"use client";
import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
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
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      className="min-h-screen"
    />
  );
}
