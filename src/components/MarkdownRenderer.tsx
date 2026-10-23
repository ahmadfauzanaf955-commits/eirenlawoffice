import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split into lines/blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList: 'ul' | 'ol' | null = null;
  let listItems: React.ReactNode[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  const flushList = (key: string) => {
    if (inList && listItems.length > 0) {
      if (inList === 'ul') {
        elements.push(
          <ul key={key} className="space-y-2 my-4 pl-6 list-disc marker:text-[#b51c00] text-[#313030]">
            {listItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key} className="space-y-2 my-4 pl-6 list-decimal marker:text-[#b51c00] text-[#313030]">
            {listItems}
          </ol>
        );
      }
      listItems = [];
      inList = null;
    }
  };

  const flushBlockquote = (key: string) => {
    if (inBlockquote && blockquoteLines.length > 0) {
      elements.push(
        <blockquote
          key={key}
          className="my-6 p-4 sm:p-5 bg-[#f6f3f2] border-l-4 border-[#b51c00] text-[#1b1b1b] italic font-body-md text-sm sm:text-base leading-relaxed"
        >
          {blockquoteLines.map((line, idx) => (
            <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
              {parseInlineMarkdown(line)}
            </p>
          ))}
        </blockquote>
      );
      blockquoteLines = [];
      inBlockquote = false;
    }
  };

  // Inline formatting parser
  function parseInlineMarkdown(text: string): React.ReactNode {
    // Process links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Process bold **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;
    // Process italic *text*
    const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;

    // Helper: split text by bold, italic, links
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Simple robust tokenizer
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = tokenRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.substring(lastIndex, match.index));
      }

      const token = match[0];
      if (token.startsWith('[') && token.includes('](')) {
        const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
        if (linkMatch) {
          parts.push(
            <a
              key={keyIdx++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b51c00] underline font-semibold hover:text-[#1b1b1b] transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
        }
      } else if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-bold text-[#1b1b1b]">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={keyIdx++} className="italic text-[#313030]">
            {token.slice(1, -1)}
          </em>
        );
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < remaining.length) {
      parts.push(remaining.substring(lastIndex));
    }

    return parts.length === 0 ? text : parts;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const key = `line-${i}`;

    // Blank line
    if (!trimmed) {
      flushList(key);
      flushBlockquote(key);
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList(key);
      flushBlockquote(key);
      elements.push(<hr key={key} className="my-8 border-t border-[#eae7e7]" />);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList(key);
      inBlockquote = true;
      blockquoteLines.push(trimmed.slice(2));
      continue;
    } else {
      flushBlockquote(key);
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      flushList(key);
      elements.push(
        <h1
          key={key}
          className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b1b] font-bold mt-8 mb-4 tracking-tight"
        >
          {parseInlineMarkdown(trimmed.slice(2))}
        </h1>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList(key);
      elements.push(
        <div key={key} className="mt-8 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-1 bg-[#b51c00] block"></span>
            <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-[10px] tracking-wider">
              Legal Briefing Section
            </span>
          </div>
          <h2 className="font-headline-md text-xl sm:text-2xl text-[#1b1b1b] font-bold tracking-tight">
            {parseInlineMarkdown(trimmed.slice(3))}
          </h2>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList(key);
      elements.push(
        <h3
          key={key}
          className="font-title-lg text-lg sm:text-xl text-[#1b1b1b] font-bold mt-6 mb-2 tracking-tight"
        >
          {parseInlineMarkdown(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      flushList(key);
      elements.push(
        <h4
          key={key}
          className="font-title-md text-base sm:text-lg text-[#1b1b1b] font-bold mt-4 mb-2 uppercase tracking-wider text-xs"
        >
          {parseInlineMarkdown(trimmed.slice(5))}
        </h4>
      );
      continue;
    }

    // Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      if (inList !== 'ul') {
        flushList(key);
        inList = 'ul';
      }
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      listItems.push(
        <li key={`li-${i}`} className="leading-relaxed">
          {parseInlineMarkdown(itemText)}
        </li>
      );
      continue;
    }

    // Ordered List (1. )
    if (/^\d+\.\s+/.test(trimmed)) {
      if (inList !== 'ol') {
        flushList(key);
        inList = 'ol';
      }
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      listItems.push(
        <li key={`li-${i}`} className="leading-relaxed">
          {parseInlineMarkdown(itemText)}
        </li>
      );
      continue;
    }

    // Inline image ![alt](src)
    const imgMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(trimmed);
    if (imgMatch) {
      flushList(key);
      elements.push(
        <figure key={key} className="my-6">
          <div className="overflow-hidden border border-[#eae7e7] bg-[#f0eded]">
            <img
              src={imgMatch[2]}
              alt={imgMatch[1] || 'Article image'}
              className="w-full h-auto object-cover max-h-[480px]"
              referrerPolicy="no-referrer"
            />
          </div>
          {imgMatch[1] && (
            <figcaption className="text-center font-body-sm text-xs text-[#5e5e5e] mt-2 italic">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Regular paragraph
    flushList(key);
    elements.push(
      <p
        key={key}
        className="font-body-md text-[#313030] text-sm sm:text-base leading-relaxed my-3"
      >
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  }

  flushList('final-list');
  flushBlockquote('final-blockquote');

  return <div className="prose-container max-w-none space-y-2">{elements}</div>;
}
