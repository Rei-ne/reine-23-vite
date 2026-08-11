import { useEffect, useState } from "react";
import "./App.css";

const onlineProjects = [
  {
    number: "01",
    name: "TIKTALK MEDIA",
    type: "MEDIA PLATFORM",
    note: "WEB DESIGN / DEVELOPMENT / DIGITAL EXPERIENCE",
    href: "https://tiktalkmedia.com/",
  },
  {
    number: "02",
    name: "ANKORIO LMS",
    type: "LEARNING PLATFORM",
    note: "FULL-STACK MVP / PRODUCT ENGINEERING",
    href: "https://ankorio-lms-mvp.netlify.app/",
  },
  {
    number: "03",
    name: "PEEPS AFRICA",
    type: "AGENCY WEBSITE",
    note: "CREATIVE DIRECTION / WEB DEVELOPMENT",
    href: "https://peepsafrica.com/",
  },
  {
    number: "04",
    name: "FACTORY RESET",
    type: "WEB + TICKETING",
    note: "EXPERIENCE DESIGN / EVENT INFRASTRUCTURE",
    href: "https://factoryreset.vibesfactory.co/",
  },
];

const fullWorkProjects = [
  ...onlineProjects.slice(0, 3),
  {
    number: "04",
    name: "ALBUM COVER BANK",
    type: "CULTURAL ARCHIVE",
    note: "REACT / AIRTABLE / NIGERIAN MUSIC HISTORY",
    href: "https://www.albumcoverbank.com/",
  },
  {
    number: "05",
    name: "LEXLANCE",
    type: "LEGAL MARKETPLACE",
    note: "REACT / NODE / PRODUCT ENGINEERING",
    href: "https://lexlance.com/",
  },
  {
    number: "06",
    name: "SHUTTERGIRL",
    type: "BOOKING EXPERIENCE",
    note: "WEB DESIGN / DEVELOPMENT",
    href: "https://bookshuttergirl.com/",
  },
  {
    number: "07",
    name: "SCENT ELIXIR",
    type: "E-COMMERCE",
    note: "STOREFRONT / WEB DEVELOPMENT",
    href: "https://scentelixir.ng/",
  },
  {
    number: "08",
    name: "FACTORY RESET",
    type: "WEB + TICKETING",
    note: "EXPERIENCE DESIGN / EVENT INFRASTRUCTURE",
    href: "https://factoryreset.vibesfactory.co/",
  },
];

