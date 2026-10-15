import { useCallback, useEffect, useRef, useState } from "react";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { credentials, education, experience, profile, projects, skills } from "../data/portfolio";

const STARTERS = {
  "playground.js": `// Edit this file, then press Run.\nconst greet = (name) => {\n  console.log(\`Hello, \${name}!\`);\n};\n\ngreet("builder");`,
  "array-lab.js": `// Try changing the data or the operation.\nconst scores = [18, 42, 27, 36, 51];\nconst passing = scores.filter((score) => score >= 30);\nconst average = scores.reduce((sum, score) => sum + score, 0) / scores.length;\n\nconsole.log("Passing:", passing);\nconsole.log("Average:", average);`,
  "profile.js": `const profile = ${JSON.stringify({ name: profile.name, role: profile.role, university: profile.university, summary: profile.summary, projects: projects.map(({ name, link }) => ({ name, link })) }, null, 2)};\n\nconsole.log(profile.name);\nconsole.log(\`Building at \${profile.university}\`);`,
  "projects.json": JSON.stringify(projects.map(({ name, description, tech, link }) => ({ name, description, technologies: tech, repository: link })), null, 2),
  "experience.json": JSON.stringify(experience, null, 2),
  "education.json": JSON.stringify(education, null, 2),
  "skills.json": JSON.stringify(skills, null, 2),
  "credentials.json": JSON.stringify(credentials, null, 2),
};

const DEMO_SNIPPETS = {
  "playground.js": STARTERS["playground.js"],
  "array-lab.js": STARTERS["array-lab.js"],
};

function AlgoDemo() {
  return <div className="algo-hosted-preview">
    <div className="algo-hosted-heading"><div><span className="demo-kicker">ALGO ENGINE · LIVE DEMO</span><strong>Dijkstra’s Algorithm</strong></div><a href="https://algoengine.vercel.app/graphs/dijkstra" target="_blank" rel="noreferrer">Open full view ↗</a></div>
    <iframe className="algo-hosted-frame" src="https://algoengine.vercel.app/graphs/dijkstra" title="Interactive Dijkstra algorithm simulation from Algo Engine" loading="lazy" allow="fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
  </div>;
}

