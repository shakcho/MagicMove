"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--code-bg)]">
      {filename && (
        <div className="px-4 py-2 border-b border-[var(--border)] text-xs text-[var(--text-tertiary)]">
          {filename}
        </div>
      )}
      <Highlight
        theme={isDark ? themes.nightOwl : themes.github}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 text-sm overflow-x-auto`}
            style={{ ...style, background: "transparent", margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
