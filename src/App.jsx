import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./App.css";

const onlineProjects = [
  {
    number: "01",
    name: "GORAVE",
    type: "EXPERIENCE GAME APP",
    note: "INTERACTIVE EXPERIENCE / APP DEVELOPMENT",
    href: "https://gorave.xyz/",
    image: "/assets/work-previews/gorave.jpg",
  },
  {
    number: "02",
    name: "FACTORY RESET",
    type: "WEB + TICKETING",
    note: "EXPERIENCE DESIGN / EVENT INFRASTRUCTURE",
    href: "https://factoryreset.vibesfactory.co/",
    image: "/assets/work-previews/factory-reset.jpg",
  },
  {
    number: "03",
    name: "ANKORIO LMS",
    type: "LOGISTICS MANAGEMENT SYSTEM",
    note: "FULL-STACK MVP / PRODUCT ENGINEERING",
    href: "https://ankorio.com/",
    image: "/assets/work-previews/ankorio.png",
  },
  {
    number: "04",
    name: "PEEPS AFRICA",
    type: "AGENCY WEBSITE",
    note: "CREATIVE DIRECTION / WEB DEVELOPMENT",
    href: "https://peepsafrica.com/",
    image: "/assets/work-previews/peeps.png",
  },
  {
    number: "05",
    name: "TIKTALK MEDIA",
    type: "MEDIA PLATFORM",
    note: "WEB DESIGN / DEVELOPMENT / DIGITAL EXPERIENCE",
    href: "https://tiktalkmedia.com/",
    image: "/assets/work-previews/tiktalk.jpg",
  },
];

const fullWorkProjects = [
  ...onlineProjects,
  {
    number: "06",
    name: "ALBUM COVER BANK",
    type: "CULTURAL ARCHIVE",
    note: "REACT / AIRTABLE / NIGERIAN MUSIC HISTORY",
    href: "https://www.albumcoverbank.com/",
    image: "/assets/work-previews/album-cover-bank.png",
  },
  {
    number: "07",
    name: "SCENT ELIXIR",
    type: "E-COMMERCE",
    note: "STOREFRONT / WEB DEVELOPMENT",
    href: "https://scentelixir.ng/",
    image: "/assets/work-previews/scent-elixir.png",
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

function ScrollReveals() {
  useEffect(() => {
    let animationFrame;
    const update = () => {
      animationFrame = undefined;
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const visible = bounds.top < window.innerHeight * 0.93 && bounds.bottom > window.innerHeight * 0.07;
        element.classList.toggle("is-revealed", visible);
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    document.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate);
    const mutations = new MutationObserver(scheduleUpdate);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      mutations.disconnect();
    };
  }, []);

  return null;
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
        <h2>HAVE A GOOD IDEA?</h2>
        <a href={link} target="_blank" rel="noreferrer">LET’S BUILD COOL STUFF</a>
      </section>
    );
  }

  return (
    <section ref={panelRef} className="studio-strip tactile-panel" data-reveal="panel" aria-label="Reine Dev Enterprises" onPointerMove={tiltPanel} onPointerLeave={resetPanel}>
      <p>HAVE A GOOD IDEA?</p>
      <a href={link} target="_blank" rel="noreferrer">LET’S BUILD COOL STUFF</a>
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
    <section ref={panelRef} className="next-signal tactile-panel tactile-panel--outside" data-reveal="panel" onPointerMove={tiltPanel} onPointerLeave={resetPanel}>
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

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const entrance = gsap.fromTo(
      card,
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, duration: 0.8, delay: index * 0.07, ease: "power3.out" },
    );
    return () => entrance.kill();
  }, [index]);

  const animateCard = (state, event) => {
    const card = cardRef.current;
    if (!card) return;
    if (event?.pointerType === "touch") return;

    const bounds = card.getBoundingClientRect();
    const pointerX = event ? (event.clientX - bounds.left) / bounds.width - 0.5 : 0;
    const pointerY = event ? (event.clientY - bounds.top) / bounds.height - 0.5 : 0;

    const states = {
      rest: { y: 0, scale: 1, rotationX: 0, rotationY: 0, filter: "brightness(1)" },
      hover: { y: 5, scale: 0.975, rotationX: pointerY * -7, rotationY: pointerX * 9, filter: "brightness(.94)" },
      pressed: { y: 13, scale: 0.91, rotationX: pointerY * -4, rotationY: pointerX * 5, filter: "brightness(.82)" },
    };

    gsap.killTweensOf(card);
    gsap.to(card, {
      ...states[state],
      duration: state === "pressed" ? 0.12 : 0.34,
      ease: state === "rest" ? "back.out(1.7)" : "power3.out",
      transformPerspective: 900,
      overwrite: true,
    });
  };

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="project-card"
      aria-label={`Open ${project.name}`}
      onPointerEnter={(event) => animateCard("hover", event)}
      onPointerMove={(event) => animateCard("hover", event)}
      onPointerLeave={() => animateCard("rest")}
      onPointerDown={(event) => animateCard("pressed", event)}
      onPointerUp={(event) => animateCard("hover", event)}
      onPointerCancel={() => animateCard("rest")}
      onFocus={() => animateCard("hover")}
      onBlur={() => animateCard("rest")}
    >
      <span className="project-card__image">
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          loading={index > 1 ? "lazy" : "eager"}
        />
      </span>
      <span className="project-card__caption">
        <span>
          <strong>{project.name}</strong>
          <small>{project.type}</small>
        </span>
        <em>{project.note}</em>
      </span>
    </a>
  );
}

