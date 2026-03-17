import { useEffect, useRef, useState } from "react";

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "export",
  "default",
  "return",
  "if",
  "else",
  "true",
  "false",
  "null",
]);

const URL_REGEX =
  /(https?:\/\/[^\s"']+)|(www\.[^\s"']+)|([\w.+-]+@[\w.-]+\.[a-zA-Z]{2,})/g;

const toHref = (value) => {
  if (value.includes("@") && !value.startsWith("http")) {
    return `mailto:${value}`;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
};

const parseStringWithLinks = (value) => {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = URL_REGEX.exec(value)) !== null) {
    const matchedText = match[0];
    const start = match.index;

    if (start > lastIndex) {
      parts.push({ type: "text", value: value.slice(lastIndex, start) });
    }

    parts.push({ type: "link", value: matchedText, href: toHref(matchedText) });
    lastIndex = start + matchedText.length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: "text", value: value.slice(lastIndex) });
  }

  URL_REGEX.lastIndex = 0;

  return parts;
};

const tokenizeLine = (line) => {
  const tokens = [];
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === " " || char === "\t") {
      let j = i;
      while (j < line.length && (line[j] === " " || line[j] === "\t")) j += 1;
      tokens.push({ type: "plain", value: line.slice(i, j) });
      i = j;
      continue;
    }

    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ type: "comment", value: line.slice(i) });
      break;
    }

    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\" && j + 1 < line.length) {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }

      tokens.push({ type: "string", value: line.slice(i, j) });
      i = j;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j += 1;
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_$]/.test(line[j])) j += 1;
      const word = line.slice(i, j);
      const nextChar = line[j];

      if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (nextChar === ":") {
        tokens.push({ type: "property", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }

      i = j;
      continue;
    }

    if (/[{}()[\],.:]/.test(char)) {
      tokens.push({ type: "punct", value: char });
      i += 1;
      continue;
    }

    tokens.push({ type: "plain", value: char });
    i += 1;
  }

  return tokens;
};

const renderToken = (token, keyPrefix, onEmailCopied) => {
  const colorMap = {
    keyword: "text-[#ff7b72]",
    string: "text-[#a5d6ff]",
    number: "text-[#79c0ff]",
    comment: "text-[#8b949e]",
    punct: "text-[#c9d1d9]",
    property: "text-[#d2a8ff]",
    plain: "text-[#c9d1d9]",
  };

  if (token.type === "string") {
    const quote = token.value[0];
    const body = token.value.slice(1, -1);
    const closesQuote =
      token.value.length > 1 && token.value[token.value.length - 1] === quote;
    const parts = parseStringWithLinks(body);

    return (
      <span key={keyPrefix} className={colorMap.string}>
        {quote}
        {parts.map((part, idx) => {
          if (part.type === "link") {
            const isEmailLink = part.href.startsWith("mailto:");

            if (isEmailLink) {
              return (
                <button
                  key={`${keyPrefix}-link-${idx}`}
                  type="button"
                  title="Copy email to clipboard"
                  onClick={() => onEmailCopied(part.value)}
                  className="underline decoration-dotted text-[#58a6ff] hover:text-[#79c0ff] cursor-copy"
                >
                  {part.value}
                </button>
              );
            }

            return (
              <a
                key={`${keyPrefix}-link-${idx}`}
                href={part.href}
                target="_blank"
                rel="noreferrer"
                title="Open link in new tab"
                className="underline decoration-dotted text-[#58a6ff] hover:text-[#79c0ff]"
              >
                {part.value}
              </a>
            );
          }

          return <span key={`${keyPrefix}-text-${idx}`}>{part.value}</span>;
        })}
        {closesQuote ? quote : ""}
      </span>
    );
  }

  return (
    <span key={keyPrefix} className={colorMap[token.type] || colorMap.plain}>
      {token.value}
    </span>
  );
};

