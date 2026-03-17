import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const sectionIds = ["hero", "about", "experience", "projects"];

const containerVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionArticle = motion.article;

function Casual() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const skills = useMemo(
    () => [
      {
        title: "Programming Languages",
        accent: "text-[#ba8df2]",
        items: ["Python", "C", "C++", "Java"],
      },
      {
        title: "Web Development",
        accent: "text-[#6ed7ff]",
        items: ["React", "Tailwind", "HTML", "CSS", "JavaScript"],
      },
      {
        title: "Databases",
        accent: "text-[#f07ac3]",
        items: ["SQL", "MySQL"],
      },
      {
        title: "Tools & Concepts",
        accent: "text-[#a982dd]",
        items: ["Git", "GitHub", "VS Code", "Linux"],
      },
      {
        title: "Data & Analytics",
        accent: "text-[#a982dd]",
        items: [
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Data Cleaning",
          "Exploratory Analysis",
        ],
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        name: "EduPlay",
        description:
          "AI-powered media player with captions, transcript search, and contextual Q&A for learning.",
        points: [
          "Integrated Whisper-based transcription pipeline for subtitles.",
          "Built interactive Q&A panel on top of processed lecture context.",
        ],
        tech: ["React", "Electron", "Python", "WhisperAI"],
        link: "https://github.com/Drona-Srivastava/EduPlay",
      },
      {
        name: "Algorithm Visualizer",
        description:
          "Interactive visualization suite for Dijkstra, Huffman, and Kruskal with step-by-step animation.",
        points: [
          "Implemented dynamic graph rendering and controls for traversal pace.",
          "Designed educational overlays to explain each algorithm step.",
        ],
        tech: ["JavaScript", "HTML", "CSS"],
        link: "https://github.com/Drona-Srivastava/Algo-visualizer",
      },
      {
        name: "Portfolio Terminal Mode",
        description:
          "A VS Code inspired portfolio mode with command terminal, syntax-highlighted files, and responsive UX.",
        points: [
          "Added command quick-tabs for mobile and keyboard history navigation.",
          "Built custom syntax token renderer with clickable links.",
        ],
        tech: ["React", "Tailwind", "UI Engineering"],
        link: "/dev",
      },
    ],
    [],
  );

  useEffect(() => {
    document.body.classList.add("casual-no-scrollbar");
    document.documentElement.classList.add("casual-no-scrollbar");

    return () => {
      document.body.classList.remove("casual-no-scrollbar");
      document.documentElement.classList.remove("casual-no-scrollbar");
    };
  }, []);

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.35 },
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[#121f35] text-[#e8edf5] selection:bg-[#39e58c]/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111c2e]/90 backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between px-3 py-2 sm:px-8">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="text-lg leading-none">{mobileMenuOpen ? "x" : "≡"}</span>
          </button>

          <ul className="hidden items-center justify-center gap-5 text-lg md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`transition ${
                    activeSection === item.id
                      ? "text-[#53ff7f]"
                      : "text-[#b48bf2] hover:text-[#53ff7f]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/dev"
                className="text-[#b48bf2] hover:text-[#53ff7f] transition"
              >
                Programmer Mode
              </a>
            </li>
          </ul>

          <div className="h-9 w-9 md:hidden" />
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-white/10 bg-[#111c2e] px-3 py-2 md:hidden">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={`mobile-${item.id}`}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full rounded-md px-3 py-2 text-left transition ${
                      activeSection === item.id
                        ? "bg-white/10 text-[#53ff7f]"
                        : "text-[#b48bf2] hover:bg-white/5 hover:text-[#53ff7f]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/dev"
                  className="block w-full rounded-md px-3 py-2 text-left text-[#b48bf2] transition hover:bg-white/5 hover:text-[#53ff7f]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Programmer Mode
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-8 sm:pb-20">
        <section id="hero" className="scroll-mt-24 py-10 sm:py-20">
          <MotionDiv
            variants={containerVariant}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <MotionDiv
              variants={itemVariant}
              className="text-3xl font-bold leading-tight sm:text-5xl"
            >
              Drona Srivastava
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mt-3 text-xl text-[#53ff7f] sm:text-2xl"
            >
              Software Engineer
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-[#53dfff] sm:text-base"
            >
              Full-stack developer focused on building AI-first applications,
              polished interfaces, and practical systems that solve real user
              problems.
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              <a
                href="mailto:srivastavadrona@gmail.com"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#171f2e] px-4 py-2 text-xs hover:border-white/20 hover:bg-[#1e2738] transition sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <FiMail />
                Get in Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1bDn6PxBuCt6EmsZONjZiUbgKB7-CTBs0/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-[#f1f4f7] px-4 py-2 text-xs text-[#101828] hover:opacity-90 transition sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <FiDownload />
                Download CV
              </a>
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mt-8 flex justify-center gap-6 text-xl sm:gap-7 sm:text-2xl"
            >
              <a
                href="https://github.com/Drona-Srivastava"
                target="_blank"
                rel="noreferrer"
                className="text-[#b48bf2] hover:text-white transition"
              >
                <FiGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/drona-srivastava-141a4a288/"
                target="_blank"
                rel="noreferrer"
                className="text-[#5de2ff] hover:text-white transition"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:srivastavadrona@gmail.com"
                className="text-[#ff5964] hover:text-white transition"
              >
                <FiMail />
              </a>
              <a
                href="tel:+919104461613"
                className="text-[#53ff7f] hover:text-white transition"
              >
                <FiPhone />
              </a>
            </MotionDiv>
          </MotionDiv>
        </section>

        <MotionSection
          id="about"
          className="scroll-mt-24 py-8 sm:py-10"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-2xl font-bold sm:text-4xl"
          >
            Skills
          </MotionDiv>

          <div className="grid gap-9 md:grid-cols-2">
            {skills.map((group) => (
              <MotionDiv key={group.title} variants={itemVariant}>
                <h3 className={`mb-4 text-lg font-semibold sm:text-xl ${group.accent}`}>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/60 bg-[#1a2942] px-3 py-1.5 text-xs font-medium text-[#53ff7f] sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionSection>
        
        <MotionSection
          id="experience"
          className="scroll-mt-24 py-10 sm:py-14"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-2xl font-bold sm:text-4xl"
          >
            Experience
          </MotionDiv>

          <div className="space-y-7">
            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-white/60 pl-4"
            >
              <h3 className="text-lg font-semibold text-[#b48bf2] sm:text-xl">
                Web Development Intern
              </h3>
              <p className="mt-2 text-base text-[#53ff7f] sm:text-lg">Code SA</p>
              <p className="mt-2 text-sm text-[#37d9c7] sm:text-base">
                March, 2025 - April, 2025 • Remote
              </p>
            </MotionArticle>
          </div>
        </MotionSection>

        <MotionSection
          id="education"
          className="scroll-mt-24 py-10 sm:py-14"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-2xl font-bold sm:text-4xl"
          >
            Education
          </MotionDiv>

          <div className="space-y-7">
            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-white/60 pl-4"
            >
              <h3 className="text-lg font-semibold text-[#b48bf2] sm:text-xl">
                BTech in CSE (AIML)
              </h3>
              <p className="mt-2 text-base text-[#53ff7f] sm:text-lg">VIT Chennai</p>
              <p className="mt-2 text-sm text-[#37d9c7] sm:text-base">
                2023 - 2027 • Chennai, India
              </p>
            </MotionArticle>

            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-[#5de2ff] pl-4"
            >
              <h3 className="text-lg font-semibold text-[#b48bf2] sm:text-xl">
                Higher Secondary (CBSE)
              </h3>
              <p className="mt-2 text-base text-[#53ff7f] sm:text-lg">
                Shanti Asiatic School
              </p>
              <p className="mt-2 text-sm text-[#37d9c7] sm:text-base">
                2021 - 2023 • India
              </p>
            </MotionArticle>
          </div>
        </MotionSection>

        <MotionSection
          id="projects"
          className="scroll-mt-24 py-8 sm:py-10"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.14 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-2xl font-bold sm:text-4xl"
          >
            Projects
          </MotionDiv>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <MotionArticle
                key={project.name}
                variants={itemVariant}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/55 bg-[#16243b] p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold sm:text-2xl">{project.name}</h3>
                  <a
                    href={project.link}
                    target={
                      project.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noreferrer"
                    className="text-xl text-[#e8edf5] hover:text-[#53ff7f] transition sm:text-2xl"
                  >
                    <FiArrowUpRight />
                  </a>
                </div>

                <p className="text-sm leading-relaxed text-[#53dfff] sm:text-base">
                  {project.description}
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-xs text-[#b48bf2] sm:text-sm">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/60 bg-[#182b45] px-2.5 py-1 text-[11px] font-semibold text-[#53ff7f] sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>
      </main>

      <footer className="pb-8 pt-4 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto w-full max-w-xs border-t border-white/70" />
          <p className="mt-5 text-center text-xs text-white/90 sm:text-[15px]">
            © 2026 Drona Srivastava. All rights reserved.
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#151b25] text-lg text-white/90 shadow-lg hover:bg-[#1d2532] sm:bottom-5 sm:right-5 sm:h-11 sm:w-11 sm:text-xl"
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>

      <style>{`
        html.casual-no-scrollbar,
        body.casual-no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html.casual-no-scrollbar::-webkit-scrollbar,
        body.casual-no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}

export default Casual;
