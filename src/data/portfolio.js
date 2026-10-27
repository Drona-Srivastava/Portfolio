export const profile = {
  name: "Drona Srivastava",
  role: "Computer Science · AI & ML",
  location: "Chennai, India",
  university: "Vellore Institute of Technology, Chennai",
  email: "srivastavadrona@gmail.com",
  phone: "+919104461613",
  github: "https://github.com/Drona-Srivastava",
  linkedin: "https://www.linkedin.com/in/drona-srivastava-141a4a288/",
  resume:
    "https://drive.google.com/drive/folders/1YFkyWbvH-S6xHlhE-peM-O42CNuDYkxM",
  summary:
    "I build thoughtful software across web, AI, and developer tooling—from learning experiences powered by AI to lightweight Linux utilities.",
};

export const skills = [
  { title: "Cloud & DevOps", items: ["Azure", "Docker", "GitHub Actions", "Azure Container Registry", "CI/CD", "Terraform"] },
  { title: "Programming", items: ["Python", "C", "C++", "Java", "JavaScript"] },
  { title: "Web & APIs", items: ["React", "FastAPI", "HTML", "CSS", "Bootstrap"] },
  { title: "Data", items: ["SQL", "MySQL", "Pandas", "NumPy"] },
  { title: "Tools & Foundations", items: ["Git", "Linux", "OOP", "DBMS", "Version Control"] },
];

export const projects = [
  {
    name: "EduPlay",
    eyebrow: "AI · Education · Desktop",
    description: "A focused desktop player that turns lecture videos into searchable, interactive study material.",
    highlights: ["Generates captions with Whisper and lets learners jump to transcript matches.", "Ask-a-Video answers questions using the lecture transcript as context.", "GitHub Actions packages Windows, macOS, and Linux releases."],
    tech: ["React", "Electron", "Python", "Whisper", "Ollama", "GitHub Actions"],
    link: "https://github.com/Drona-Srivastava/EduPlay",
    featured: true,
  },
  {
    name: "Octave",
    eyebrow: "Linux · Audio · Terminal UI",
    description: "A lightweight Linux music client that imports Apple Music playlists and plays a local audio library.",
    highlights: ["Imports and refreshes playlists through Gamdl; Apple Music is only needed for those steps.", "Indexes and plays local audio with search, shuffle, repeat, and synced lyrics when available.", "Built around Python, mpv, and a keyboard-driven terminal interface."],
    tech: ["Python", "mpv", "Gamdl", "SQLite", "Linux"],
    link: "https://github.com/Drona-Srivastava/octave",
    featured: true,
  },
  {
    name: "Algo Engine",
    eyebrow: "Web · Algorithms · Visualization",
    description: "An interactive learning tool that makes algorithm behavior easier to follow through step-by-step visual simulations.",
    highlights: ["Explores graph and greedy algorithms including Dijkstra, Kruskal, and Huffman encoding.", "Animates state transitions, edge selection, and path relaxation.", "Includes guided execution and playback controls."],
    tech: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Drona-Srivastava/Algo-Engine",
    featured: true,
  },
  {
    name: "Portfolio",
    eyebrow: "Web · Personal · Open source",
    description: "This portfolio, built as two distinct ways to explore the same work: a readable case-study view and an interactive developer workspace.",
    highlights: ["React and Vite app with lazy-loaded routes.", "A command terminal, file explorer, and syntax-highlighted profile content.", "Responsive layouts with motion and a shared content model."],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Drona-Srivastava/Portfolio",
    featured: false,
  },
];

export const experience = [
  {
    role: "Web Developer Intern",
    company: "CodeSA",
    period: "March–April 2025",
    location: "Remote",
    details: ["Collaborated with the team to design and build the company website from the ground up.", "Developed a responsive React frontend and contributed to UI/UX decisions."],
  },
];

export const education = [
  { degree: "Bachelor of Technology (B.Tech)", course: "Computer Science and Engineering · Artificial Intelligence & Machine Learning", institution: "Vellore Institute of Technology, Chennai", period: "2023–2027", location: "Chennai, India" },
  { degree: "Senior Secondary Certificate · Class XII", course: "CBSE", institution: "Shanti Asiatic School", period: "2021–2023", location: "India" },
  { degree: "Secondary School Certificate · Class X", course: "CBSE", institution: "Shanti Asiatic School", period: "2021", location: "India" },
];

export const credentials = [
  { name: "DevOps Engineer Expert (AZ-400) Course", issuer: "Ethnus · Codemithra", period: "May–July 2026", note: "Course completion · Grade A" },
  { name: "Machine Learning Credit Course", issuer: "SmartBridge in collaboration with Google for Developers", period: "May 19–June 30, 2025", note: "Certificate of Merit · Course and project requirements completed" },
];