const SyntaxEditor = ({ content, onEmailCopied }) => {
  const lines = content.split("\n");

  return (
    <pre className="font-mono text-[0.9rem] leading-6 whitespace-pre-wrap break-words">
      {lines.map((line, lineIndex) => {
        const tokens = tokenizeLine(line);

        return (
          <div key={`line-${lineIndex}`}>
            {tokens.length
              ? tokens.map((token, tokenIndex) =>
                  renderToken(
                    token,
                    `${lineIndex}-${tokenIndex}`,
                    onEmailCopied,
                  ),
                )
              : " "}
          </div>
        );
      })}
    </pre>
  );
};

function Dev() {
  const [input, setInput] = useState("");
  const [openFiles, setOpenFiles] = useState(["about.jsx"]);
  const [activeFile, setActiveFile] = useState("about.jsx");
  const [mobileFilesOpen, setMobileFilesOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState([]);
  const [copyToast, setCopyToast] = useState("");

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef(null);
  const copyToastTimerRef = useRef(null);

  const defaultHistory = [
    "Welcome to DronaOS v1.0",
    "Type 'help' to see available commands.",
    "",
  ];

  const [history, setHistory] = useState(defaultHistory);

  const files = {
    "about.jsx": `const about = {
  name: "Drona Srivastava",
  role: "CSE AIML Student",
  university: "VIT Chennai",
  cgpa: "8.13",

  contact: {
    email: "srivastavadrona@gmail.com",
    github: "https://github.com/Drona-Srivastava",
    linkedin: "https://www.linkedin.com/in/drona-srivastava-141a4a288/"
  },

  summary: "AI/ML student passionate about building interactive applications combining AI and web tech."
};

export default about;`,

    "projects.jsx": `const projects = [
  {
    name: "EduPlay",
    tech: ["React", "Electronjs", "WhisperAI", "Python", "CSS"],
    description: "AI-powered media player with captions and Q&A system",
    github: "https://github.com/Drona-Srivastava/EduPlay"
  },

  {
    name: "Algorithm Visualizer",
    tech: ["HTML", "CSS", "JS"],
    description: "Visualizer for Dijkstra, Huffman, Kruskal algorithms",
    github: "https://github.com/Drona-Srivastava/Algo-visualizer"
  }
];

export default projects;`,

    "experience.jsx": `const experience = [
  {
    role: "Web Developer Intern",
    company: "CodeSA",
    duration: "March 2025 - April 2025",
    work: [
      "Built company website using React",
      "Worked on UI/UX decisions",
      "Collaborated in early product design"
    ]
  }
];

export default experience;`,

    "skills.jsx": `const skills = {
  languages: ["Python", "C", "C++", "Java"],
  web: ["React", "HTML", "CSS", "JavaScript"],
  database: ["SQL", "MySQL"],
  tools: ["GitHub", "VS Code"],
  concepts: ["DSA", "OOPS", "DBMS"]
};

export default skills;`,
  };

  const fileStructure = [
    {
      name: "src",
      children: ["about.jsx", "projects.jsx", "experience.jsx", "skills.jsx"],
    },
  ];

  const commands = {
    help: [
      "Commands:",
      "man <file>    → open file in editor",
      "ls            → list files",
      "pwd           → current directory",
      "whoami        → current user",
      "echo <text>   → print text",
      "clear         → reset terminal",
      "neofetch      → system info",
      "resume        → open resume",
      "magic         → shows magic",
      "",
      "Use arrow ↑ ↓ for command history",
    ],
    ls: ["about.jsx  projects.jsx  experience.jsx  skills.jsx"],
    pwd: ["~/portfolio/src"],
    whoami: ["drona"],
    neofetch: [
      "DronaOS v1.0",
      "User: drona",
      "Stack: React, Tailwind",
      "Editor: Custom Code Editor",
    ],
  };

  const quickCommands = [
    "help",
    "ls",
    "pwd",
    "whoami",
    "neofetch",
    "clear",
    "resume",
  ];

  const pushWithDelay = (lines, delay = 400) => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, line]);
      }, i * delay);
    });
  };

  const handleCommand = (rawCommand) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, rawCommand]);
    setHistoryIndex(-1);

    if (cmd === "resume") {
      setHistory((prev) => [...prev, "> resume", "Opening resume...", ""]);
      setTimeout(() => {
        window.open(
          "https://drive.google.com/file/d/1bDn6PxBuCt6EmsZONjZiUbgKB7-CTBs0/view?usp=sharing",
        );
      }, 500);
      return;
    }

    if (cmd.startsWith("echo ")) {
      const text = rawCommand.slice(5);
      setHistory((prev) => [...prev, `> ${cmd}`, text, ""]);
      return;
    }

    if (cmd === "magic") {
      const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

      setHistory((prev) => [...prev, "> magic"]);

      pushWithDelay([
        "Initializing exploit...",
        "Scanning ports...",
        `Connected to ${fakeIP}`,
        "Bypassing firewall...",
        "Injecting payload...",
        "Access granted",
        "Dumping credentials...",
        "root:x:0:0:root:/root:/bin/bash",
        "",
        "Relax. It's just a portfolio.",
      ]);

      return;
    }

    if (cmd.startsWith("man ")) {
      const fileName = cmd.split(" ")[1];

      if (files[fileName]) {
        setOpenFiles((prev) =>
          prev.includes(fileName) ? prev : [...prev, fileName],
        );
        setActiveFile(fileName);
      } else {
        setHistory((prev) => [...prev, `> ${cmd}`, "File not found", ""]);
      }
      return;
    }

    if (cmd === "clear") {
      setHistory(["Restarting DronaOS..."]);
      setTimeout(() => setHistory(defaultHistory), 1000);
      return;
    }

    if (commands[cmd]) {
      setHistory((prev) => [...prev, `> ${cmd}`, ...commands[cmd], ""]);
    } else {
      setHistory((prev) => [...prev, `> ${cmd}`, "Command not found", ""]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandHistory.length) return;

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const runQuickCommand = (cmd) => {
    handleCommand(cmd);
    setInput("");
  };

  const handleEmailCopy = async (email) => {
    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(email);
      setCopyToast("Email copied to clipboard");
    } catch {
      setCopyToast("Could not copy email");
    }

    if (copyToastTimerRef.current) {
      clearTimeout(copyToastTimerRef.current);
    }

    copyToastTimerRef.current = setTimeout(() => {
      setCopyToast("");
    }, 1800);
  };

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(
    () => () => {
      if (copyToastTimerRef.current) {
        clearTimeout(copyToastTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const sequence = [
      "DronaOS v1.0 :: booting kernel...",
      "Loading editor modules...",
      "Mounting project workspace...",
      "Initializing terminal shell...",
      "Syntax engine online.",
      "Ready.",
    ];

    const timers = sequence.map((line, index) =>
      setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
      }, index * 320),
    );

    const doneTimer = setTimeout(
      () => {
        setBooting(false);
      },
      sequence.length * 320 + 420,
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(doneTimer);
    };
  }, []);

  if (booting) {
    return (
      <div className="h-[100dvh] bg-black text-green-400 font-mono flex items-center justify-center px-4">
        <div className="w-full max-w-3xl border border-green-500/30 rounded-lg p-6 bg-[#050505] shadow-[0_0_40px_rgba(34,197,94,0.12)]">
          <div className="text-xs text-green-300 mb-3">Boot Sequence</div>
          {bootLines.map((line, index) => (
            <div key={`${line}-${index}`} className="leading-7">
              <span className="text-green-500 mr-2">$</span>
              {line}
            </div>
          ))}
          <div className="leading-7">
            <span className="inline-block w-3 h-5 bg-green-400/90 align-middle" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-[#0a0a0a] text-white font-mono flex flex-col">
      {/* Casual mode switch*/}
      <div className="flex items-center px-3 md:px-4 py-2 bg-[#111] border-b border-white/10">
        <button
          type="button"
          onClick={() => setMobileFilesOpen((prev) => !prev)}
          className="mr-2 md:hidden h-8 w-8 rounded border border-green-500/35 text-green-300 flex items-center justify-center hover:bg-[#102015]"
          aria-label="Toggle files"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span className="text-green-400 font-semibold text-sm md:text-base">
          Drona Editor
        </span>

        <button
          onClick={() => (window.location.href = "/casual")}
          className="ml-auto text-xs md:text-sm px-2.5 md:px-3 py-1 rounded-md border border-green-500/35 bg-[#0b140d] text-green-300 shadow-[0_0_0_1px_rgba(34,197,94,0.14),0_0_16px_rgba(34,197,94,0.08)] transition duration-200 hover:bg-[#102015] hover:text-green-100 hover:border-green-400/55 hover:shadow-[0_0_0_1px_rgba(74,222,128,0.24),0_0_20px_rgba(74,222,128,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50"
        >
          Casual Mode
        </button>
      </div>

      {mobileFilesOpen ? (
        <div className="md:hidden relative z-30 border-b border-white/10 bg-[#0d0d0d]">
          <div className="max-h-52 overflow-auto p-2">
            {fileStructure[0].children.map((file) => (
              <button
                key={`mobile-${file}`}
                type="button"
                onClick={() => {
                  setOpenFiles((prev) =>
                    prev.includes(file) ? prev : [...prev, file],
                  );
                  setActiveFile(file);
                  setMobileFilesOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm ${
                  file === activeFile
                    ? "bg-[#1a1a1a] text-white"
                    : "text-gray-300 hover:bg-[#141414]"
                }`}
              >
                {file}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex bg-[#0d0d0d] border-b border-white/15 overflow-x-auto">
        {openFiles.map((file) => (
          <div
            key={file}
            onClick={() => setActiveFile(file)}
            className={`px-3 md:px-4 py-2 flex items-center gap-2 cursor-pointer shrink-0 text-sm md:text-base
      ${file === activeFile ? "bg-[#1a1a1a]" : "hover:bg-[#111]"}`}
          >
            {file}

            {/* CLOSE BUTTON */}
            <span
              onClick={(e) => {
                e.stopPropagation();

                setOpenFiles((prev) => {
                  const updated = prev.filter((f) => f !== file);

                  // if closing active tab → switch
                  if (file === activeFile) {
                    setActiveFile(updated[0] || null);
                  }

                  return updated;
                });
              }}
              className="text-gray-400 hover:text-red-400 text-sm"
            >
              ×
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden border-t border-white/10">
        {/* Sidebar */}
        <div className="hidden md:block w-56 bg-[#0d0d0d] p-3 overflow-auto overscroll-contain border-r border-white/10">
          {fileStructure[0].children.map((file) => (
            <div
              key={file}
              onClick={() => {
                setOpenFiles((prev) =>
                  prev.includes(file) ? prev : [...prev, file],
                );
                setActiveFile(file);
              }}
              className="cursor-pointer text-gray-400 hover:text-white"
            >
              {file}
            </div>
          ))}
        </div>

        {/* Editor + Terminal */}
        <div className="flex flex-col flex-1 overflow-hidden border-l border-white/10 md:border-l-0">
          {/* Editor */}
          <div className="h-[58%] md:h-[60%] bg-[#111] p-3 md:p-4 overflow-auto overscroll-contain border-b border-white/10">
            <SyntaxEditor
              content={files[activeFile] || ""}
              onEmailCopied={handleEmailCopy}
            />
          </div>

          {/* Terminal */}
          <div className="h-[42%] md:h-[40%] bg-black text-green-400 text-xs md:text-sm overscroll-contain flex flex-col overflow-hidden border-t border-white/10">
            <div className="z-20 border-b border-green-500/20 bg-black px-2.5 md:px-3 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.45)] md:hidden">
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {quickCommands.map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => runQuickCommand(cmd)}
                      className="px-2.5 py-1 rounded-md border border-green-500/35 bg-[#0b140d] text-green-300 hover:bg-[#112115] hover:text-green-100 transition"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={terminalRef}
              className="flex-1 overflow-auto px-2.5 md:px-3 pb-2.5 md:pb-3 pt-2"
            >
              {history.map((line, i) => (
                <div key={i}>{line}</div>
              ))}

              <form onSubmit={handleSubmit} className="flex">
                <span>{">"}</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 ml-2 py-0.5"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {copyToast ? (
        <div className="fixed bottom-6 right-6 z-40 rounded-md border border-green-400/35 bg-[#08110a] px-3 py-2 text-xs text-green-200 shadow-[0_0_16px_rgba(34,197,94,0.18)]">
          {copyToast}
        </div>
      ) : null}
    </div>
  );
}

export default Dev;
