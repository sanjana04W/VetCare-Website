"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Lightbulb, Stethoscope, ChevronRight } from "lucide-react";

interface ArticleContentProps {
  content: string;
}

/**
 * Parses inline markdown: **bold**, *italic*, and backtick `code`
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex splitting by **bold**, *italic*, and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-brand-700 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function ArticleContent({ content }: ArticleContentProps) {
  if (!content) return null;

  // Split lines and normalize line breaks
  const rawLines = content.replace(/\r\n/g, "\n").split("\n");

  type Block = 
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: { num: string; text: string }[] }
    | { type: "callout"; text: string; title?: string }
    | { type: "p"; text: string };

  const blocks: Block[] = [];
  let currentList: { type: "ul" | "ol"; items: any[] } | null = null;
  let currentParagraphLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const pText = currentParagraphLines.join(" ").trim();
      if (pText) {
        // Check if paragraph is an alert or protocol
        if (pText.toLowerCase().includes("golden protocol:") || pText.toLowerCase().includes("warning:")) {
          blocks.push({ type: "callout", text: pText });
        } else {
          blocks.push({ type: "p", text: pText });
        }
      }
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      if (currentList.type === "ul") {
        blocks.push({ type: "ul", items: currentList.items });
      } else {
        blocks.push({ type: "ol", items: currentList.items });
      }
      currentList = null;
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Heading 2 (## )
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      continue;
    }

    // Heading 3 (### )
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") });
      continue;
    }

    // Bullet list item (- or *)
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      const itemText = line.replace(/^[-*]\s+/, "");
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      }
      continue;
    }

    // Numbered list item (1. 2. etc)
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      flushParagraph();
      const num = numMatch[1];
      const itemText = numMatch[2];
      if (currentList && currentList.type === "ol") {
        currentList.items.push({ num, text: itemText });
      } else {
        flushList();
        currentList = { type: "ol", items: [{ num, text: itemText }] };
      }
      continue;
    }

    // Check if line looks like a callout or alert
    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "callout", text: line.replace(/^>\s*/, "") });
      continue;
    }

    // Regular line inside a paragraph
    currentParagraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return (
    <div className="space-y-6 text-slate-700 leading-relaxed font-normal">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-100 tracking-tight"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "h3":
            return (
              <div key={idx} className="pt-5 pb-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                  <span>{renderInline(block.text)}</span>
                </h3>
              </div>
            );

          case "ul":
            return (
              <ul key={idx} className="my-4 space-y-3 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <span className="flex-1 leading-relaxed">{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={idx} className="my-4 space-y-3.5 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3.5 text-sm sm:text-base text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {item.num}
                    </span>
                    <span className="flex-1 leading-relaxed">{renderInline(item.text)}</span>
                  </li>
                ))}
              </ol>
            );

          case "callout":
            return (
              <div
                key={idx}
                className="my-6 p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 flex items-start gap-3.5 shadow-2xs"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base leading-relaxed">
                  {renderInline(block.text)}
                </div>
              </div>
            );

          case "p":
          default:
            return (
              <p key={idx} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
