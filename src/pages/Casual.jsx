import { motion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { credentials, education, experience, profile, projects, skills } from "../data/portfolio";

const MotionSection = motion.section;
const appear = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function Casual() {
  return (
    <div className="portfolio-shell">
      <header className="portfolio-nav"><a className="wordmark" href="/">Drona Srivastava<span>.</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#education">Education</a><a href="#credentials">Credentials</a></nav><a className="nav-cta" href={`mailto:${profile.email}`}>Let’s talk <FiArrowUpRight /></a></header>
      <main>
        <section id="hero" className="portfolio-hero content-wrap">
          <div className="eyebrow"><span className="status-dot" /> COMPUTER SCIENCE · AI & ML</div>
          <div className="hero-grid"><div><h1>Ideas into<br /><em>working software.</em></h1><p className="hero-copy">I’m {profile.name}, a computer science student who builds useful applications across AI, web, and developer tooling.</p><div className="hero-actions"><a className="button button-light" href="#work">Explore selected work <FiArrowDownRight /></a><a className="button button-outline" href={profile.resume} target="_blank" rel="noreferrer"><FiDownload /> Résumé</a></div></div>
            <aside className="hero-aside"><span className="aside-number">01 — 04</span><p>{profile.summary}</p><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a><a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a></div></aside></div>
        </section>

        <MotionSection id="work" className="content-section content-wrap" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }} variants={appear}>
          <div className="section-kicker"><span>01 / SELECTED WORK</span><span className="hairline" /></div><div className="section-heading"><h2>Built to be<br /><em>used and explored.</em></h2><p>A selection of projects where software meets real workflows—from learning to listening.</p></div>
          <div className="project-grid">{projects.map((project, index) => <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.name}><div className="project-top"><span className="project-count">0{index + 1}</span><a className="project-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}><FiArrowUpRight /></a></div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.name}</h3><p className="project-description">{project.description}</p><ul className="project-highlights">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="tag-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div><a className="project-repo" href={project.link} target="_blank" rel="noreferrer">View repository <FiArrowUpRight /></a></article>)}</div>
        </MotionSection>

        <MotionSection id="about" className="content-section content-wrap about-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={appear}>
          <div className="section-kicker"><span>02 / ABOUT & TOOLKIT</span><span className="hairline" /></div><div className="section-heading"><h2>Curious by nature.<br /><em>Practical by design.</em></h2><p>{profile.summary} I enjoy working across the stack and learning the systems behind the interface.</p></div>
          <div className="skills-grid">{skills.map((group, index) => <div className="skill-group" key={group.title}><span className="skill-index">0{index + 1}</span><h3>{group.title}</h3><div className="tag-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
        </MotionSection>

        <MotionSection id="experience" className="content-section content-wrap timeline-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={appear}>
          <div className="section-kicker"><span>03 / EXPERIENCE</span><span className="hairline" /></div><div className="section-heading"><h2>Work that shaped<br /><em>how I build.</em></h2><p>Hands-on experience collaborating on responsive web products and translating ideas into usable interfaces.</p></div><div className="timeline-list">{experience.map((item) => <article className="timeline-item" key={item.company}><span className="timeline-date">{item.period} · {item.location}</span><h3>{item.role}</h3><p className="timeline-org">{item.company}</p>{item.details.map((line) => <p className="timeline-detail" key={line}>{line}</p>)}</article>)}</div>
        </MotionSection>

        <MotionSection id="education" className="content-section content-wrap timeline-section education-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={appear}>
          <div className="section-kicker"><span>04 / EDUCATION</span><span className="hairline" /></div><div className="section-heading"><h2>Learning the<br /><em>foundations.</em></h2><p>Academic background in computer science, with a focus on artificial intelligence and machine learning.</p></div><div className="education-grid">{education.map((item) => <article className="timeline-item education-item" key={item.degree}><span className="timeline-date">{item.period} · {item.location}</span><h3>{item.degree}</h3><p className="timeline-org">{item.institution}</p><p className="timeline-detail">{item.course}</p></article>)}</div>
        </MotionSection>

        <MotionSection id="credentials" className="content-section content-wrap credentials-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={appear}>
          <div className="section-kicker"><span>05 / CONTINUED LEARNING</span><span className="hairline" /></div><div className="section-heading"><h2>Learning that<br /><em>keeps moving.</em></h2><p>Courses and credentials that reflect a growing interest in cloud, DevOps, and applied machine learning.</p></div><div className="credential-grid">{credentials.map((credential, index) => <article className="credential-card" key={credential.name}><span className="credential-index">0{index + 1} / COURSE</span><h3>{credential.name}</h3><p>{credential.issuer}</p><div><span>{credential.period}</span><span>{credential.note}</span></div></article>)}</div>
        </MotionSection>
      </main>
      <footer className="portfolio-footer content-wrap"><div><span className="footer-kicker">HAVE A PROJECT IN MIND?</span><a className="footer-email" href={`mailto:${profile.email}`}>Let’s make it<br /><em>happen.</em> <FiArrowUpRight /></a></div><div className="footer-bottom"><span>© 2026 {profile.name}</span><span>{profile.location}</span><a href="/">Back to the start ↑</a></div></footer>
    </div>
  );
}

export default Casual;
