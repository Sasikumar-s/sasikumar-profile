"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  "About",
  "Skills",
  "Experience",
  "Certifications",
  "Contact",
];

const SKILLS = {
  Languages: ["Core Java", "JavaScript", "TypeScript", "PL/SQL"],
  Frontend: ["React", "Next.js", "Lit Element", "Open-WC", "HTML", "CSS"],
  Backend: [
    "Spring Boot 3",
    "Spring 6",
    "REST API",
    "Hibernate",
    "Spring Data JPA",
  ],
  Databases: ["Oracle SQL", "MySQL", "PostgreSQL"],
  "State & Tools": [
    "Redux",
    "Git",
    "Azure DevOps",
    "SVN",
    "SonarQube",
    "Coverity",
  ],
  "IDEs & Servers": ["VS Code", "STS 4", "Tomcat", "FileZilla"],
};

const EXPERIENCES = [
  {
    period: "Apr 2025 – Present",
    role: "Front End Developer",
    project: "Core Processing Tool",
    tech: "React · Java 11",
    desc: "A data utility tool to verify, validate, insert, and update monthly supplier data ensuring integrity before integration with Flight Management Systems.",
    points: [
      "Resolved Coverity security and code quality issues flagged by Black Duck in the UI layer.",
      "Provided solution designs for UI-related issues ensuring maintainability and coding standards compliance.",
      "Generates comprehensive reports for processed data to support operational accuracy.",
    ],
    color: "#00FFB2",
  },
  {
    period: "Feb 2025 – Mar 2025",
    role: "Front End Developer",
    project: "Oracle Forms Migrator",
    tech: "Next.js · Cheerio",
    desc: "An internal tool to automate conversion of PL/SQL code into React and Java components, streamlining the Oracle Forms migration process.",
    points: [
      "Built a Trigger Sequence Generator using Cheerio and React Flow to automate and visualize Oracle Forms trigger sequences.",
      "Designed a Conversion Batch Process transforming Oracle Forms into XML via Oracle Forms Compiler.",
      "Built XMLQuery Module to extract and search specific information from XML files.",
    ],
    color: "#FFD700",
  },
  {
    period: "Oct 2022 – Jan 2025",
    role: "Full Stack Developer",
    project: "CRE-Credit Application",
    tech: "LitElement · Spring Boot · Java 11",
    desc: "B2B legacy modernization — migrating Oracle Forms to modern web technologies for bank employees to manage user surety details.",
    points: [
      "Migrated Oracle Forms to modern web UIs using LitElement, Open-WC, Spring Boot, and JPA.",
      "Designed frontend architecture using Open-WC skeletons and reusable LitElement base classes.",
      "Implemented Redux for efficient state management and improved component communication.",
      "Led technical scope definition, enforced coding standards, and resolved SIT/UAT defects.",
    ],
    color: "#FF6B6B",
  },
];

const CERTS = [
  "ASP.NET Core Web API — The Complete Guide",
  "AJAX Development",
  "The Complete jQuery Course: Beginner to Advanced",
  "Azure DevOps Fundamentals for Beginners",
];

