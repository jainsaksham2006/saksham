import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain, Cpu, Bot, Database, Sparkles, GitBranch, Microscope,
  FileText, ArrowUpRight, Mail, Linkedin, MapPin, Circle, ExternalLink,
  Network, Boxes, Workflow, Eye, MessageSquare, Gauge, Award, GraduationCap,
  Briefcase, Rocket, Trophy, BookOpen, Code2, Server, Wrench, Calendar,
  ChevronRight, Phone, Building2, FlaskConical,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saksham Jain — AI Engineer, Researcher & Robotics Builder" },
      { name: "description", content: "Saksham Jain — AI Engineer Intern @ CruvixAI, Research Assistant @ NUS, Advanced Computing @ University of Sydney. Building intelligent systems that learn, reason and act across LLMs, vision-language robotics, and data engineering." },
      { property: "og:title", content: "Saksham Jain — AI Engineer & Researcher" },
      { property: "og:description", content: "Foundation models, vision-language robotics, meta-learning, agentic systems and full-stack engineering. Selected work, research and writing." },
    ],
  }),
  component: Index,
});

/* ---------------- Neural particle background ---------------- */
function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((w * h) / 14000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            const a = 1 - d2 / 16000;
            ctx.strokeStyle = `rgba(120, 220, 230, ${a * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = "rgba(160, 230, 240, 0.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ---------------- Reusable bits ---------------- */
const Section = ({ id, eyebrow, title, children, kicker, refTag }: { id: string; eyebrow: string; title: React.ReactNode; kicker?: string; refTag?: string; children: React.ReactNode }) => (
  <section id={id} className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
    <div className="mb-12 flex flex-col gap-5">
      <div className="flex items-end justify-between gap-3 border-b border-border pb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">[{eyebrow}]</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">{refTag ?? `REF_${id.toUpperCase()}`}</span>
      </div>
      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">{title}</h2>
      {kicker && <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{kicker}</p>}
    </div>
    {children}
  </section>
);


const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-card rounded-lg p-6 ${className}`}>{children}</div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-sm border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{children}</span>
);


