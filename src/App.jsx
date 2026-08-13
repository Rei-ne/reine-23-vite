import { useEffect, useRef, useState } from "react";
import "./App.css";

const onlineProjects = [
  {
    number: "01",
    name: "FACTORY RESET",
    type: "WEB + TICKETING",
    note: "EXPERIENCE DESIGN / EVENT INFRASTRUCTURE",
    href: "https://factoryreset.vibesfactory.co/",
  },
  {
    number: "02",
    name: "TIKTALK MEDIA",
    type: "MEDIA PLATFORM",
    note: "WEB DESIGN / DEVELOPMENT / DIGITAL EXPERIENCE",
    href: "https://tiktalkmedia.com/",
  },
  {
    number: "03",
    name: "ANKORIO LMS",
    type: "LOGISTICS MANAGEMENT SYSTEM",
    note: "FULL-STACK MVP / PRODUCT ENGINEERING",
    href: "https://ankorio-lms-mvp.netlify.app/",
  },
  {
    number: "04",
    name: "PEEPS AFRICA",
    type: "AGENCY WEBSITE",
    note: "CREATIVE DIRECTION / WEB DEVELOPMENT",
    href: "https://peepsafrica.com/",
  },
];

const fullWorkProjects = [
  ...onlineProjects,
  {
    number: "05",
    name: "ALBUM COVER BANK",
    type: "CULTURAL ARCHIVE",
    note: "REACT / AIRTABLE / NIGERIAN MUSIC HISTORY",
    href: "https://www.albumcoverbank.com/",
  },
  {
    number: "06",
    name: "SCENT ELIXIR",
    type: "E-COMMERCE",
    note: "STOREFRONT / WEB DEVELOPMENT",
    href: "https://scentelixir.ng/",
  },
];

const writing = [
  {
    number: "W01",
    title: "AN INTRODUCTION TO WEB DEVELOPMENT",
    type: "TECHNICAL GUIDE",
    date: "OCT 2023",
    href: "https://reine.hashnode.dev/an-introduction-to-web-development-the-internet-html-and-css",
  },
  {
    number: "W02",
    title: "HOW TO CONNECT A REACT VITE APP TO SPOTIFY’S API",
    type: "TECHNICAL GUIDE",
    date: "APR 2023",
    href: "https://reine.hashnode.dev/how-to-connect-your-react-vitejs-app-to-spotifys-api",
  },
  {
    number: "W03",
    title: "WHAT IS WEB3?",
    type: "EXPLAINER",
    date: "FEB 2023",
    href: "https://reine.hashnode.dev/what-is-web3-an-introduction-to-the-decentralized-web",
  },
  {
    number: "W04",
    title: "MY JOURNEY SO FAR: BECOMING REINE DEV",
    type: "PERSONAL ESSAY",
    date: "MAR 2023",
    href: "https://medium.com/@reinetoyosii/my-journey-so-far-becoming-reine-dev-ce28c70e21a6",
  },
  {
    number: "W05",
    title: "MY NOTES ON HEALING",
    type: "PERSONAL ESSAY",
    date: "MAY 2024",
    href: "https://medium.com/@reinetoyosii/my-notes-on-healing-a102bc1312b8",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CrownMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 40" aria-hidden="true">
      <path d="M5 10 15 19 24 5 33 19 43 10 40 31H8L5 10Z" />
      <path d="M9 36H39" />
    </svg>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 420);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${isVisible ? " is-visible" : ""}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}

function CursorTrail() {
  const trailRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    let lastX = -100;
    let lastY = -100;
    let symbolIndex = 0;
    const symbols = ["</>", "♡", "♕", "✦", "♫", "{ }", "☺"];

    const leaveMark = (event) => {
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance < 34 || !trailRef.current) return;

      lastX = event.clientX;
      lastY = event.clientY;
      const mark = document.createElement("span");
      mark.className = "cursor-trail__mark";
      mark.textContent = symbols[symbolIndex % symbols.length];
      symbolIndex += 1;
      mark.style.left = `${event.clientX}px`;
      mark.style.top = `${event.clientY}px`;
      mark.style.setProperty("--trail-rotate", `${-12 + Math.random() * 24}deg`);
      trailRef.current.appendChild(mark);
      window.setTimeout(() => mark.remove(), 1600);
    };

    window.addEventListener("pointermove", leaveMark, { passive: true });
    return () => window.removeEventListener("pointermove", leaveMark);
  }, []);

  return <div ref={trailRef} className="cursor-trail" aria-hidden="true" />;
}