const outsideProjects = [
  {
    index: "A",
    name: "FACTORY RESET",
    detail: "LAGOS RAVE / PROJECTS / GUESTS / WEB / TICKETS / DATA",
    image: "/assets/factory-reset/night.jpg",
    href: "https://www.instagram.com/factoryreset.xyz/",
  },
  {
    index: "B",
    name: "REINE’S RAVE",
    detail: "OPEN AIR / BEACH / CAMP / COMMUNITY",
    image: "/assets/reines-rave/location.jpg",
    href: "https://www.instagram.com/reines.rave/",
  },
  {
    index: "C",
    name: "VIBESFACTORY",
    detail: "CREATIVE COLLECTIVE / TEDDYWESTSIDE × BRYCEPAPI × REINE",
    image: "/assets/factory-reset/flyer.jpg",
    href: "https://www.instagram.com/vibesfactoryng/",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function WorkPage() {
  return (
    <div className="site site--online work-page">
      <header className="topbar">
        <a className="topbar__id" href="/" aria-label="Back to Reine home">
          REINE <span>/ SELECTED WORK</span>
        </a>
        <a className="work-page__back" href="/">← BACK HOME</a>
        <div className="topbar__signal"><span className="signal-dot" /> AVAILABLE FOR SELECTED BUILDS</div>
      </header>

      <main>
        <section className="work-page__hero">
          <div className="section-kicker">
            <span>REINE DEV ENTERPRISES</span>
            <span>SOLO / STUDIO / COLLABORATIVE BUILDS</span>
          </div>
          <h1>work.</h1>
          <p>WEBSITES / WEB APPS / PRODUCTS WITH PERSONALITY</p>
        </section>

        <section className="work-page__list" aria-label="Selected technical work">
          {fullWorkProjects.map((project) => (
            <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="work-entry">
              <span>{project.number}</span>
              <div>
                <h2>{project.name}</h2>
                <p>{project.type}</p>
              </div>
              <small>{project.note}</small>
              <Arrow />
            </a>
          ))}
        </section>

        <section className="work-page__contact">
          <span>REINE DEV ENTERPRISES / LAGOS</span>
          <h2>HAVE A GOOD IDEA?</h2>
          <a href="mailto:reinetoyosii@gmail.com?subject=Build%20with%20Reine%20Dev">LET’S TALK <Arrow /></a>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [world, setWorld] = useState("online");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const chooseWorld = (nextWorld) => {
    setWorld(nextWorld);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`site site--${world}`}>
      <header className="topbar">
        <a className="topbar__id" href="#top" aria-label="Reine, home">
          TOYOSI ODUKALE <span>/ LAGOS</span>
        </a>

        <div className="world-switch" role="group" aria-label="Choose a world">
          <button
            type="button"
            className={world === "online" ? "is-active" : ""}
            aria-pressed={world === "online"}
            onClick={() => chooseWorld("online")}
          >
            ONLINE
          </button>
          <button
            type="button"
            className={world === "outside" ? "is-active" : ""}
            aria-pressed={world === "outside"}
            onClick={() => chooseWorld("outside")}
          >
            OUTSIDE
          </button>
        </div>

        <div className="topbar__signal" aria-label={`Local Lagos time ${time}`}>
          <span className="signal-dot" /> {time || "--:--"} / 06°27′N
        </div>
      </header>

      <main id="top">
        {world === "online" ? (
          <div className="world world--online">
            <section className="hero hero--online" aria-labelledby="online-title">
              <div className="hero__word-wrap">
                <h1 id="online-title" className="hero__word">reine</h1>
                <span className="hero__crown" aria-hidden="true">♛</span>
              </div>

              <figure className="portrait-card">
                <img src="/assets/reine/portrait.jpg" alt="Toyosi Reine Odukale" />
                <figcaption>REINE / 2026</figcaption>
              </figure>

              <div className="tape tape--green">FULL-STACK / FULL IDEA</div>
              <div className="tape tape--cream">SERIOUS ABOUT DETAILS</div>

              <div className="terminal" aria-label="About Reine">
                <div className="terminal__bar">
                  <span>REINE_DEV.LOG</span>
                  <span>● ONLINE</span>
                </div>
                <ol>
                  <li><span>01</span> FOUNDER / DEVELOPER / OPERATOR</li>
                  <li><span>02</span> WEBSITES THAT REFUSE TO BE BORING</li>
                  <li><span>03</span> LAGOS → THE INTERNET</li>
                  <li><span>04</span> SCROLL: SELECTED_WORK ↓</li>
                </ol>
              </div>

              <div className="hero__index" aria-hidden="true">
                <span>INTERNET</span>
                <span>VENTURES</span>
                <span>ARCHIVE</span>
              </div>
            </section>

            <section className="online-work" id="work" aria-labelledby="online-work-title">
              <div className="section-kicker">
                <span>SELECTED WORK</span>
                <span>04 ENTRIES / PRESENT–PAST</span>
              </div>
              <h2 id="online-work-title">Things on<br />the internet.</h2>

              <div className="project-list">
                {onlineProjects.map((project) => (
                  <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="project-row">
                    <span className="project-row__number">{project.number}</span>
                    <span className="project-row__name">{project.name}</span>
                    <span className="project-row__meta">
                      <strong>{project.type}</strong>
                      <small>{project.note}</small>
                    </span>
                    <Arrow />
                  </a>
                ))}
              </div>
              <a className="all-work-link" href="/work">VIEW ALL TECHNICAL WORK <Arrow /></a>
            </section>

            <section className="studio-strip" aria-label="Reine Dev Enterprises">
              <p>HAVE A GOOD IDEA?</p>
              <a href="mailto:reinetoyosii@gmail.com?subject=Build%20with%20Reine%20Dev">
                LET’S MAKE IT WEIRD <Arrow />
              </a>
              <p>REINE DEV ENTERPRISES / LAGOS</p>
            </section>
          </div>
        ) : (
          <div className="world world--outside">
            <section className="outside-hero" aria-labelledby="outside-title">
              <div className="outside-hero__meta">
                <span>PROJECTS / GUESTS / WEB / TICKETS / DATA</span>
                <span>VIBESFACTORY CREATIVE COLLECTIVE</span>
              </div>

              <h1 id="outside-title">after dark</h1>

              <figure className="night-tile night-tile--main">
                <img src="/assets/factory-reset/crowd.jpg" alt="Guests at Factory Reset" />
                <figcaption>FACTORY RESET / AFTER DARK</figcaption>
              </figure>
              <figure className="night-tile night-tile--logo" aria-label="Factory Reset">
                <img src="/assets/factory-reset/main-logo.png" alt="Factory Reset" />
              </figure>
              <figure className="night-tile night-tile--flyer">
                <img src="/assets/factory-reset/flyer.jpg" alt="Factory Reset event artwork" />
                <figcaption>LAGOS / RESET REQUIRED</figcaption>
              </figure>
              <figure className="night-tile night-tile--rave">
                <img src="/assets/reines-rave/location.jpg" alt="Outdoor location for Reine’s Rave" />
                <figcaption>REINE’S RAVE / ESCAPE</figcaption>
              </figure>
              <figure className="night-tile night-tile--reine">
                <img src="/assets/reine/outside.jpg" alt="Reine outdoors at dusk" />
                <figcaption>REINE / OUTSIDE</figcaption>
              </figure>
            </section>

            <section className="outside-work" aria-labelledby="outside-work-title">
              <div className="section-kicker">
                <span>THINGS THAT HAPPEN IRL</span>
                <span>LAGOS / MOSTLY AFTER DARK</span>
              </div>
              <h2 id="outside-work-title">Come<br />outside.</h2>

              <div className="outside-projects">
                {outsideProjects.map((project) => (
                  <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="outside-card">
                    <img src={project.image} alt="" />
                    <span className="outside-card__index">{project.index}</span>
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.detail}</p>
                    </div>
                    <Arrow />
                  </a>
                ))}
              </div>
            </section>

            <section className="next-signal">
              <span>SIGNAL / NEXT</span>
              <strong>REINE’S RAVE</strong>
              <span>LATE 2026 / THE NEXT ESCAPE IS LOADING</span>
              <a href="https://www.instagram.com/reines.rave/" target="_blank" rel="noreferrer">STAY IN THE LOOP <Arrow /></a>
            </section>
          </div>
        )}

        <section className="identity" aria-labelledby="identity-title">
          <div className="identity__label">WHO / WHAT / WHY</div>
          <div className="identity__body">
            <h2 id="identity-title">TOYOSI “REINE” ODUKALE</h2>
            <p>FOUNDER</p>
            <p>FULL-STACK DEVELOPER</p>
            <p>CREATIVE OPERATOR</p>
            <p>CURIOUS ABOUT THE INTERNET</p>
            <p>SERIOUS ABOUT A GOOD NIGHT</p>
          </div>
          <img src="/assets/vibesfactory/main-logo.png" alt="Vibesfactory Studios" />
        </section>
      </main>

      <footer className="footer">
        <div>
          <span>FOUND SOMETHING?</span>
          <a href="mailto:reinetoyosii@gmail.com">EMAIL REINE <Arrow /></a>
        </div>
        <nav aria-label="Social links">
          <a href="https://github.com/Rei-ne" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          <a href="https://www.linkedin.com/in/toyosi-odukale/" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a>
          <a href="https://www.instagram.com/reine_dev/" target="_blank" rel="noreferrer">INSTAGRAM <Arrow /></a>
        </nav>
        <span>© {new Date().getFullYear()} REINE / BUILT IN LAGOS</span>
      </footer>
    </div>
  );
}

function SiteRouter() {
  return window.location.pathname === "/work" ? <WorkPage /> : <App />;
}

export default SiteRouter;