/* ---------------- Nav ---------------- */
function Nav() {
  const links = [
    { id: "about", label: "About", n: "01" },
    { id: "experience", label: "Experience", n: "02" },
    { id: "research", label: "Research", n: "03" },
    { id: "projects", label: "Projects", n: "04" },
    { id: "honors", label: "Honors", n: "05" },
    { id: "skills", label: "Stack", n: "06" },
    { id: "contact", label: "Contact", n: "07" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-display text-lg italic tracking-tight">Saksham Jain</span>
        </a>
        <div className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground lg:flex">
          {links.map(s => (
            <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-1.5 transition hover:text-foreground">
              <span className="text-accent/60 group-hover:text-accent">{s.n}</span>
              <span>/ {s.label}</span>
            </a>
          ))}
        </div>
        <a href="mailto:jain.saksham2006@gmail.com" className="rounded-sm border border-accent/40 bg-accent/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent transition hover:bg-accent/15">
          init_contact →
        </a>
      </nav>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 lab-grid opacity-50" />
      <div className="absolute inset-0"><NeuralBackground /></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Lab margin annotations */}
      <div className="pointer-events-none absolute left-6 top-28 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 lg:block">
        <div>[lat: -33.8688 · lng: 151.2093]</div>
        <div className="mt-1">node.saksham // session 0x3F9A</div>
      </div>
      <div className="pointer-events-none absolute right-6 top-28 hidden text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 lg:block">
        <div>v2026.06 · build stable</div>
        <div className="mt-1 flex items-center justify-end gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> system: active
        </div>
      </div>

      <motion.div style={{ y }} className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            researcher · engineer · open to collab — jun 2026
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-[3.25rem] font-semibold uppercase leading-[0.9] tracking-[-0.04em] md:text-[6rem] lg:text-[7.5rem]">
            Saksham<br/><span className="text-gradient">Jain.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-8 max-w-2xl text-2xl leading-snug text-foreground/90 md:text-3xl">
            Designing AI systems that <em className="font-display italic text-accent">learn</em>,{" "}
            <em className="font-display italic text-accent">reason</em>, and{" "}
            <em className="font-display italic text-accent">act</em>.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }} className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            AI Engineer · Research Assistant · Robotics Builder. Working at the intersection of foundation models, vision-language systems, robotics and data engineering — turning open research questions into shipped systems.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 flex flex-wrap gap-3">
            <a href="#experience" className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition hover:opacity-90">
              ↳ explore work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent">
              <Mail className="h-3.5 w-3.5" /> open channel
            </a>
          </motion.div>
        </div>

        {/* Right: live instrument panel */}
        <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="self-end lg:col-span-4 lg:pb-4">
          <div className="lab-panel rounded-lg p-5">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> live_roles.log</span>
              <span>03</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "AI Engineer Intern", at: "CruvixAI", icon: Bot, n: "01" },
                { label: "Research Assistant", at: "NUS", icon: Microscope, n: "02" },
                { label: "Advanced Computing", at: "Univ. of Sydney", icon: Brain, n: "03" },
              ].map((r) => (
                <div key={r.at} className="group flex items-center gap-3 border-t border-border/60 pt-3 first:border-0 first:pt-0">
                  <span className="font-mono text-[10px] text-accent">{r.n}</span>
                  <div className="grid h-9 w-9 place-items-center rounded-sm border border-border bg-secondary/40 text-primary"><r.icon className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-foreground">{r.label}</div>
                    <div className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">@ {r.at}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
              <div className="rounded-sm border border-border bg-secondary/30 px-2 py-1.5 text-center">SYD</div>
              <div className="rounded-sm border border-border bg-secondary/30 px-2 py-1.5 text-center">SGP</div>
              <div className="rounded-sm border border-border bg-secondary/30 px-2 py-1.5 text-center">JAI</div>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}

/* ---------------- Ticker ---------------- */
function Ticker() {
  const items = [
    "Foundation Models", "Vision-Language Robotics", "Meta-Learning", "Agentic Systems",
    "PyTorch · CUDA", "ROS · PyBullet", "RAG · Transformers", "Data Engineering",
    "Dalyell Scholar", "Top 4 Datathon", "NVIDIA DLI", "Peer-Reviewed Research",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-border bg-background/60 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground" style={{ animation: "ticker 60s linear infinite", minWidth: "200%" }}>
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-accent">◆</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ---------------- About ---------------- */
function About() {
  const stats = [
    { k: "Sydney · Singapore · Jaipur", v: "Currently based" },
    { k: "UG High Honour Roll '25", v: "Top of CS cohort" },
    { k: "Dalyell Scholar", v: "Elite USYD program" },
    { k: "2 Peer-reviewed papers", v: "Published + in progress" },
  ];
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>An engineer–researcher building toward <em className="text-gradient not-italic">general-purpose intelligence</em>.</>}
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-foreground/90">
            I'm <span className="text-primary">Saksham Jain</span> — a Bachelor of Advanced Computing student at the University of Sydney (majoring in <span className="text-foreground">Computational Data Science</span> and <span className="text-foreground">Computer Science</span>), currently on exchange at the <span className="text-foreground">National University of Singapore</span>.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            My work spans large language models, vision-language robotics, meta-learning, and full-stack data systems. I've worked as a Research Assistant at NUS on automatic LLM strategy selection, as an AI Engineer Intern at CruvixAI building language-grounded robotic manipulation, and as a Technology Intern at Deloitte architecting real-time manufacturing dashboards across four factories.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Beyond formal roles, I publish peer-reviewed research, ship side products (most recently <span className="text-foreground">ThinkPost</span>, an AI LinkedIn-content SaaS), and compete — Top 4 at the SparkSoc × SoftSoc Hackathon and Top 4 at the SUBAA × SUDATA Datathon. I'm most alive when an open research question turns into a deployed system.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">What drives me</div>
              <p className="mt-2 text-sm leading-relaxed">Building AI that reasons about new problems and acts in the real world — not just predicts on benchmarks.</p>
            </div>
            <div className="rounded-xl border border-border/60 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">How I work</div>
              <p className="mt-2 text-sm leading-relaxed">Research-first, engineering-honest. Tight feedback loops between papers, code and the systems they run on.</p>
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">At a glance</div>
          <div className="mt-5 space-y-4">
            {stats.map(s => (
              <div key={s.k} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                <div className="font-display text-xl leading-tight">{s.k}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Foundation Models", "Robotics", "Meta-Learning", "Data Eng.", "Full-Stack"].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      </div>
    </Section>
  );
}

/* ---------------- Experience ---------------- */
type Exp = {
  role: string; company: string; location?: string; period: string;
  tag: string; bullets: string[]; tech: string[]; icon: React.ComponentType<{ className?: string }>;
};
const experiences: Exp[] = [
  {
    role: "AI Engineer Intern", company: "CruvixAI", location: "Hyderabad, India",
    period: "Jun 2026 — Present", tag: "Current",
    icon: Bot,
    bullets: [
      "Building a PyBullet simulation environment featuring a robotic arm performing pick-and-place tasks on cluttered shelves, integrating open-source vision-language models (VLMs) from HuggingFace to ground natural-language instructions to specific objects.",
      "Designing a systematic evaluation framework across instruction complexity levels and clutter densities to identify VLM failure modes — including similar-object confusion, vague-instruction sensitivity, and partial-occlusion robustness.",
      "Authoring a research paper documenting grounding-accuracy benchmarks and failure analysis, contributing to applied robotics and language grounding at the intersection of NLP and computer vision.",
    ],
    tech: ["PyBullet", "HuggingFace VLMs", "PyTorch", "Robotics", "Computer Vision"],
  },
  {
    role: "Research Assistant", company: "National University of Singapore", location: "Singapore · Prof. Daren Ler",
    period: "Mar 2026 — Present", tag: "Research",
    icon: Microscope,
    bullets: [
      "Investigating whether a meta-learning system can automatically select the optimal LLM prompting strategy (zero-shot, few-shot, RAG) for a given NLP task by learning meta-features that characterise task complexity, domain, and data availability.",
      "Benchmarked three prompting strategies across 7 sentiment-analysis datasets (IMDB, SST-2, Yelp, Amazon, Emotion, Tweet, Rotten Tomatoes) using macro F1; extracted meta-features including text length, vocabulary size, training-set size, class entropy, and label-imbalance ratio.",
      "Trained a Random Forest meta-learner on the extracted meta-features, achieving meaningful accuracy improvements in strategy selection over baseline trial-and-error approaches.",
    ],
    tech: ["Meta-Learning", "LLMs", "Random Forest", "NLP Benchmarks", "Python"],
  },
  {
    role: "Technology Intern", company: "Deloitte", location: "India",
    period: "Jul 2025 — Dec 2025", tag: "Industry",
    icon: Briefcase,
    bullets: [
      "Architected and deployed a real-time manufacturing dashboard monitoring machine performance across 4 factories in Python, enabling live fault detection and reducing manual reporting overhead.",
      "Built end-to-end data-transformation pipelines that ingested multi-source JSON telemetry, standardised formats, and surfaced clean, actionable metrics for operations teams.",
      "Authored a formal project proposal covering dashboard functionality, UI/UX design, role-based access control, development estimates, and a phased delivery timeline — approved by senior stakeholders.",
    ],
    tech: ["Python", "Data Pipelines", "Dashboarding", "RBAC", "Stakeholder Mgmt"],
  },
  {
    role: "Executive Member", company: "USYD Robotics Club (USRC)", location: "Sydney",
    period: "Aug 2025 — Dec 2025", tag: "Leadership",
    icon: Cpu,
    bullets: [
      "Represented USYD in RoboWars and the Autonomous Robotics Challenge, building integrated robotic systems using ROS, Arduino, and Raspberry Pi with custom sensor-fusion and control algorithms.",
      "Engineered the USRC × ANT61 Hackathon (100+ participants, 48 hours) — designed a real-time satellite-threat-detection challenge using React.js, TypeScript, and WebSockets, and judged all final submissions.",
    ],
    tech: ["ROS", "Arduino", "Raspberry Pi", "React", "WebSockets"],
  },
  {
    role: "Executive Member", company: "StartupLink USYD", location: "Sydney",
    period: "Apr 2025 — Dec 2025", tag: "Leadership",
    icon: Rocket,
    bullets: [
      "Contributed to Ignite, a 200+ participant flagship event covering AI, MVP building, pitching, and business-model workshops — managed logistics, speaker coordination, and on-day execution.",
      "Co-organised the StartupLink × Lyra × Build Club Hackathon, connecting students and mentors to develop solutions aligned with UN SDGs 3, 10, and 11.",
    ],
    tech: ["Event Ops", "Community", "Mentorship"],
  },
];

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Where I've <em className="text-gradient not-italic">built and shipped</em>.</>}
      kicker="Industry, research and leadership roles across AI, robotics and data systems."
    >
      <div className="relative">
        <div className="absolute left-[1.05rem] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:left-[1.55rem]" />
        <div className="space-y-6">
          {experiences.map((e, i) => (
            <motion.div
              key={e.company + e.role}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.05 }}
              className="relative grid grid-cols-[2.2rem_1fr] gap-4 md:grid-cols-[3.2rem_1fr]"
            >
              <div className="relative">
                <div className="sticky top-28 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 ring-4 ring-background md:h-10 md:w-10">
                  <e.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <Card className="!p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Tag>{e.tag}</Tag>
                      <span className="font-mono text-[11px] text-muted-foreground"><Calendar className="mr-1 inline h-3 w-3" />{e.period}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">{e.role}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" /> <span className="text-foreground">{e.company}</span>
                      {e.location && <><span>·</span><span>{e.location}</span></>}
                    </div>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <ChevronRight className="mt-1 h-3.5 w-3.5 flex-none text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tech.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Research ---------------- */
function PipelineDiagram({ steps, outputs }: { steps: string[]; outputs?: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-background/50 p-8">
      <div className="flex flex-col items-stretch gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="w-full rounded-xl border border-border bg-secondary/50 px-5 py-3 text-center font-mono text-sm"
            >
              {s}
            </motion.div>
            {i < steps.length - 1 && (
              <svg className="my-1 h-8 w-px" viewBox="0 0 2 32"><line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-primary" style={{ animation: "dash 1.2s linear infinite" }} /></svg>
            )}
          </div>
        ))}
        {outputs && (
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {outputs.map(o => (
              <div key={o} className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-center font-mono text-xs text-primary">{o}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Research() {
  return (
    <Section
      id="research"
      eyebrow="Research"
      title={<>Two research threads, one <em className="text-gradient not-italic">north star</em>.</>}
      kicker="Making intelligent systems that pick the right strategy and ground language into real-world action."
    >
      {/* Thread 01: Meta-learning */}
      <div className="mb-10 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PipelineDiagram
            steps={["Task Description + Dataset", "Extract Meta-Features", "Random Forest Meta-Learner", "Recommended Strategy"]}
            outputs={["Zero-Shot", "Few-Shot", "RAG", "Fine-Tuning"]}
          />
        </div>
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">Thread 01 · NUS</div>
          </div>
          <p className="mt-3 font-display text-2xl leading-snug">
            Meta-Learning for Automatic LLM Strategy Selection
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Benchmarking zero-shot, few-shot and RAG across 7 sentiment datasets (IMDB, SST-2, Yelp, Amazon, Emotion, Tweet, Rotten Tomatoes), then training a Random Forest meta-learner over task meta-features — text length, vocab size, training-set size, class entropy, label-imbalance ratio — to predict the optimal strategy.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Result: measurable accuracy lift over trial-and-error baselines, reducing the manual overhead of deploying LLMs to new tasks.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["PyTorch", "Transformers", "Meta-Learning", "Random Forest", "NLP"].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      </div>

      {/* Thread 02: VLM Robotics */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">Thread 02 · CruvixAI</div>
          </div>
          <p className="mt-3 font-display text-2xl leading-snug">
            Language-Conditioned Robotic Manipulation with VLMs
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A PyBullet arm performs pick-and-place on cluttered shelves while open-source vision-language models ground natural-language instructions — <em className="text-foreground">"pick the red bottle on the left"</em> — to specific objects in the scene.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Systematic evaluation across instruction complexity and clutter density exposes failure modes: similar-object confusion, vague-instruction sensitivity, partial-occlusion robustness.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["PyBullet", "VLM", "HuggingFace", "Manipulation", "Eval"].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-background/50 p-8">
            <div className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 font-mono text-sm text-accent-foreground">
              <span className="text-accent">instruction →</span> "Pick the red bottle on the left"
            </div>
            <div className="my-3 flex justify-center"><svg className="h-8 w-px" viewBox="0 0 2 32"><line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-primary" style={{ animation: "dash 1.2s linear infinite" }} /></svg></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <Eye className="h-4 w-4 text-primary" />
                <div className="mt-2 font-mono text-xs">Vision-Language Model</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Grounds objects + spatial referents</div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <MessageSquare className="h-4 w-4 text-primary" />
                <div className="mt-2 font-mono text-xs">Intent Parser</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Maps language → action primitives</div>
              </div>
            </div>
            <div className="my-3 flex justify-center"><svg className="h-8 w-px" viewBox="0 0 2 32"><line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-primary" style={{ animation: "dash 1.2s linear infinite" }} /></svg></div>
            <div className="rounded-xl border border-primary/40 bg-primary/10 p-4 text-center">
              <Bot className="mx-auto h-5 w-5 text-primary" />
              <div className="mt-2 font-mono text-sm text-primary">Robot Arm → Pick Action</div>
            </div>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="mt-12">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Publications</div>
        <div className="divide-y divide-border rounded-2xl border border-border glass-card">
          {[
            { status: "Published", year: "2024", title: "Portfolio Optimization using Mean-Variance Analysis", venue: "Innovative Research Thoughts · Peer-Reviewed (also on ResearchGate)" },
            { status: "In Progress", year: "2026", title: "Meta-Learning for Automatic LLM Strategy Selection", venue: "NUS · Research Assistantship" },
            { status: "In Progress", year: "2026", title: "Language-Conditioned Robotic Manipulation with VLMs", venue: "CruvixAI · Engineering Research" },
          ].map(p => (
            <div key={p.title} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-5 transition hover:bg-secondary/30 md:gap-6 md:p-6">
              <div className="font-mono text-xs">
                <div className={`rounded-full px-2.5 py-1 ${p.status === "Published" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>{p.status}</div>
              </div>
              <div>
                <div className="font-display text-lg leading-snug md:text-xl">{p.title}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{p.venue}</div>
              </div>
              <div className="font-mono text-sm text-muted-foreground">{p.year}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */
type Project = {
  name: string; tagline: string; period: string; category: string;
  bullets: string[]; tech: string[]; icon: React.ComponentType<{ className?: string }>;
  status?: string;
};
const projects: Project[] = [
  {
    name: "ThinkPost", tagline: "AI-Powered LinkedIn Content SaaS",
    period: "Jan 2026 — Present", category: "AI Product · Full-Stack", status: "Live",
    icon: Sparkles,
    bullets: [
      "Building a full-stack LinkedIn content-creation platform in Next.js, Supabase, and Groq API — enabling creators to capture ideas from text, YouTube transcripts, PDFs, and voice memos, and generate structured posts.",
      "Implemented AI post generation with multiple content formats (Personal Story, Data Insight, Hot Take, How-To), hook-strength scoring, a content calendar, draft management, and post analytics.",
      "Architected Supabase-backed auth, a template system, and an admin dashboard; deployed on Vercel with a complete marketing site including features, pricing, blog, and about pages.",
    ],
    tech: ["Next.js", "Supabase", "Groq API", "Vercel", "PostgreSQL", "TypeScript"],
  },
  {
    name: "Autonomous Tracked Robot", tagline: "Raspberry Pi-Powered Rover",
    period: "Sep 2025 — Nov 2025", category: "Robotics",
    icon: Bot,
    bullets: [
      "Led end-to-end development of a Raspberry Pi-powered tracked robot: chassis assembly, sensor integration (ultrasonic, infrared, camera), and Python-based control systems.",
      "Implemented autonomous navigation, real-time obstacle avoidance, and remote operation via custom algorithms and sensor fusion; mentored teammates in computer vision and autonomy.",
    ],
    tech: ["Raspberry Pi", "Python", "Computer Vision", "Sensor Fusion", "Control Systems"],
  },
  {
    name: "Strata Management Hub", tagline: "Full-Stack Property Platform",
    period: "Mar 2025 — Jun 2025", category: "Full-Stack · Cloud",
    icon: Database,
    bullets: [
      "Built a full-stack property-management platform (PHP, Neon PostgreSQL, Vercel, AWS Lambda / SNS / API Gateway) supporting resident directories, levy tracking, maintenance workflows, and automated notice generation.",
      "Delivered multi-page database integrations, session-based authentication, and serverless backend workflows that cut manual administrative steps for building managers.",
    ],
    tech: ["PHP", "PostgreSQL", "AWS Lambda", "SNS", "API Gateway", "Vercel"],
  },
  {
    name: "Manufacturing Ops Dashboard", tagline: "Real-Time Multi-Factory Monitoring",
    period: "Jul 2025 — Dec 2025", category: "Data Engineering · Deloitte",
    icon: Gauge,
    bullets: [
      "Real-time dashboard monitoring machine performance across 4 factories — live fault detection, ingestion of multi-source JSON telemetry, and clean operational metrics.",
      "Authored a stakeholder-approved project proposal covering UI/UX, RBAC, development estimates, and a phased delivery timeline.",
    ],
    tech: ["Python", "ETL", "Dashboarding", "JSON Telemetry"],
  },
  {
    name: "Mosaic", tagline: "Creative Professional Networking",
    period: "Sep 2025 · Hackathon", category: "Top 4 / 150+",
    icon: Network, status: "Top 4",
    bullets: [
      "Built Mosaic — a creative professional networking platform blending portfolios with social-discovery features.",
      "React + TailwindCSS frontend and Node.js backend, designed and shipped within a 24-hour hackathon window.",
    ],
    tech: ["React", "TailwindCSS", "Node.js"],
  },
  {
    name: "VLM Manipulation Pipeline", tagline: "Language → Action for Robot Arms",
    period: "Jun 2026 — Present", category: "Robotics · Research",
    icon: Wrench,
    bullets: [
      "PyBullet simulation of a robot arm performing language-conditioned pick-and-place on cluttered shelves.",
      "Open-source HuggingFace VLMs ground natural-language instructions to specific objects; systematic eval across complexity and clutter density.",
    ],
    tech: ["PyBullet", "HuggingFace", "VLM", "Python"],
  },
];

function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "AI Product · Full-Stack", "Robotics", "Robotics · Research", "Full-Stack · Cloud", "Data Engineering · Deloitte", "Top 4 / 150+"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  return (
    <Section
      id="projects"
      eyebrow="Selected Projects"
      title={<>Systems I've <em className="text-gradient not-italic">designed, built and shipped</em>.</>}
      kicker="A working portfolio across AI products, robotics, full-stack and data engineering."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition ${filter === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          >
            <Card className="group flex h-full flex-col !p-7 transition hover:border-primary/40">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</div>
                    <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                  </div>
                </div>
                {p.status && (
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">{p.status}</span>
                )}
              </div>
              <p className="mt-4 text-sm text-muted-foreground"><span className="text-foreground">{p.tagline}</span> · {p.period}</p>
              <ul className="mt-4 flex-1 space-y-2.5">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                    <ChevronRight className="mt-1 h-3.5 w-3.5 flex-none text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Honors / Certifications ---------------- */
const honors = [
  {
    icon: Trophy, title: "Top 4 / 200+ · SUBAA × SUDATA Datathon 2025", period: "Oct 2025",
    desc: "Ranked Top 4 in a high-difficulty logistics datathon with sparse, synthetic, and non-continuous data. Engineered domain-driven features (Fuel Efficiency Index, Congestion Stress, Logistics Resilience) and applied TabTransformers and XGBoost pipelines.",
  },
  {
    icon: Trophy, title: "Top 4 / 150+ · SparkSoc × SoftSoc Hackathon", period: "Sep 2025",
    desc: "Built Mosaic — a creative professional networking platform blending portfolios with social-discovery features. Developed in React + TailwindCSS (frontend) and Node.js (backend) within 24 hours.",
  },
  {
    icon: Award, title: "UG High Honour Roll 2025 · USYD", period: "2025",
    desc: "Awarded by the School of Computer Science for achieving a High Distinction average in Computer Science — recognition for academic excellence in 2025.",
  },
  {
    icon: GraduationCap, title: "Dalyell Scholar · University of Sydney", period: "2025 — 2028",
    desc: "Selected for USYD's elite Dalyell Scholars program, recognising students with outstanding academic achievement and offering accelerated, enriched coursework.",
  },
];

const certifications = [
  {
    title: "NVIDIA DLI · Getting Started with Deep Learning", period: "Sep — Dec 2025",
    desc: "Trained CNNs from scratch in PyTorch (MNIST, ASL); applied data augmentation, transfer learning, and fine-tuning. Built NLP pipelines using BERT for tokenization and question-answering.",
  },
  {
    title: "NVIDIA DLI · Rapid Application Dev. with LLMs", period: "Aug — Dec 2025",
    desc: "Built LLM-powered apps with HuggingFace Transformers (semantic embeddings, zero-shot classification, text generation) and multimodal pipelines (CLIP, diffusion models). Orchestrated agents via LangChain.",
  },
];

function Honors() {
  return (
    <Section
      id="honors"
      eyebrow="Honors · Competitions · Certifications"
      title={<>Recognition for <em className="text-gradient not-italic">work that shipped</em>.</>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {honors.map((h, i) => (
          <motion.div key={h.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{h.period}</div>
                  <h3 className="mt-1 font-display text-xl leading-tight">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</div>
        <div className="grid gap-6 lg:grid-cols-2">
          {certifications.map(c => (
            <Card key={c.title}>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{c.period}</div>
              </div>
              <h4 className="mt-3 font-display text-xl leading-tight">{c.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Skills ---------------- */
const skillGroups = [
  {
    icon: Code2, group: "Languages",
    items: ["Python", "Java", "C", "C++", "R", "Swift (iOS)", "JavaScript", "HTML/CSS", "LaTeX"],
  },
  {
    icon: Brain, group: "Data & ML",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "HuggingFace Transformers", "LangChain", "SQL", "NoSQL", "Apache Spark", "Apache Airflow"],
  },
  {
    icon: Server, group: "Tools & Platforms",
    items: ["Git", "Unix/Linux", "Node.js", "React", "PostgreSQL", "AWS (Lambda, SNS, API Gateway)", "Vercel", "Arduino", "Raspberry Pi", "ROS"],
  },
  {
    icon: GitBranch, group: "Mathematics",
    items: ["Multivariable Calculus", "Linear Algebra", "Differential Equations", "Statistics & Probability"],
  },
];

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title={<>The <em className="text-gradient not-italic">toolkit</em> I build with.</>}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map(g => (
          <Card key={g.group}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><g.icon className="h-4 w-4" /></div>
              <h3 className="font-display text-xl">{g.group}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map(it => (
                <span key={it} className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-foreground/85">{it}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Education ---------------- */
function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={<>Coursework, scholarships, <em className="text-gradient not-italic">cohort recognition</em>.</>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Feb 2025 — Nov 2028</div>
          </div>
          <h3 className="mt-3 font-display text-2xl leading-tight">University of Sydney</h3>
          <div className="mt-1 text-sm text-muted-foreground">Bachelor of Advanced Computing · Computational Data Science & Computer Science · <span className="text-foreground">Dalyell Scholar</span></div>
          <div className="mt-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Relevant Coursework</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Applied Data Science · Software Engineering & Design · Network Platforms · Operating Systems · Discrete Mathematics · Programming Languages & Techniques · Computer Architecture
            </p>
          </div>
          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/85">
            <span className="font-semibold text-primary">UG High Honour Roll 2025</span> — School of Computer Science recognition for High Distinction average in CS.
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">Jan 2026 — May 2026</div>
          </div>
          <h3 className="mt-3 font-display text-2xl leading-tight">National University of Singapore</h3>
          <div className="mt-1 text-sm text-muted-foreground">Exchange Student · Computer Science</div>
          <div className="mt-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Coursework</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Algorithms · Machine Learning · Databases · Statistical Learning · Data Engineering
            </p>
          </div>
          <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm text-foreground/85">
            Concurrent Research Assistantship under <span className="font-semibold">Prof. Daren Ler</span> on meta-learning for LLM strategy selection.
          </div>
        </Card>
      </div>
    </Section>
  );
}

/* ---------------- Now ---------------- */
function Now() {
  const items = [
    "Building VLM-powered robotic manipulation pipelines @ CruvixAI — language-conditioned pick-and-place on cluttered shelves.",
    "Running meta-learning experiments @ NUS — Random Forest meta-learner over 7 NLP datasets to predict optimal LLM strategy.",
    "Shipping ThinkPost — an AI LinkedIn-content SaaS on Next.js + Supabase + Groq, with calendar, analytics, and admin dashboard.",
    "Studying advanced ML theory at NUS — optimisation, generalisation, statistical learning.",
    "Open to research collaborations, internships in AI/robotics, and shipping side products.",
  ];
  return (
    <Section id="now" eyebrow="/now" title={<>What I'm doing <em className="text-gradient not-italic">right now</em>.</>} kicker="Updated June 2026 · Jaipur → Singapore → Sydney">
      <Card className="relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <ul className="relative space-y-4">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0"
            >
              <div className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span className="text-base leading-relaxed text-foreground/90 md:text-lg">{it}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: "jain.saksham2006@gmail.com", href: "mailto:jain.saksham2006@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sakshamjainjpr", href: "https://linkedin.com/in/sakshamjainjpr/" },
    { icon: Phone, label: "Phone", value: "+61 478 242 775", href: "tel:+61478242775" },
    { icon: MapPin, label: "Based in", value: "Sydney · Singapore · Jaipur", href: "#about" },
  ];
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 lab-grid opacity-30" />
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">/ contact</span>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">REF_CHANNEL_07</span>
        </div>
        <h2 className="mt-8 max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
          Let's build something that <em className="text-gradient font-normal">reasons and acts</em>.
        </h2>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          I'm open to research collaborations, AI/robotics internships, and conversations about frontier ML, agentic systems, and what intelligent machines should do next. Email is fastest — I usually reply within a day.
        </p>

        <a href="mailto:jain.saksham2006@gmail.com" className="mt-12 inline-block font-display text-3xl italic text-foreground underline decoration-accent/40 decoration-1 underline-offset-[10px] transition hover:text-accent md:text-5xl lg:text-6xl">
          jain.saksham2006@gmail.com →
        </a>

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {channels.map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-sm border border-border bg-secondary/30 p-4 transition hover:border-accent hover:bg-secondary/60">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-sm border border-border bg-background/60 text-primary"><c.icon className="h-4 w-4" /></div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="mt-0.5 text-sm text-foreground">{c.value}</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Sydney · Singapore · Jaipur</div>
          <div>© 2026 saksham_jain // session_terminated</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Research />
      <Projects />
      <Honors />
      <Skills />
      <Education />
      <Now />
      <Contact />
    </main>
  );
}