function ContactSection({ variant = "studio" }) {
  const panelRef = useRef(null);
  const link = "https://wa.me/message/76OBSZ4WWLQ3L1";

  const tiltPanel = (event) => {
    const panel = panelRef.current;
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    panel.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    panel.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
    panel.style.setProperty("--shine-x", `${x * 100}%`);
    panel.style.setProperty("--shine-y", `${y * 100}%`);
  };

  const resetPanel = () => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.setProperty("--tilt-x", "0deg");
    panel.style.setProperty("--tilt-y", "0deg");
  };

  if (variant === "work") {
    return (
      <section ref={panelRef} className="work-page__contact tactile-panel" onPointerMove={tiltPanel} onPointerLeave={resetPanel}>
        <span>REINE DEV ENTERPRISES / LAGOS</span>
        <h2>HAVE A GOOD IDEA?</h2>
        <a href={link} target="_blank" rel="noreferrer">LET’S BUILD COOL SHIT <Arrow /></a>
      </section>
    );
  }

  return (
    <section ref={panelRef} className="studio-strip tactile-panel" aria-label="Reine Dev Enterprises" onPointerMove={tiltPanel} onPointerLeave={resetPanel}>
      <p>HAVE A GOOD IDEA?</p>
      <a href={link} target="_blank" rel="noreferrer">LET’S BUILD COOL SHIT <Arrow /></a>
      <p>REINE DEV ENTERPRISES / LAGOS</p>
    </section>
  );
}

function RaveSignal() {
  const panelRef = useRef(null);

  const tiltPanel = (event) => {
    const panel = panelRef.current;
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    panel.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    panel.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
    panel.style.setProperty("--shine-x", `${x * 100}%`);
    panel.style.setProperty("--shine-y", `${y * 100}%`);
  };

  const resetPanel = () => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.setProperty("--tilt-x", "0deg");
    panel.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section ref={panelRef} className="next-signal tactile-panel tactile-panel--outside" onPointerMove={tiltPanel} onPointerLeave={resetPanel}>
      <span>COMING SOON</span>
      <strong>REINE’S RAVE</strong>
      <span>LATE 2026 / BEACH GETAWAY</span>
      <a href="https://chat.whatsapp.com/J1peyr3bjQzCN7mHPfUpPR?mode=gi_t" target="_blank" rel="noreferrer">STAY IN THE LOOP <Arrow /></a>
    </section>
  );
}