/* ─── HOOKS ─────────────────────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1200,
  });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp({
        isMobile: w < 640,
        isTablet: w >= 640 && w < 1024,
        isDesktop: w >= 1024,
        width: w,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── CURSOR (desktop only) ─────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const { isDesktop } = useBreakpoint();
  useEffect(() => {
    if (!isDesktop) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      id;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", move);
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current)
        ring.current.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
      if (dot.current)
        dot.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      id = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
    };
  }, [isDesktop]);
  if (!isDesktop) return null;
  return (
    <>
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: "1.5px solid rgba(0,255,178,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: "#00FFB2",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}

/* ─── NOISE ─────────────────────────────────────────────────────────── */
function Noise() {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.03,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────────── */
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const compact = isMobile || isTablet;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on nav click
  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: compact ? "0 20px" : "0 48px",
          height: compact ? 56 : 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            scrolled || menuOpen ? "rgba(8,8,12,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 22,
            letterSpacing: 4,
            color: "#00FFB2",
            zIndex: 201,
          }}
        >
          SASI.DEV
        </span>

        {/* Desktop links */}
        {!compact && (
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color:
                    active === l.toLowerCase()
                      ? "#00FFB2"
                      : "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#00FFB2")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    active === l.toLowerCase()
                      ? "#00FFB2"
                      : "rgba(255,255,255,0.5)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {compact && (
          <button
            onClick={() => setMenuOpen((p) => !p)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 201,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-end",
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                height: 2,
                background: "#00FFB2",
                transition: "all 0.3s",
                width: menuOpen ? 24 : 24,
                transform: menuOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                background: "#00FFB2",
                transition: "all 0.3s",
                width: menuOpen ? 24 : 16,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                background: "#00FFB2",
                transition: "all 0.3s",
                width: menuOpen ? 24 : 20,
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile fullscreen menu */}
      {compact && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 190,
            background: "rgba(8,8,12,0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={handleNavClick}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 42,
                letterSpacing: 4,
                textTransform: "uppercase",
                color:
                  active === l.toLowerCase()
                    ? "#00FFB2"
                    : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "all 0.2s",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(20px)",
                transitionDelay: `${i * 0.06 + 0.1}s`,
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="mailto:sasikumarbe2018@gmail.com"
            style={{
              marginTop: 16,
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            sasikumarbe2018@gmail.com
          </a>
        </div>
      )}
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────── */
function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  const compact = isMobile || isTablet;
  const [typed, setTyped] = useState("");
  const words = [
    "Full Stack Developer",
    "React Specialist",
    "Spring Boot Engineer",
    "Legacy Modernizer",
  ];
  const [wi, setWi] = useState(0);

  useEffect(() => {
    let i = 0,
      adding = true,
      timeout;
    const tick = () => {
      const word = words[wi];
      if (adding) {
        i++;
        setTyped(word.slice(0, i));
        if (i === word.length) {
          adding = false;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        i--;
        setTyped(word.slice(0, i));
        if (i === 0) {
          adding = true;
          setWi((p) => (p + 1) % words.length);
        }
      }
      timeout = setTimeout(tick, adding ? 70 : 40);
    };
    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [wi]);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile
          ? "100px 20px 60px"
          : isTablet
            ? "110px 40px 60px"
            : "120px 80px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,178,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,178,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: isMobile ? "10%" : "20%",
          right: isMobile ? "-20%" : "5%",
          width: isMobile ? 280 : 500,
          height: isMobile ? 280 : 500,
          background:
            "radial-gradient(circle,rgba(0,255,178,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: isMobile ? 10 : 12,
            letterSpacing: isMobile ? 2 : 4,
            color: "#00FFB2",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 1,
              background: "#00FFB2",
              flexShrink: 0,
            }}
          />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: isMobile
              ? "clamp(48px,14vw,72px)"
              : isTablet
                ? "clamp(64px,10vw,90px)"
                : "clamp(72px,8vw,110px)",
            lineHeight: 0.92,
            letterSpacing: 2,
            margin: "0 0 12px",
            color: "#fff",
          }}
        >
          SASIKUMAR
          <br />
          <span
            style={{
              color: "#00FFB2",
              WebkitTextStroke: "2px #00FFB2",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isMobile ? "SEMALAIYAPAN" : "SEMALAIYAPAN"}
          </span>
        </h1>

        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: isMobile ? 14 : isTablet ? 17 : 22,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            minHeight: 28,
          }}
        >
          <span>{typed}</span>
          <span
            style={{
              animation: "blink 1s infinite",
              borderLeft: "2px solid #00FFB2",
              marginLeft: 2,
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'Instrument Serif',serif",
            fontSize: isMobile ? 15 : 18,
            color: "rgba(255,255,255,0.55)",
            maxWidth: compact ? "100%" : 560,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          4 years crafting scalable web applications and modernizing legacy
          systems. Based in Chennai — blending precision engineering with clean
          architecture.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="mailto:sasikumarbe2018@gmail.com"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: isMobile ? "12px 24px" : "14px 32px",
              background: "#00FFB2",
              color: "#08080C",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-block",
              transition: "background 0.2s",
            }}
          >
            Get In Touch
          </a>
          <a
            href="https://github.com/Sasikumar-s"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: isMobile ? "12px 24px" : "14px 32px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              transition: "all 0.2s",
              display: "inline-block",
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll hint — hide on mobile */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <span>SCROLL</span>
          <div
            style={{
              width: 1,
              height: 50,
              background:
                "linear-gradient(to bottom,rgba(0,255,178,0.4),transparent)",
              animation: "scrollPulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      )}
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────────────── */
function SkillSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const [ref, vis] = useInView();
  const pad = isMobile ? "80px 20px" : isTablet ? "100px 40px" : "120px 80px";

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: pad, position: "relative" }}
    >
      <SectionLabel>Technical Skills</SectionLabel>
      <h2 style={sectionTitle}>THE STACK</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2,1fr)"
              : "repeat(3,1fr)",
          gap: 1,
          border: "1px solid rgba(255,255,255,0.06)",
          marginTop: 48,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <div
            key={cat}
            style={{
              padding: isMobile ? "24px 20px" : 32,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: `all 0.5s ease ${i * 0.07}s`,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: 4,
                color: "#00FFB2",
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {String(i + 1).padStart(2, "0")} / {cat}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {items.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: 1,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#00FFB2";
                    e.target.style.color = "#00FFB2";
                    e.target.style.background = "rgba(0,255,178,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.color = "rgba(255,255,255,0.65)";
                    e.target.style.background = "transparent";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────────────── */
function ExperienceSection() {
  const [active, setActive] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const [ref, vis] = useInView();
  const exp = EXPERIENCES[active];
  const pad = isMobile ? "80px 20px" : isTablet ? "100px 40px" : "120px 80px";

  return (
    <section
      id="experience"
      ref={ref}
      style={{ padding: pad, position: "relative" }}
    >
      <SectionLabel>Work History</SectionLabel>
      <h2 style={sectionTitle}>EXPERIENCE</h2>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          marginBottom: 48,
          padding: "10px 16px",
          border: "1px solid rgba(255,215,0,0.3)",
          background: "rgba(255,215,0,0.04)",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 16 }}>🏆</span>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: isMobile ? 10 : 11,
            letterSpacing: 2,
            color: "rgba(255,215,0,0.8)",
          }}
        >
          "GO THE EXTRA MILE" AWARD — Q2 2023
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "1fr"
              : "260px 1fr",
          gap: 1,
          border: "1px solid rgba(255,255,255,0.06)",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        {/* Tab selector */}
        <div
          style={{
            borderRight:
              isMobile || isTablet
                ? "none"
                : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Mobile/Tablet: horizontal scrollable tabs */}
          {isMobile || isTablet ? (
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                scrollbarWidth: "none",
              }}
            >
              {EXPERIENCES.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flexShrink: 0,
                    padding: "16px 20px",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    borderBottom:
                      active === i
                        ? `2px solid ${e.color}`
                        : "2px solid transparent",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: active === i ? e.color : "rgba(255,255,255,0.3)",
                      marginBottom: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.period}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 14,
                      letterSpacing: 2,
                      color: active === i ? "#fff" : "rgba(255,255,255,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.project}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            // Desktop: vertical list
            EXPERIENCES.map((e, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: "24px 28px",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background:
                    active === i ? "rgba(0,255,178,0.04)" : "transparent",
                  borderLeft:
                    active === i
                      ? `3px solid ${e.color}`
                      : "3px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    letterSpacing: 2,
                    color: active === i ? e.color : "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                  }}
                >
                  {e.period}
                </p>
                <p
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 15,
                    letterSpacing: 2,
                    color: active === i ? "#fff" : "rgba(255,255,255,0.5)",
                    marginBottom: 3,
                  }}
                >
                  {e.role}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color:
                      active === i
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(255,255,255,0.25)",
                  }}
                >
                  {e.project}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div
          key={active}
          style={{
            padding: isMobile ? "24px 20px" : isTablet ? "32px" : "44px",
            animation: "fadeIn 0.35s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: 3,
                  color: exp.color,
                  marginBottom: 6,
                }}
              >
                {exp.period}
              </p>
              <h3
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: isMobile ? 26 : 32,
                  letterSpacing: 2,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {exp.project}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: 1,
                }}
              >
                {exp.role} · Kumaran Systems
              </p>
            </div>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: 2,
                flexShrink: 0,
                padding: "7px 14px",
                border: `1px solid ${exp.color}`,
                color: exp.color,
              }}
            >
              {exp.tech}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Instrument Serif',serif",
              fontSize: isMobile ? 14 : 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              marginBottom: 24,
            }}
          >
            {exp.desc}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exp.points.map((p, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: exp.color,
                    fontSize: 11,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                >
                  ▸
                </span>
                <p
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: isMobile ? 11 : 12,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.65,
                    letterSpacing: 0.3,
                  }}
                >
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CERTS ──────────────────────────────────────────────────────────── */
function CertSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const [ref, vis] = useInView();
  const pad = isMobile ? "80px 20px" : isTablet ? "100px 40px" : "120px 80px";

  return (
    <section id="certifications" ref={ref} style={{ padding: pad }}>
      <SectionLabel>Learning</SectionLabel>
      <h2 style={sectionTitle}>CERTIFICATIONS</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2,1fr)"
              : "repeat(2,1fr)",
          gap: 1,
          border: "1px solid rgba(255,255,255,0.06)",
          marginTop: 48,
        }}
      >
        {CERTS.map((c, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? "20px 16px" : 32,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-16px)",
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 26,
                color: "rgba(0,255,178,0.2)",
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: isMobile ? 11 : 12,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
                letterSpacing: 0.3,
              }}
            >
              {c}
            </p>
          </div>
        ))}
        <div
          style={{
            padding: isMobile ? "20px 16px" : 32,
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            opacity: vis ? 1 : 0,
            transition: "all 0.5s ease 0.4s",
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 26,
              color: "rgba(0,255,178,0.2)",
              flexShrink: 0,
            }}
          >
            05
          </span>
          <div>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                letterSpacing: 3,
                color: "#00FFB2",
                marginBottom: 6,
              }}
            >
              EDUCATION
            </p>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: isMobile ? 11 : 12,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
              }}
            >
              B.E Computer Science & Engineering
              <br />
              <span style={{ color: "rgba(255,255,255,0.32)" }}>
                Jai Shri Ram Engineering College · 2022
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────────── */
function ContactSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const pad = isMobile
    ? "80px 20px 60px"
    : isTablet
      ? "100px 40px 60px"
      : "120px 80px";

  return (
    <section
      id="contact"
      style={{ padding: pad, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background:
            "radial-gradient(ellipse at bottom center,rgba(0,255,178,0.05) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <SectionLabel>Let's Connect</SectionLabel>
      <h2 style={{ ...sectionTitle, marginBottom: 12 }}>GET IN TOUCH</h2>
      <p
        style={{
          fontFamily: "'Instrument Serif',serif",
          fontSize: isMobile ? 15 : 18,
          color: "rgba(255,255,255,0.45)",
          marginBottom: 48,
          maxWidth: isMobile ? "100%" : 480,
          lineHeight: 1.7,
        }}
      >
        Open to full-time roles, freelance projects, and interesting engineering
        challenges.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2,1fr)"
              : "repeat(3,1fr)",
          gap: 1,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {[
          {
            label: "Email",
            value: "sasikumarbe2018@gmail.com",
            href: "mailto:sasikumarbe2018@gmail.com",
          },
          {
            label: "Phone",
            value: "+91 9500 421 893",
            href: "tel:+919500421893",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/sasikumar",
            href: "https://linkedin.com",
          },
          {
            label: "GitHub",
            value: "github.com/sasikumar",
            href: "https://github.com",
          },
          { label: "Location", value: "Chennai, Tamil Nadu", href: null },
          {
            label: "Status",
            value: "Open to Opportunities",
            href: null,
            accent: true,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? "20px 16px" : 28,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                letterSpacing: 3,
                color: "rgba(255,255,255,0.28)",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: isMobile ? 11 : 13,
                  color: "#00FFB2",
                  letterSpacing: 0.3,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,255,178,0.3)",
                  paddingBottom: 2,
                  wordBreak: "break-all",
                }}
              >
                {item.value} ↗
              </a>
            ) : (
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: isMobile ? 11 : 13,
                  color: item.accent ? "#00FFB2" : "rgba(255,255,255,0.65)",
                  letterSpacing: 0.3,
                }}
              >
                {item.accent && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#00FFB2",
                      marginRight: 7,
                      animation: "pulse 2s infinite",
                    }}
                  />
                )}
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── HELPERS ────────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 28,
          height: 1,
          background: "#00FFB2",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 10,
          letterSpacing: 4,
          color: "#00FFB2",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

