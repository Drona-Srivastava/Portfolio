import { FiArrowRight, FiCode, FiLayers } from "react-icons/fi";
import { profile } from "../data/portfolio";

function Home() {
  return (
    <main className="home-shell">
      <nav className="home-nav wrap">
        <a className="wordmark" href="/" aria-label="Drona Srivastava home">Drona Srivastava<span>.</span></a>
        <a className="nav-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
      </nav>

      <section className="home-hero wrap">
        <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEERING · AI & ML</div>
        <h1>Building useful<br /><em>things with code.</em></h1>
        <p className="home-intro">I’m {profile.name}, a computer science student at VIT Chennai. I make thoughtful applications across AI, web, and developer tools.</p>
        <div className="home-meta"><span>CHENNAI, INDIA</span><span>VIT CHENNAI · CSE AI & ML</span></div>
      </section>

      <section className="mode-section wrap" aria-labelledby="mode-title">
        <div className="section-kicker"><span>01 / PICK YOUR VIEW</span><span className="hairline" /></div>
        <h2 id="mode-title" className="mode-heading">Two ways to explore.<br /><span>The same work.</span></h2>
        <div className="mode-grid">
          <a className="mode-card mode-card-primary" href="/casual">
            <div className="mode-card-top"><span className="mode-icon"><FiLayers /></span><span className="card-index">01</span></div>
            <div><p className="card-label">THE PORTFOLIO</p><h3>Explore the work</h3><p className="mode-description">Projects, experience, and the ideas behind what I build.</p></div>
            <span className="mode-arrow"><FiArrowRight /></span>
          </a>
          <a className="mode-card mode-card-secondary" href="/dev">
            <div className="mode-card-top"><span className="mode-icon"><FiCode /></span><span className="card-index">02</span></div>
            <div><p className="card-label">THE WORKSPACE</p><h3>Meet the terminal</h3><p className="mode-description">Open files, explore the source-style profile, and try a command.</p></div>
            <span className="mode-arrow"><FiArrowRight /></span>
          </a>
        </div>
      </section>
      <footer className="home-footer wrap"><span>© 2026 {profile.name}</span><a href={`mailto:${profile.email}`}>{profile.email}</a></footer>
    </main>
  );
}

export default Home;