function ProjectOverview({ projectName }) {
  const project = projects.find(({ name }) => name.toLowerCase() === projectName);
  if (!project) return null;
  return <div className="demo-content project-overview">
    <div className="demo-heading"><span className="demo-kicker">{project.eyebrow} · PROJECT OVERVIEW</span><h2>{project.name}</h2><p>{project.description}</p></div>
    <h3 className="overview-label">WHAT IT DOES</h3>
    <ul className="overview-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    <h3 className="overview-label">BUILT WITH</h3>
    <div className="tag-list overview-tags">{project.tech.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <a className="overview-repository" href={project.link} target="_blank" rel="noreferrer">Explore {project.name} on GitHub <span>↗</span></a>
  </div>;
}

function CodeWorkspace() {
  const [contents, setContents] = useState(() => ({ ...STARTERS }));
  const [activeFile, setActiveFile] = useState("playground.js");
  const [tabs, setTabs] = useState(["playground.js"]);
  const [panel, setPanel] = useState("editor");
  const [demo, setDemo] = useState("");
  const [search, setSearch] = useState("");
  const [activeAction, setActiveAction] = useState(0);
  const [palette, setPalette] = useState(false);
  const [output, setOutput] = useState([{ type: "info", text: "Ready. Edit a JavaScript file and press Run." }]);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const [runnerSrcDoc, setRunnerSrcDoc] = useState("");
  const [runToken, setRunToken] = useState("");
  const outputRef = useRef(null);
  const files = Object.keys(contents);
  const openFile = useCallback((file) => { setActiveFile(file); setTabs((old) => old.includes(file) ? old : [...old, file]); setDemo(""); setPanel("editor"); }, []);
  const appendOutput = useCallback((entry) => setOutput((old) => { const merged = [...old, entry]; let size = 0; const capped = []; for (const row of merged.slice(-100)) { size += row.text.length; if (size > 12000) break; capped.push(row); } return capped; }), []);
  const runCode = useCallback(() => {
    if (!DEMO_SNIPPETS[activeFile]) { setPanel("output"); setOutput([{ type: "error", text: `${activeFile} is data-only. Open playground.js or array-lab.js to run code.` }]); return; }
    setPanel("output"); setRunning(true); setOutput([{ type: "info", text: `Running ${activeFile}…` }]);
    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const source = contents[activeFile];
    const workerSource = [
      "self.onmessage=()=>{const send=(type,args)=>postMessage({type,text:Array.from(args).map(x=>{try{return typeof x==='string'?x:JSON.stringify(x)}catch{return String(x)}}).join(' ')});console.log=(...a)=>send('log',a);console.warn=(...a)=>send('warn',a);console.error=(...a)=>send('error',a);self.onerror=(m)=>{postMessage({type:'error',text:String(m)});return true};try{(function(){\n",
      source,
      "\n})();postMessage({type:'done',text:'Execution complete.'})}catch(e){postMessage({type:'runtime-error',text:e.name+': '+e.message});postMessage({type:'done',text:'Execution stopped.'})}};",
    ].join("");
    setRunToken(token);
    setRunnerSrcDoc(`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; worker-src blob:; connect-src 'none'; img-src data:; media-src blob: data:"><script>
      const worker = new Worker(URL.createObjectURL(new Blob([${JSON.stringify(workerSource)}],{type:'text/javascript'})));
      worker.onmessage=e=>parent.postMessage({workspaceRun:true,token:${JSON.stringify(token)},...e.data},'*');
      worker.onerror=e=>{parent.postMessage({workspaceRun:true,token:${JSON.stringify(token)},type:'runtime-error',text:e.message||'Syntax error in the snippet.'},'*');worker.terminate()};
      worker.postMessage('run');
      setTimeout(()=>{worker.terminate();parent.postMessage({workspaceRun:true,token:${JSON.stringify(token)},type:'timeout',text:'Stopped after 2 seconds.'},'*')},2000);
    </script>`);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setRunning(false), 2100);
  }, [activeFile, contents]);
  useEffect(() => {
    const onMessage = (event) => {
      if (!event.data?.workspaceRun || event.data.token !== runToken) return;
      const { type, text } = event.data;
      if (["done", "timeout", "runtime-error"].includes(type)) {
        setRunning(false);
        clearTimeout(timerRef.current);
      }
      appendOutput({ type, text });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [appendOutput, runToken]);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [output]);
  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPalette((v) => !v); }
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); runCode(); }
      if (event.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runCode]);
  const resetCode = useCallback(() => setContents((old) => ({ ...old, [activeFile]: STARTERS[activeFile] || old[activeFile] })), [activeFile]);
  const launchDemo = useCallback((name) => { setDemo(name); setPanel("preview"); setPalette(false); }, []);
  const actions = [
    ...files.map((file) => ({ title: `Open ${file}` })),
    { title: "Run current JavaScript file" },
    { title: "Show Dijkstra demo" },
    { title: "Show EduPlay overview" },
    { title: "Show Octave overview" },
    { title: "Reset current file" },
  ];
  const filteredActions = actions.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const runPaletteAction = useCallback((title) => {
    setPalette(false);
    if (title.startsWith("Open ")) openFile(title.slice(5));
    else if (title === "Run current JavaScript file") runCode();
    else if (title === "Show Dijkstra demo") launchDemo("algo");
    else if (title === "Show EduPlay overview") launchDemo("eduplay");
    else if (title === "Show Octave overview") launchDemo("octave");
    else if (title === "Reset current file") resetCode();
  }, [openFile, resetCode, runCode, launchDemo]);
  const handleCommand = (raw) => {
    const [command, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    if (!command) return;
    appendOutput({ type: "command", text: `› ${raw}` });
    if (command === "help") appendOutput({ type: "info", text: "help · ls · pwd · whoami · echo <text> · clear · neofetch · resume · contact · open <file> · cat <file> · run · demo algo · project eduplay|octave" });
    else if (command === "ls") appendOutput({ type: "info", text: files.join("   ") });
    else if (command === "pwd") appendOutput({ type: "info", text: "~/drona-portfolio/src" });
    else if (command === "whoami") appendOutput({ type: "info", text: `${profile.name} · ${profile.role}` });
    else if (command === "echo") appendOutput({ type: "info", text: arg });
    else if (command === "clear") setOutput([]);
    else if (command === "neofetch") appendOutput({ type: "info", text: `DronaOS · ${profile.name}\nReact · Vite · JavaScript\n${profile.university}` });
    else if (command === "resume") window.open(profile.resume, "_blank", "noopener,noreferrer");
    else if (command === "contact") appendOutput({ type: "info", text: `${profile.email} · ${profile.github} · ${profile.linkedin}` });
    else if (["open", "man"].includes(command)) files.includes(arg) ? openFile(arg) : appendOutput({ type: "error", text: `File not found. Try: ${files.join(", ")}` });
    else if (command === "cat") appendOutput({ type: "info", text: contents[arg] ?? "File not found." });
    else if (command === "run") runCode();
    else if (command === "demo") arg === "algo" ? launchDemo(arg) : appendOutput({ type: "error", text: "Usage: demo algo" });
    else if (command === "project") ["eduplay", "octave"].includes(arg) ? launchDemo(arg) : appendOutput({ type: "error", text: "Usage: project eduplay|octave" });
    else appendOutput({ type: "error", text: `Command not found: ${command}. Type help for available commands.` });
  };
  return <div className="workspace-app">
    <header className="workspace-topbar"><a href="/" className="workspace-brand">Drona Srivastava<span> / </span>WORKSPACE</a><div className="workspace-project-name"><i /> Portfolio · interactive workspace</div><a className="workspace-mode-link" href="/casual">Portfolio view ↗</a></header>
    <div className="workspace-toolbar"><div><span className="workspace-breadcrumb">PORTFOLIO</span><span className="breadcrumb-sep">/</span><span className="workspace-breadcrumb">SRC</span><span className="breadcrumb-sep">/</span><span className="workspace-current">{demo ? demo.toUpperCase() : activeFile}</span></div><div className="workspace-toolbar-actions"><button className="workspace-button" onClick={() => setPalette(true)}>⌕ <span>Search files</span><kbd>Ctrl K</kbd></button><button className="workspace-button" onClick={() => { setDemo(""); setPanel("editor"); }}>Editor</button></div></div>
    <div className="workspace-mobile-nav">{["editor", "preview", "output"].map((tab) => <button key={tab} className={panel === tab ? "active" : ""} onClick={() => setPanel(tab)}>{tab[0].toUpperCase() + tab.slice(1)}</button>)}</div>
    <div className="workspace-layout">
      <aside className="workspace-sidebar"><div className="workspace-sidebar-title"><span>EXPLORER</span><button onClick={() => setPalette(true)} aria-label="Search files">⌕</button></div><div className="workspace-folder">⌄ &nbsp; SRC</div>{files.map((file) => <button key={file} className={`workspace-file ${activeFile === file && !demo ? "selected" : ""}`} onClick={() => openFile(file)}><span className={file.endsWith(".json") ? "file-icon json" : "file-icon js"}>{file.endsWith(".json") ? "{}" : "JS"}</span>{file}</button>)}<div className="workspace-sidebar-title demos-title"><span>PROJECTS</span></div>{[["algo", "Algo Engine", "↗"], ["eduplay", "EduPlay", "▣"], ["octave", "Octave", "♫"]].map(([id, name, icon]) => <button key={id} className={`workspace-file demo-file ${demo === id ? "selected" : ""}`} onClick={() => launchDemo(id)}><span className="demo-file-icon">{icon}</span>{name}</button>)}<div className="workspace-sidebar-foot"><span>LOCAL PLAYGROUND</span><span>Session changes only</span></div></aside>
      <main className={`workspace-main ${panel === "editor" ? "mobile-visible" : ""}`}>
        <div className="workspace-tabs">{tabs.map((file) => <button key={file} className={`workspace-tab ${activeFile === file && !demo ? "active" : ""}`} onClick={() => { setActiveFile(file); setDemo(""); }}><span className="file-icon js">{file.endsWith(".json") ? "{}" : "JS"}</span>{file}<span className="tab-close" onClick={(e) => { e.stopPropagation(); const next = tabs.filter((tab) => tab !== file); setTabs(next.length ? next : ["playground.js"]); if (activeFile === file) setActiveFile(next[0] || "playground.js"); }}>×</span></button>)}<button className="workspace-tab-add" onClick={() => setPalette(true)}>+</button></div>
        <div className="editor-toolbar"><span><span className="file-icon js">{activeFile.endsWith(".json") ? "{}" : "JS"}</span> {activeFile}</span><span className="editor-actions"><button onClick={resetCode}>Reset</button><button className="run-button" onClick={runCode} disabled={running}>{running ? "Running…" : "▶ Run"} <kbd>Ctrl ↵</kbd></button></span></div>
        <div className="code-editor-wrap"><CodeWorkspaceEditor key={activeFile} activeFile={activeFile} contents={contents} setContents={setContents} /></div>
        <div className="editor-status"><span>● JavaScript</span><span>UTF-8</span><span>Ln 1, Col 1</span><span>Edits stay in this session</span></div>
      </main>
      <section className={`workspace-preview ${panel === "preview" ? "mobile-visible" : ""}`}>
        <div className="panel-title"><span>{demo ? `${demo.toUpperCase()} ${demo === "algo" ? "PREVIEW" : "OVERVIEW"}` : "PROJECT PREVIEW"}</span><button onClick={() => setPalette(true)}>⌕</button></div>
        <div className="preview-body">{demo === "algo" ? <AlgoDemo /> : demo === "eduplay" || demo === "octave" ? <ProjectOverview projectName={demo} /> : <div className="preview-empty"><span>✳</span><h2>Make it yours.</h2><p>Edit a snippet and run it, or choose a project to explore.</p><button onClick={() => launchDemo("algo")}>Open Algo Engine →</button><button onClick={() => launchDemo("eduplay")}>Explore EduPlay →</button><button onClick={() => launchDemo("octave")}>Explore Octave →</button></div>}</div>
      </section>
      <section className={`workspace-output ${panel === "output" ? "mobile-visible" : ""}`}>
        <div className="output-heading"><div><button className="output-tab active">OUTPUT</button><button className="output-tab" onClick={() => setOutput([])}>CLEAR</button></div><span>{running ? "● RUNNING" : "READY"}</span></div>
        <div className="output-log" ref={outputRef}>{output.map((item, index) => <pre key={`${index}-${item.text}`} className={`output-line output-${item.type}`}>{item.text}</pre>)}{running && <div className="running-indicator">Executing in isolated sandbox…</div>}</div>
        <form className="command-form" onSubmit={(e) => { e.preventDefault(); const value = e.currentTarget.elements.command.value; handleCommand(value); e.currentTarget.reset(); }}><span>›</span><input name="command" placeholder="Try ‘help’ or ‘demo algo’" aria-label="Workspace command" autoComplete="off" /></form>
        <div className="quick-commands">{["help", "ls", "run", "demo algo", "project eduplay", "project octave"].map((cmd) => <button key={cmd} onClick={() => handleCommand(cmd)}>{cmd}</button>)}</div>
      </section>
    </div>
    <footer className="workspace-footer"><span>© 2026 {profile.name}</span><span>React · CodeMirror · sandboxed code runner</span><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
    <iframe srcDoc={runnerSrcDoc} title="JavaScript execution sandbox" className="runner-frame" sandbox="allow-scripts" aria-hidden="true" />
    {palette && <div className="palette-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setPalette(false); }}><div className="command-palette"><div className="palette-search"><span>⌕</span><input autoFocus value={search} onChange={(e) => { setSearch(e.target.value); setActiveAction(0); }} placeholder="Search files and commands…" onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setActiveAction((index) => Math.min(filteredActions.length - 1, index + 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActiveAction((index) => Math.max(0, index - 1)); } else if (e.key === "Enter" && filteredActions[activeAction]) runPaletteAction(filteredActions[activeAction].title); }} /></div><div className="palette-results">{filteredActions.map((item, index) => <button key={item.title} className={index === activeAction ? "active" : ""} onMouseEnter={() => setActiveAction(index)} onClick={() => runPaletteAction(item.title)}><span>⌘</span>{item.title}<kbd>↵</kbd></button>)}</div><div className="palette-hint">↑↓ navigate · Enter select · Esc close</div></div></div>}
  </div>;
}

function CodeWorkspaceEditor({ activeFile, contents, setContents }) {
  const value = contents[activeFile] || "";
  const onChange = useCallback((next) => setContents((old) => ({ ...old, [activeFile]: next })), [activeFile, setContents]);
  if (activeFile.endsWith(".json")) return <div className="data-file-view"><pre>{value}</pre></div>;
  return <CodeEditor key={activeFile} value={value} onChange={onChange} active />;
}

function CodeEditor({ value, onChange, active }) {
  return <EditorMount value={value} onChange={onChange} active={active} />;
}

function EditorMount({ value, onChange, active }) {
  const hostRef = useRef(null);
  const viewRef = useRef(null);
  const initialValueRef = useRef(value);
  const changeRef = useRef(onChange);
  useEffect(() => { changeRef.current = onChange; }, [onChange]);
  useEffect(() => {
    if (!hostRef.current || !active) return undefined;
    const view = new EditorView({ doc: initialValueRef.current, extensions: [basicSetup, javascript(), oneDark, EditorView.lineWrapping, EditorView.updateListener.of((update) => { if (update.docChanged) changeRef.current(update.state.doc.toString()); })], parent: hostRef.current });
    viewRef.current = view;
    return () => { view.destroy(); viewRef.current = null; };
  }, [active]);
  useEffect(() => { const view = viewRef.current; if (view && view.state.doc.toString() !== value) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } }); }, [value]);
  return <div className="code-editor-host" ref={hostRef} />;
}

function Dev() {
  const [boot, setBoot] = useState(true);
  useEffect(() => { const timer = setTimeout(() => setBoot(false), 380); return () => clearTimeout(timer); }, []);
  return boot ? <div className="workspace-boot"><span className="boot-mark">Drona Srivastava</span><span>Preparing your workspace…</span><i /></div> : <CodeWorkspace />;
}

export default Dev;