function ProjectRail({ className, children, label }) {
  const railRef = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const redirectWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const movingForward = event.deltaY > 0;
      const canMove = movingForward
        ? rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2
        : rail.scrollLeft > 2;
      if (!canMove) return;
      event.preventDefault();
      rail.scrollLeft += event.deltaY * 1.15;
    };

    rail.addEventListener("wheel", redirectWheel, { passive: false });
    return () => rail.removeEventListener("wheel", redirectWheel);
  }, []);

  return <div ref={railRef} className={className} aria-label={label}>{children}</div>;
}

function WorkPage() {
  const returnToSelectedWork = (event) => {
    event.preventDefault();
    const cameFromSelectedWork = window.sessionStorage.getItem("reine-selected-work-open") === "1";
    if (cameFromSelectedWork && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign("/?selected=1");
    }
  };

  return (
    <div className="site site--online work-page work-page--scrapbook">
      <CursorTrail />
      <ScrollReveals />
      <header className="topbar">
        <a className="topbar__id" href="/" aria-label="Back to Reine home">REINE</a>
        <a className="work-page__back" href="/?selected=1" onClick={returnToSelectedWork}>&lt; BACK TO SELECTED WORK</a>
        <div className="topbar__signal"><span className="signal-dot" /> AVAILABLE FOR SELECTED COMMISSIONS</div>
      </header>

      <main className="work-page__paper">
        <h1 className="work-page__title">All apps.</h1>
        <ProjectRail className="work-page__list" label="Selected technical work">
          {fullWorkProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
          <div className="work-page__archives">
            <a href="https://github.com/Rei-ne" target="_blank" rel="noreferrer">GITHUB</a>
          </div>
        </ProjectRail>

        <section className="writing" data-reveal="section" aria-label="Written work">
          <h2 className="writing__title">Written work.</h2>
          <div className="writing__list">
            {writing.map((article, index) => (
              <a key={article.title} href={article.href} target="_blank" rel="noreferrer" className="writing-entry">
                <span>{article.number}</span>
                <h3>{article.title}</h3>
                <small>{article.type} / {article.date}</small>
              </a>
            ))}
          </div>
          <div className="writing__archives">
            <a href="https://reine.hashnode.dev/" target="_blank" rel="noreferrer">HASHNODE</a>
            <a href="https://medium.com/@reinetoyosii" target="_blank" rel="noreferrer">MEDIUM</a>
          </div>
        </section>

        <ContactSection variant="work" />
        <SiteFooter />
      </main>
    </div>
  );
}

function IdentitySection() {
  return (
    <section className="identity" data-reveal="bio" aria-labelledby="identity-title">
      <div className="identity__label">BIO</div>
      <div className="identity__body">
        <h2 id="identity-title">TOYOSI “REINE” ODUKALE</h2>
        <p className="identity__item" data-detail="VIBESFACTORY / REINE’S RAVE / FACTORY RESET">CO-FOUNDER</p>
        <p className="identity__item" data-detail="I BUILD B2B AND E-COMMERCE WEB APPS">FULL-STACK DEVELOPER</p>
        <p className="identity__item" data-detail="MUSIC RELEASE STRATEGY AND PLANNING">CREATIVE STRATEGIST</p>
        <p className="identity__item" data-detail="I LOVE TO PARTAYYY">SERIOUS ABOUT A GOOD NIGHT OUT</p>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="footer" data-reveal="footer">
      <div>
        <span>LIKE MY WORK?</span>
        <a className="footer__coffee" href="https://paystack.shop/pay/reinedev" target="_blank" rel="noreferrer">
          BUY ME A COFFEE
        </a>
      </div>
      <nav aria-label="Social links">
        <a href="https://github.com/Rei-ne" target="_blank" rel="noreferrer">GITHUB</a>
        <a href="https://www.linkedin.com/in/toyosi-odukale/" target="_blank" rel="noreferrer">LINKEDIN</a>
        <a href="https://x.com/reine_dev" target="_blank" rel="noreferrer">X</a>
        <a href="https://www.instagram.com/reine_dev/" target="_blank" rel="noreferrer">INSTAGRAM</a>
      </nav>
      <span>© 2026 TOYOSI ODUKALE</span>
    </footer>
  );
}

function ScrapbookArchive({ paperRef, onClose }) {
  return (
    <div className="scrapbook-overlay" role="dialog" aria-modal="true" aria-label="Selected work">
      <button className="scrapbook-overlay__backdrop" type="button" onClick={onClose} aria-label="Close selected work" />
      <article ref={paperRef} className="scrapbook-paper">
        <span className="scrapbook-tape scrapbook-tape--left" aria-hidden="true" />
        <span className="scrapbook-tape scrapbook-tape--right" aria-hidden="true" />
        <div className="scrapbook-paper__bar">
          <button type="button" onClick={onClose}>CLOSE ×</button>
        </div>
        <div className="scrapbook-paper__content">
          <section className="online-work" id="work" aria-labelledby="online-work-title">
            <h2 id="online-work-title">My web apps.</h2>

            <ProjectRail className="project-list" label="My web apps">
              {onlineProjects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </ProjectRail>
            <a className="all-work-link" href="/work" onClick={() => window.sessionStorage.setItem("reine-selected-work-open", "1")}>VIEW ALL TECHNICAL WORK <Arrow /></a>
            <a className="all-work-link" href="/pitcher/">OPEN PITCHER <Arrow /></a>
          </section>
          <ContactSection />
          <IdentitySection />
          <SiteFooter />
        </div>
      </article>
    </div>
  );
}

function App() {
  const [world, setWorld] = useState("online");
  const [time, setTime] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(() => (
    window.sessionStorage.getItem("reine-selected-work-open") === "1"
    || new URLSearchParams(window.location.search).get("selected") === "1"
  ));
  const portraitRef = useRef(null);
  const paperRef = useRef(null);
  const portraitBounds = useRef(null);

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

  const openArchive = () => {
    if (!portraitRef.current || archiveOpen) return;
    portraitBounds.current = portraitRef.current.getBoundingClientRect();
    setArchiveOpen(true);
  };

  const closeArchive = () => {
    const paper = paperRef.current;
    const target = portraitRef.current?.getBoundingClientRect();
    if (!paper || !target) {
      setArchiveOpen(false);
      return;
    }
    const paperBounds = paper.getBoundingClientRect();
    gsap.timeline({ onComplete: () => setArchiveOpen(false) })
      .to(".scrapbook-paper__content, .scrapbook-paper__bar", { opacity: 0, y: 22, duration: 0.22, ease: "power2.in" })
      .to(paper, {
        x: target.left + target.width / 2 - (paperBounds.left + paperBounds.width / 2),
        y: target.top + target.height / 2 - (paperBounds.top + paperBounds.height / 2),
        scaleX: target.width / paperBounds.width,
        scaleY: target.height / paperBounds.height,
        rotation: 2.5,
        duration: 0.7,
        ease: "power3.inOut",
      }, 0.08)
      .to(".scrapbook-overlay__backdrop", { opacity: 0, duration: 0.45 }, 0.2);
  };

  useEffect(() => {
    const clearReturnState = () => window.sessionStorage.removeItem("reine-selected-work-open");
    clearReturnState();
    window.addEventListener("pageshow", clearReturnState);
    if (window.location.search) window.history.replaceState({}, "", "/");
    return () => window.removeEventListener("pageshow", clearReturnState);
  }, []);

  useEffect(() => {
    if (!archiveOpen || !paperRef.current) return undefined;
    const paper = paperRef.current;
    const paperBounds = paper.getBoundingClientRect();
    const source = portraitBounds.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("archive-is-open");

    if (reducedMotion || !source) {
      gsap.set([paper, ".scrapbook-paper__content", ".scrapbook-paper__bar", ".scrapbook-overlay__backdrop"], { clearProps: "all" });
    } else {
      gsap.set(paper, {
        x: source.left + source.width / 2 - (paperBounds.left + paperBounds.width / 2),
        y: source.top + source.height / 2 - (paperBounds.top + paperBounds.height / 2),
        scaleX: source.width / paperBounds.width,
        scaleY: source.height / paperBounds.height,
        rotation: 2.5,
        transformOrigin: "center center",
      });
      gsap.set(".scrapbook-paper__content, .scrapbook-paper__bar", { opacity: 0, y: 32 });
      gsap.set(".scrapbook-overlay__backdrop", { opacity: 0 });
      gsap.timeline()
        .to(".scrapbook-overlay__backdrop", { opacity: 1, duration: 0.45, ease: "power2.out" })
        .to(paper, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 1.05, ease: "power4.inOut" }, 0)
        .to(".scrapbook-paper__bar", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.68)
        .to(".scrapbook-paper__content", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.76)
        .fromTo(".scrapbook-tape", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.42, stagger: 0.1, ease: "back.out(1.8)" }, 0.72);
    }

    const closeOnEscape = (event) => event.key === "Escape" && closeArchive();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("archive-is-open");
      window.removeEventListener("keydown", closeOnEscape);
      gsap.killTweensOf([paper, ".scrapbook-paper__content", ".scrapbook-paper__bar", ".scrapbook-overlay__backdrop", ".scrapbook-tape"]);
    };
  }, [archiveOpen]);

  return (
    <div className={`site site--${world}`}>
      <CursorTrail />
      <ScrollReveals />
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

              <button ref={portraitRef} type="button" className="portrait-card" onClick={openArchive} aria-label="Open Reine’s selected work">
                <img src="/assets/reine/portrait.jpg" alt="Toyosi Reine Odukale" />
                <span>CLICK TO VIEW MY WORK</span>
              </button>

              <DraggableTag className="tape--green">FULL-STACK DEV / MUSIC EXEC</DraggableTag>
              <DraggableTag className="tape--cream">TECH AND CREATIVE UNICORN</DraggableTag>

              <div className="terminal" aria-label="About Reine">
                <div className="terminal__bar">
                  <span>REINE_DEV.LOG</span>
                </div>
                <ol>
                  <li><span>01</span> MUSIC IS LIFE</li>
                  <li><span>02</span> I CREATE WEBSITES THAT AREN’T BORING</li>
                  <li><span>03</span> AND MINDBLOWING EXPERIENCES ON THE INTERNET</li>
                  <li><span>04</span> FROM: LAGOS, NIGERIA</li>
                </ol>
              </div>

              <div className="hero__index" aria-hidden="true">
                <span>I CREATE</span>
                <span>I CODE</span>
                <span>I ❤️ MUSIC</span>
              </div>
            </section>

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
                <span className="night-tile__caption">INSTAGRAM</span>
              </a>
              <a className="night-tile night-tile--flyer" href="https://www.instagram.com/reines.rave/" target="_blank" rel="noreferrer" aria-label="Visit Reine’s Rave on Instagram">
                <img src="/assets/reines-rave/main-logo.svg" alt="Reine’s Rave" />
                <span className="night-tile__caption">REINE’S RAVE</span>
              </a>
              <a className="night-tile night-tile--rave" href="https://www.tiktok.com/@reine_dev" target="_blank" rel="noreferrer" aria-label="Visit Reine on TikTok">
                <img src="/assets/reine/outside.jpg" alt="Reine outdoors at dusk" />
                <span className="night-tile__caption">TIKTOK</span>
              </a>
            </section>

          </div>
        )}
      </main>

      {archiveOpen && <ScrapbookArchive paperRef={paperRef} onClose={closeArchive} />}
    </div>
  );
}

function SiteRouter() {
  return window.location.pathname === "/work" ? <WorkPage /> : <App />;
}

export default SiteRouter;
