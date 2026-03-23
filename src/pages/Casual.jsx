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
        name: "Algo Engine",
        description:
          "Interactive React app for learning algorithms through visual simulation, step-by-step execution, and explanation-first workflows.",
        points: [
          "Supports category browsing, algorithm detail pages, and custom user input.",
          "Includes previous, next, and auto-play controls with explanation timeline.",
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
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#121f35] text-[#e8edf5] selection:bg-[#39e58c]/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111c2e]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 sm:px-8">
          <ul className="flex items-center gap-5 text-lg">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
            ].map((item) => (
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
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-8">
        <section id="hero" className="scroll-mt-24 py-14 sm:py-20">
          <MotionDiv
            variants={containerVariant}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <MotionDiv
              variants={itemVariant}
              className="text-3xl font-bold sm:text-5xl"
            >
              Drona Srivastava
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mt-3 text-2xl text-[#53ff7f]"
            >
              Software Engineer
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#53dfff]"
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
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#171f2e] px-5 py-2.5 text-sm hover:border-white/20 hover:bg-[#1e2738] transition"
              >
                <FiMail />
                Get in Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1bDn6PxBuCt6EmsZONjZiUbgKB7-CTBs0/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-[#f1f4f7] px-5 py-2.5 text-sm text-[#101828] hover:opacity-90 transition"
              >
                <FiDownload />
                Download CV
              </a>
            </MotionDiv>

            <MotionDiv
              variants={itemVariant}
              className="mt-8 flex justify-center gap-7 text-2xl"
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
          className="scroll-mt-24 py-10"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-3xl font-bold sm:text-4xl"
          >
            Skills
          </MotionDiv>

          <div className="grid gap-9 md:grid-cols-2">
            {skills.map((group) => (
              <MotionDiv key={group.title} variants={itemVariant}>
                <h3 className={`mb-4 text-xl font-semibold ${group.accent}`}>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/60 bg-[#1a2942] px-3 py-1.5 text-sm font-medium text-[#53ff7f]"
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
          className="scroll-mt-24 py-14"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-3xl font-bold sm:text-4xl"
          >
            Experience
          </MotionDiv>

          <div className="space-y-7">
            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-white/60 pl-4"
            >
              <h3 className="text-xl font-semibold text-[#b48bf2]">
                Web Development Intern
              </h3>
              <p className="mt-2 text-lg text-[#53ff7f]">Code SA</p>
              <p className="mt-2 text-base text-[#37d9c7]">
                March, 2025 - April, 2025 • Remote
              </p>
            </MotionArticle>
          </div>
        </MotionSection>

        <MotionSection
          id="experience"
          className="scroll-mt-24 py-14"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-3xl font-bold sm:text-4xl"
          >
            Education
          </MotionDiv>

          <div className="space-y-7">
            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-white/60 pl-4"
            >
              <h3 className="text-xl font-semibold text-[#b48bf2]">
                BTech in CSE (AIML)
              </h3>
              <p className="mt-2 text-lg text-[#53ff7f]">VIT Chennai</p>
              <p className="mt-2 text-base text-[#37d9c7]">
                2023 - 2027 • Chennai, India
              </p>
            </MotionArticle>

            <MotionArticle
              variants={itemVariant}
              className="border-l-2 border-[#5de2ff] pl-4"
            >
              <h3 className="text-xl font-semibold text-[#b48bf2]">
                Higher Secondary (CBSE)
              </h3>
              <p className="mt-2 text-lg text-[#53ff7f]">
                Shanti Asiatic School
              </p>
              <p className="mt-2 text-base text-[#37d9c7]">
                2021 - 2023 • India
              </p>
            </MotionArticle>
          </div>
        </MotionSection>

        <MotionSection
          id="projects"
          className="scroll-mt-24 py-10"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.14 }}
        >
          <MotionDiv
            variants={itemVariant}
            className="mb-8 text-3xl font-bold sm:text-4xl"
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
                  <h3 className="text-2xl font-semibold">{project.name}</h3>
                  <a
                    href={project.link}
                    target={
                      project.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noreferrer"
                    className="text-2xl text-[#e8edf5] hover:text-[#53ff7f] transition"
                  >
                    <FiArrowUpRight />
                  </a>
                </div>

                <p className="text-base leading-relaxed text-[#53dfff]">
                  {project.description}
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#b48bf2]">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/60 bg-[#182b45] px-2.5 py-1 text-xs font-semibold text-[#53ff7f]"
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

      <footer className="pb-10 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto w-full max-w-xs border-t border-white/70" />
          <p className="mt-5 text-center text-[15px] text-white/90">
            © 2026 Drona Srivastava. All rights reserved.
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#151b25] text-xl text-white/90 shadow-lg hover:bg-[#1d2532]"
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