const sectionTitle = {
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: "clamp(36px,6vw,80px)",
  letterSpacing: 2,
  color: "#fff",
  margin: 0,
  lineHeight: 1,
};

/* ─── ROOT ───────────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("about");
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25 },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{
          background:#08080C;color:#fff;overflow-x:hidden;
          cursor:${isMobile || isTablet ? "auto" : "none"};
        }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scrollPulse{0%,100%{opacity:0.3;transform:scaleY(0.8)}50%{opacity:1;transform:scaleY(1)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        ::selection{background:#00FFB2;color:#08080C;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#08080C;}
        ::-webkit-scrollbar-thumb{background:#00FFB2;}
        /* Hide scrollbar inside mobile tab selector */
        .tab-scroll::-webkit-scrollbar{display:none;}
        /* Tap highlight removal */
        a,button{-webkit-tap-highlight-color:transparent;}
      `}</style>
      <Noise />
      <Cursor />
      <Nav active={active} />
      <main>
        <Hero />
        <SkillSection />
        <ExperienceSection />
        <CertSection />
        <ContactSection />
      </main>
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: isMobile ? "20px" : "20px 48px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 6 : 0,
          fontFamily: "'DM Mono',monospace",
          fontSize: 10,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.2)",
        }}
      >
        <span>© 2025 SASIKUMAR SEMALAIYAPAN</span>
        <span>FULL STACK DEVELOPER · CHENNAI</span>
      </footer>
    </>
  );
}