function DraggableTag({ children, className }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const moveBy = (x, y) => setOffset((current) => ({ x: current.x + x, y: current.y + y }));

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, ...offset };
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tag-shine-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--tag-shine-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    if (!dragStart.current) return;
    const deltaX = event.clientX - dragStart.current.pointerX;
    const deltaY = event.clientY - dragStart.current.pointerY;
    setOffset({ x: dragStart.current.x + deltaX, y: dragStart.current.y + deltaY });
    setTilt({
      x: Math.max(-12, Math.min(12, -deltaY / 8)),
      y: Math.max(-12, Math.min(12, deltaX / 8)),
    });
  };

  const stopDragging = () => {
    dragStart.current = null;
    setDragging(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleKeyDown = (event) => {
    const amount = event.shiftKey ? 20 : 8;
    const directions = {
      ArrowLeft: [-amount, 0],
      ArrowRight: [amount, 0],
      ArrowUp: [0, -amount],
      ArrowDown: [0, amount],
    };
    if (!directions[event.key]) return;
    event.preventDefault();
    moveBy(...directions[event.key]);
  };

  return (
    <div
      className={`tape ${className}${dragging ? " is-dragging" : ""}`}
      style={{
        "--drag-x": `${offset.x}px`,
        "--drag-y": `${offset.y}px`,
        "--tilt-x": `${tilt.x}deg`,
        "--tilt-y": `${tilt.y}deg`,
      }}
      role="button"
      tabIndex="0"
      aria-label={`${children}. Drag to move; double-click to reset.`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onDoubleClick={() => setOffset({ x: 0, y: 0 })}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

function RevealHeading({ id, children }) {
  const triggerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={triggerRef} className="reveal-heading__trigger">
      <h2 id={id} className={`reveal-heading${isVisible ? " is-visible" : ""}`}>
        {children}
      </h2>
    </div>
  );
}

function WorkPage() {
  return (
    <div className="site site--online work-page">
      <CursorTrail />
      <header className="topbar">
        <a className="topbar__id" href="/" aria-label="Back to Reine home">
          REINE <span>/ SELECTED WORK</span>
        </a>
        <a className="work-page__back" href="/">← BACK HOME</a>
        <div className="topbar__signal"><span className="signal-dot" /> AVAILABLE FOR SELECTED COMMISSIONS</div>
      </header>

      <main>
        <section className="work-page__hero">
          <div className="section-kicker">
            <span>WEBSITES / WEB APPS / PRODUCTS WITH PERSONALITY</span>
            <span>STUDIO BUILDS</span>
          </div>
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
          <div className="work-page__archives">
            <a href="https://github.com/Rei-ne" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          </div>
        </section>

        <section className="writing" aria-label="Technical articles and other writing">
          <div className="section-kicker">
            <span>TECHNICAL ARTICLES + OTHER WRITING</span>
          </div>
          <div className="writing__list">
            {writing.map((article) => (
              <a key={article.title} href={article.href} target="_blank" rel="noreferrer" className="writing-entry">
                <span>{article.number}</span>
                <h3>{article.title}</h3>
                <small>{article.type} / {article.date}</small>
                <Arrow />
              </a>
            ))}
          </div>
          <div className="writing__archives">
            <a href="https://reine.hashnode.dev/" target="_blank" rel="noreferrer">HASHNODE <Arrow /></a>
            <a href="https://medium.com/@reinetoyosii" target="_blank" rel="noreferrer">MEDIUM <Arrow /></a>
          </div>
        </section>

        <ContactSection variant="work" />
      </main>
      <ScrollToTop />
    </div>
  );
}

function App() {
  const [world, setWorld] = useState("online");
  const [time, setTime] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (nextWorld === world || isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      setWorld(nextWorld);
      window.scrollTo({ top: 0 });
    }, 560);
    window.setTimeout(() => setIsTransitioning(false), 1300);
  };

  return (
    <div className={`site site--${world}`}>
      <CursorTrail />
      <header className="topbar">
        <a className="topbar__id" href="#top" aria-label="Reine, home">
          TOYOSI ODUKALE <span>/ LAGOS</span>
        </a>

        <div className="world-switch" role="group" aria-label="Choose a world">
          <button
            type="button"
            className={world === "online" ? "is-active" : ""}
            aria-pressed={world === "online"}
            disabled={isTransitioning}
            onClick={() => chooseWorld("online")}
          >
            ONLINE
          </button>
          <button
            type="button"
            className={world === "outside" ? "is-active" : ""}
            aria-pressed={world === "outside"}
            disabled={isTransitioning}
            onClick={() => chooseWorld("outside")}
          >
            OUTSIDE
          </button>
        </div>

        <div className="topbar__signal" aria-label={`Local Lagos time ${time}`}>
          <span className="signal-dot" /> {time || "--:--"} / 06°27′N
        </div>
      </header>

      {isTransitioning && (
        <div className={`world-transition world-transition--${world}`} aria-hidden="true" />
      )}

      <main id="top">
        {world === "online" ? (
          <div className="world world--online">
            <section className="hero hero--online" aria-labelledby="online-title">
              <CrownMark className="hero__artifact hero__artifact--crown" />
              <div className="hero__word-wrap">
                <h1 id="online-title" className="hero__word">reine</h1>
                <CrownMark className="hero__crown" />
              </div>

              <figure className="portrait-card">
                <img src="/assets/reine/portrait.jpg" alt="Toyosi Reine Odukale" />
                <figcaption>REINE / 2026</figcaption>
              </figure>

              <DraggableTag className="tape--green">FULL-STACK DEV / MUSIC EXEC</DraggableTag>
              <DraggableTag className="tape--cream">TECH FOUNDER / CREATIVE STRATEGIST</DraggableTag>

              <div className="terminal" aria-label="About Reine">
                <div className="terminal__bar">
                  <span>REINE_DEV.LOG</span>
                </div>
                <ol>
                  <li><span>01</span> MUSIC IS LIFE</li>
                  <li><span>02</span> I CREATE WEBSITES THAT AREN’T BORING</li>
                  <li><span>03</span> AND MINDBLOWING EXPERIENCES</li>
                  <li><span>04</span> FROM: LAGOS, NIGERIA</li>
                </ol>
              </div>

              <div className="hero__index" aria-hidden="true">
                <span>I CREATE</span>
                <span>I CODE</span>
                <span>I ❤️ MUSIC</span>
              </div>
            </section>

            <section className="online-work" id="work" aria-labelledby="online-work-title">
              <div className="section-kicker">
                <span>SELECTED WORK</span>
                <span>2022–DATE</span>
              </div>
              <RevealHeading id="online-work-title">Web apps I have built.</RevealHeading>

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

            <ContactSection />
          </div>
        ) : (
          <div className="world world--outside">
            <section className="outside-hero" aria-label="Outside projects">
              <a className="night-tile night-tile--main" href="https://www.instagram.com/factoryreset.xyz/" target="_blank" rel="noreferrer" aria-label="Visit Factory Reset on Instagram">
                <img src="/assets/factory-reset/crowd.jpg" alt="Guests at Factory Reset" />
                <span className="night-tile__caption">FACTORY RESET</span>
              </a>
              <a className="night-tile night-tile--logo night-tile--photo" href="https://www.instagram.com/reine_dev/" target="_blank" rel="noreferrer" aria-label="Visit Reine on Instagram">
                <img src="/assets/factory-reset/cozy6275.jpg" alt="Reine at Factory Reset" />
              </a>
              <a className="night-tile night-tile--flyer" href="https://www.instagram.com/reines.rave/" target="_blank" rel="noreferrer" aria-label="Visit Reine’s Rave on Instagram">
                <img src="/assets/reines-rave/main-logo.svg" alt="Reine’s Rave" />
                <span className="night-tile__caption">REINE’S RAVE</span>
              </a>
              <a className="night-tile night-tile--rave" href="https://www.tiktok.com/@reine_dev" target="_blank" rel="noreferrer" aria-label="Visit Reine on TikTok">
                <img src="/assets/reine/outside.jpg" alt="Reine outdoors at dusk" />
              </a>
            </section>

            <RaveSignal />
          </div>
        )}

        <section className="identity" aria-labelledby="identity-title">
          <div className="identity__label">BIO</div>
          <div className="identity__body">
            <h2 id="identity-title">TOYOSI “REINE” ODUKALE</h2>
            <p className="identity__item" data-detail="VIBESFACTORY / REINE’S RAVE / FACTORY RESET">CO-FOUNDER</p>
            <p className="identity__item" data-detail="I BUILD B2B AND E-COMMERCE WEB APPS">FULL-STACK DEVELOPER</p>
            <p className="identity__item" data-detail="MUSIC RELEASE STRATEGY AND PLANNING">CREATIVE STRATEGIST</p>
            <p className="identity__item" data-detail="I LOVE TO PARTAYYY">SERIOUS ABOUT A GOOD NIGHT OUT</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <span>LIKE MY WORK?</span>
          <a className="footer__coffee" href="https://paystack.shop/pay/reinedev" target="_blank" rel="noreferrer">
            BUY ME A COFFEE <Arrow />
          </a>
        </div>
        <nav aria-label="Social links">
          <a href="https://github.com/Rei-ne" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          <a href="https://www.linkedin.com/in/toyosi-odukale/" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a>
          <a href="https://x.com/reine_dev" target="_blank" rel="noreferrer">X <Arrow /></a>
          <a href="https://www.instagram.com/reine_dev/" target="_blank" rel="noreferrer">INSTAGRAM <Arrow /></a>
        </nav>
        <span>© 2026 TOYOSI ODUKALE / MADE IN LAGOS</span>
      </footer>
      <ScrollToTop />
    </div>
  );
}

function SiteRouter() {
  return window.location.pathname === "/work" ? <WorkPage /> : <App />;
}

export default SiteRouter;
