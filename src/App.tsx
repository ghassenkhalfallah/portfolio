import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import profileImage from './profile.jpeg';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Toaster, toast } from 'react-hot-toast';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, ISourceOptions } from '@tsparticles/engine';
import CountUp from 'react-countup';
import {
  Github,
  Linkedin,
  Terminal,
  Cloud,
  Award,
  BookOpen,
  Coffee,
  Rocket,
  GitBranch,
  TestTube,
  Workflow,
  Boxes,
  Zap,
  ArrowRight,
  ChevronRight,
  Settings,
  CheckCircle2,
  Play,
  Package,
  Server,
  Activity,
  Send,
} from 'lucide-react';

emailjs.init("cA1VSomT1TRDBhsq9");

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Terminal lines with typed-out animation
const terminalLines = [
  { cmd: '$ git push origin main', result: '✓ Pipeline #247 triggered [2s]', delay: 0 },
  { cmd: '$ docker build -t app:latest .', result: '✓ Image built (247MB) [18s]', delay: 2200 },
  { cmd: '$ kubectl rollout status deploy/app', result: '✓ Rolled out to 3/3 pods [4s]', delay: 4400 },
  { cmd: '$ terraform apply -auto-approve', result: '✓ 12 resources applied [32s]', delay: 6600 },
];

function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalLines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay + 800));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="terminal-window w-full max-w-lg"
    >
      {/* Traffic light dots */}
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <span className="traffic-dot bg-red-500" />
          <span className="traffic-dot bg-yellow-400" />
          <span className="traffic-dot bg-green-500" />
        </div>
        <span className="terminal-title">ghassen@devops-lab:~$</span>
        <span className="text-[10px] text-green-400/60 font-mono">LIVE</span>
      </div>

      {/* Terminal body */}
      <div className="terminal-body scanline">
        {terminalLines.map((line, i) =>
          i < visibleLines ? (
            <div key={i} className="mb-4 last:mb-0">
              <div className="terminal-cmd">
                <TypeAnimation
                  sequence={[line.cmd]}
                  speed={65}
                  className="text-green-300 font-mono text-sm"
                  cursor={i === visibleLines - 1 && visibleLines < terminalLines.length}
                />
              </div>
              {i < visibleLines - 0 && (
                <div className="terminal-result text-green-400/80 font-mono text-xs mt-1 pl-2">
                  {line.result}
                </div>
              )}
            </div>
          ) : null
        )}
        {visibleLines >= terminalLines.length && (
          <div className="flex items-center gap-1 mt-3">
            <span className="text-green-300 font-mono text-sm">$</span>
            <span className="cursor-blink" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function App() {
  const [particlesReady, setParticlesReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Init tsparticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send('service_innfiqk', 'template_lvdew67', {
        to_email: 'gassen.kalfallah@enis.tn',
        from_email: formData.email,
        message: formData.message,
      });
      toast.success('201 Created ✓ Message delivered!', { icon: '📡' });
      setFormData({ email: '', message: '' });
    } catch {
      toast.error('500 Internal Error — Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {}, []);

  const particlesOptions: ISourceOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    particles: {
      color: { value: ['#00d4ff', '#00ff9d', '#7928ca'] },
      links: {
        color: '#00d4ff',
        distance: 140,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.55 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const skills = [
    {
      icon: <Cloud className="w-8 h-8" />,
      iconColor: 'text-cyan-400',
      accentClass: 'skill-accent-cyan',
      accentHex: '#22d3ee',
      title: 'Cloud Platforms',
      desc: 'Provisions multi-region AWS and Azure environments with Terraform — reproducible infrastructure at scale, zero manual clicks.',
      tools: ['AWS', 'Azure', 'Terraform', 'EKS'],
      badge: 'DEPLOYED',
      version: 'v3.1',
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      iconColor: 'text-purple-400',
      accentClass: 'skill-accent-purple',
      accentHex: '#c084fc',
      title: 'DevOps & CI/CD',
      desc: 'Ships production-ready code through battle-tested GitLab pipelines with Docker containerization and Kubernetes orchestration.',
      tools: ['GitLab CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
      badge: 'RUNNING',
      version: 'latest',
    },
    {
      icon: <Boxes className="w-8 h-8" />,
      iconColor: 'text-orange-400',
      accentClass: 'skill-accent-orange',
      accentHex: '#fb923c',
      title: 'Artifact Management',
      desc: 'Manages the full artifact lifecycle — every binary traceable, every release reproducible, zero dependency drift.',
      tools: ['Nexus', 'Artifactory', 'Docker Hub', 'SharePoint'],
      badge: 'PULLED',
      version: 'v2.4',
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      iconColor: 'text-green-400',
      accentClass: 'skill-accent-green',
      accentHex: '#4ade80',
      title: 'Testing & Quality',
      desc: 'Runs parallel nightly test suites across live TPE hardware with X-Ray integration — bugs caught before they reach payment terminals.',
      tools: ['X-Ray', 'Test Automation', 'Integration Testing', 'CI Testing'],
      badge: 'PASSED',
      version: 'v1.8',
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      iconColor: 'text-yellow-400',
      accentClass: 'skill-accent-yellow',
      accentHex: '#facc15',
      title: 'Scripting & OS',
      desc: 'Automates the unglamorous work — Shell, Bash, and Python scripts that run quietly in production and eliminate human error.',
      tools: ['Shell Scripting', 'Linux', 'Bash', 'Python'],
      badge: 'ACTIVE',
      version: 'v4.0',
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      iconColor: 'text-pink-400',
      accentClass: 'skill-accent-pink',
      accentHex: '#f472b6',
      title: 'Methodologies & Tools',
      desc: 'Ships in 2-week sprints, tracks in Jira, reviews in Git — Agile discipline without ceremony overhead.',
      tools: ['Agile', 'Scrum', 'Jira', 'Git'],
      badge: 'MERGED',
      version: 'v2.0',
    },
  ];

  const experiences = [
    {
      role: 'DevOps & Automation Engineer',
      company: 'Telnet × Worldline',
      period: 'Sep 2023 — Present',
      status: 'RUNNING',
      highlight: 'Building the CI/CD backbone behind global payment terminal software.',
      body: (
        <>
          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            Embedded with Worldline — a global leader in electronic payment solutions — designing and maintaining the DevOps infrastructure that underpins TPE software development and release cycles.
          </p>
          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Key Wins</h4>
          <ul className="space-y-3 text-sm text-slate-300 mb-5">
            {[
              ['Terminal Packager', 'Automated consolidation of 15+ TPE software components into validated packages — reduced packaging time from hours to under 60 seconds, deployed to production.'],
              ['Infrastructure Resilience', 'Built a Docker-based local simulation of payment servers (acquirer + treatment) that kept development unblocked during a major infrastructure migration.'],
              ['Automated TPE Testing', 'Architected a CI/CD-driven testing system with nightly parallel runs across multiple physical payment terminals — results integrated with X-Ray for instant visibility.'],
            ].map(([label, text], i) => (
              <li key={i} className="flex gap-3">
                <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">{label}:</strong> {text}</span>
              </li>
            ))}
          </ul>
        </>
      ),
      stack: ['Docker', 'GitLab CI/CD', 'Nexus', 'Artifactory', 'X-Ray', 'Shell', 'Linux'],
    },
    {
      role: 'DevOps & Cloud Engineer Intern',
      company: 'Spark-it',
      period: 'Feb 2023 — Jun 2023',
      status: 'SUCCESS',
      highlight: 'Migrated on-premise DevOps infrastructure to AWS end-to-end with Terraform.',
      body: null,
      achievements: [
        'Provisioned and managed AWS infrastructure with Terraform, cutting setup time by 50%.',
        'Designed secure, modular GitLab CI/CD pipelines for infra and app deployment.',
        'Dockerized application services for scalability and rapid environment replication.',
        'Wrote Kubernetes manifests for EKS — fault-tolerant, self-healing deployments.',
        'Implemented Velero for full cluster backup and disaster recovery.',
      ],
      stack: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Velero', 'GitLab CI', 'Azure'],
    },
    {
      role: 'Software Development Intern',
      company: 'LUNAR-TC',
      period: 'Jul 2022 — Aug 2022',
      status: 'SUCCESS',
      highlight: 'Built a containerized product management microservice with Spring Boot.',
      body: null,
      achievements: [
        'Designed and developed a product management microservice using Spring Boot.',
        'Containerized with Docker for consistent, portable deployment.',
        'Applied Git-based version control and collaborative development workflows.',
      ],
      stack: null,
    },
  ];

  const projects = [
    {
      title: 'Terminal Packager',
      subtitle: 'Internal Platform Tool · Worldline / Telnet',
      env: 'PRODUCTION',
      envColor: 'text-green-400',
      envBg: 'bg-green-400/10 border-green-400/20',
      icon: <Zap className="w-6 h-6" />,
      iconColor: 'text-yellow-400',
      problem: 'Packaging 15+ TPE software components took hours manually — a bottleneck before every release.',
      solution: 'Built an automated tool with minimalist Docker images and GitLab CI/CD pipelines that validates, consolidates, and delivers a production-ready TPE package in a single pipeline run.',
      outcome: 'Hours → under 60 seconds. Zero manual errors. Deployed to production.',
      tags: ['Docker', 'GitLab CI/CD', 'Shell Scripting', 'Nexus'],
      metrics: ['~99% Time Reduction', 'Production Deployed', 'Zero Manual Steps'],
    },
    {
      title: 'TPE Automated Test Infrastructure',
      subtitle: 'CI/CD · Hardware QA · Worldline / Telnet',
      env: 'PRODUCTION',
      envColor: 'text-green-400',
      envBg: 'bg-green-400/10 border-green-400/20',
      icon: <TestTube className="w-6 h-6" />,
      iconColor: 'text-green-400',
      problem: 'Manual testing on physical payment terminals created a 24-hour feedback gap between a commit and test results.',
      solution: 'Architected a GitLab CI/CD pipeline that orchestrates parallel nightly test runs across multiple live TPEs, with centralized X-Ray result reporting.',
      outcome: 'Bugs caught the same night — not discovered next sprint.',
      tags: ['GitLab CI/CD', 'X-Ray', 'Docker', 'Shell Scripting'],
      metrics: ['Parallel Execution', 'Nightly Automation', 'X-Ray Integration'],
    },
    {
      title: 'Azure Infrastructure Automation',
      subtitle: 'IaC · Cloud Migration · Spark-it',
      env: 'STAGING',
      envColor: 'text-amber-400',
      envBg: 'bg-amber-400/10 border-amber-400/20',
      icon: <Cloud className="w-6 h-6" />,
      iconColor: 'text-cyan-400',
      problem: 'Manual Azure provisioning was inconsistent, slow, and impossible to audit across environments.',
      solution: 'Automated the full Azure infrastructure lifecycle with Terraform IaC and GitLab CI — reproducible environments across dev, staging, and production from a single git push.',
      outcome: '50% faster environment setup. Fully auditable. Zero configuration drift.',
      tags: ['Azure', 'Terraform', 'GitLab CI', 'IaC'],
      metrics: ['50% Faster Setup', 'Full IaC Coverage', 'Audit-Ready'],
    },
    {
      title: 'Jenkins CI/CD Pipeline',
      subtitle: 'Java · Container-First Delivery · Spark-it',
      env: 'STAGING',
      envColor: 'text-amber-400',
      envBg: 'bg-amber-400/10 border-amber-400/20',
      icon: <Workflow className="w-6 h-6" />,
      iconColor: 'text-purple-400',
      problem: 'Java application deployments were manual, inconsistent, and required intervention at every step.',
      solution: 'Built a zero-downtime delivery pipeline — Maven build, Docker image creation, and automated deployment triggered by a git push.',
      outcome: 'Every commit automatically validated and shipped. No manual deployments.',
      tags: ['Jenkins', 'Docker', 'Maven', 'Java'],
      metrics: ['Automated on Push', 'Container-First', 'Zero Downtime'],
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#020c1b' }}>

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'nav-scrolled py-3'
          : 'py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
              ghassen<span className="text-green-400">.devops</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link text-xs font-mono px-3 py-1.5 rounded transition-all ${
                  activeSection === item.href.slice(1)
                    ? 'nav-link-active'
                    : ''
                }`}
              >
                {activeSection === item.href.slice(1) && <span className="text-green-400 mr-1">&gt;</span>}
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="status-online text-[10px] font-mono text-green-400 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </nav>

      {/* ── HERO — Control Room ── */}
      <header id="home" className="min-h-screen flex items-center relative overflow-hidden" style={{ background: '#020c1b' }}>

        {/* Particles network */}
        {particlesReady && (
          <Particles
            id="hero-particles"
            className="absolute inset-0 z-0"
            style={{ pointerEvents: 'none' }}
            particlesLoaded={particlesLoaded}
            options={particlesOptions}
          />
        )}

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 cyber-grid z-0 opacity-20" />

        <div className="container mx-auto px-6 z-10 relative pt-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT — Content */}
            <div className="flex-1 max-w-xl">
              {/* System online label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400 tracking-[0.25em]">&gt; SYSTEM ONLINE</span>
              </motion.div>

              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mb-6 flex items-center gap-4"
              >
                <div className="relative">
                  <div className="avatar-glow absolute inset-0 rounded-full" />
                  <img
                    src={profileImage}
                    alt="Ghassen Khalfallah"
                    className="w-16 h-16 rounded-full border border-cyan-400/30 object-cover relative z-10"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 z-20" style={{ borderColor: '#020c1b' }} />
                </div>
                <div className="font-mono text-xs text-slate-400">
                  <div className="text-cyan-400">ghassen@devops-lab</div>
                  <div className="text-slate-500">~$ whoami</div>
                </div>
              </motion.div>

              {/* Name with glitch */}
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="glitch-text text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                data-text="Ghassen Khalfallah"
              >
                Ghassen<br />
                <span className="gradient-text-devops">Khalfallah</span>
              </motion.h1>

              {/* TypeAnimation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="h-7 mb-7"
              >
                <TypeAnimation
                  sequence={[
                    'DevOps Engineer', 2200,
                    'Cloud Infrastructure Specialist', 2200,
                    'CI/CD Architect', 2200,
                    'Automation Engineer', 2200,
                  ]}
                  repeat={Infinity}
                  className="font-mono text-base text-cyan-300"
                />
              </motion.div>

              {/* Stats with CountUp */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-6 mb-8"
              >
                {[
                  { end: 2, suffix: '+', label: 'Years Production' },
                  { end: 500, suffix: '+', label: 'Deploys Shipped' },
                  { end: 3, suffix: '', label: 'Cloud Platforms' },
                ].map((stat, i) => (
                  <div key={i} className="stat-box">
                    <div className="text-2xl font-bold font-mono text-cyan-400">
                      <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} delay={1} />
                    </div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5 font-mono">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Tech badges */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex flex-wrap gap-2 mb-9"
              >
                {['Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD', 'AWS', 'Azure'].map((tech, i) => (
                  <span key={i} className="tech-badge font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex gap-3 flex-wrap"
              >
                <a href="#contact" className="cta-primary group flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  Initiate Contact
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#about" className="cta-secondary flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  View Status
                </a>
              </motion.div>
            </div>

            {/* RIGHT — Terminal Window */}
            <div className="flex-1 max-w-lg w-full">
              <HeroTerminal />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10" style={{ background: 'linear-gradient(to bottom, transparent, #020c1b)' }} />
      </header>

      {/* ── ABOUT — Service Status ── */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">// ABOUT</div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops">The Engineer Behind the Pipeline</h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-7"
            >
              {[
                {
                  icon: <Rocket className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />,
                  label: 'Mission',
                  text: 'When payment terminals ship with bugs, global transactions fail. I build the infrastructure that prevents that — automated pipelines, containerized environments, and testing systems that catch problems before they reach production. Currently embedded at Worldline through Telnet, working on the DevOps backbone of critical TPE software.',
                },
                {
                  icon: <Coffee className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />,
                  label: 'Philosophy',
                  text: "Every manual process is a future incident. Every untracked deployment is a liability. I don't automate to be lazy — I automate to eliminate the gap between code and confidence. Infrastructure should be invisible, predictable, and boring in the best possible way.",
                },
              ].map(({ icon, label, text }, i) => (
                <motion.div key={i} variants={fadeUp} className="glass-devops p-6 rounded-xl">
                  <div className="flex items-start gap-3 mb-2">
                    {icon}
                    <h3 className="font-semibold text-white font-mono text-sm">{label.toUpperCase()}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm pl-8">{text}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="glass-devops p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <Award className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-white font-mono text-sm">KEY ACHIEVEMENTS</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300 pl-8">
                  {[
                    ['Terminal Packager', 'reduced packaging time from hours to under 60 seconds, deployed to production'],
                    ['Docker-simulated payment stack', 'zero development downtime during major infrastructure migration'],
                    ['Automated TPE test infrastructure', 'nightly parallel CI runs across physical terminals with X-Ray reporting'],
                    ['AWS IaC with Terraform', '50% faster environment provisioning at Spark-it'],
                  ].map(([label, text], i) => (
                    <li key={i} className="flex gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">{label}</strong>
                        <span className="text-slate-400"> → {text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right — Status Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="status-card rounded-xl overflow-hidden h-full">
                <div className="status-card-header px-5 py-3 flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-xs text-cyan-400 tracking-widest">ENGINEER STATUS</span>
                </div>
                <div className="p-5 space-y-4 font-mono text-sm">
                  <div className="flex items-center gap-3 pb-4 border-b border-cyan-400/10">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Ghassen Khalfallah</div>
                      <div className="text-green-400 text-xs">● ONLINE — Available for work</div>
                    </div>
                  </div>

                  {[
                    { key: 'uptime', value: '2+ years' },
                    { key: 'deploys', value: '500+' },
                    { key: 'pipelines', value: '50+' },
                    { key: 'availability', value: '99.9%' },
                    { key: 'incidents', value: '0 P0' },
                  ].map(({ key, value }) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-500 text-xs">{key}:</span>
                      <span className="text-cyan-300 text-xs">{value}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-cyan-400/10">
                    <div className="text-slate-500 text-xs mb-3">specialties:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['CI/CD', 'Cloud', 'Containers', 'IaC', 'Automation', 'Linux'].map(s => (
                        <span key={s} className="specialty-tag text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-cyan-400/10 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">location:</span>
                      <span className="text-slate-300 text-xs">Tunisia 🇹🇳</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">company:</span>
                      <span className="text-slate-300 text-xs">Telnet × Worldline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">focus:</span>
                      <span className="text-green-400 text-xs">Payment TPE Software</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS — Container Registry ── */}
      <section id="skills" className="py-28 relative overflow-hidden" style={{ background: 'rgba(2,12,27,0.95)' }}>
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">// CONTAINER REGISTRY</div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops">Technical Arsenal</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                className={`skill-card glass-devops rounded-xl overflow-hidden ${skill.accentClass}`}
              >
                {/* Card header bar */}
                <div className="skill-card-header flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                  <div className="flex items-center gap-2">
                    <span className={`${skill.iconColor}`}>{skill.icon}</span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">{skill.title}</span>
                  </div>
                  <span className={`skill-badge text-[9px] font-mono font-bold ${
                    skill.badge === 'RUNNING' ? 'badge-running' :
                    skill.badge === 'DEPLOYED' ? 'badge-deployed' :
                    'badge-default'
                  }`}>
                    {skill.badge}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-4 py-4">
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{skill.desc}</p>

                  {/* Docker-style tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="docker-tag docker-tag-latest">latest</span>
                    <span className="docker-tag docker-tag-version">{skill.version}</span>
                    {skill.tools.map((tool, i) => (
                      <span key={i} className="docker-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE — CI/CD Pipeline ── */}
      <section id="experience" className="py-28 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">// CI/CD PIPELINE</div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops">Professional Journey</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Pipeline track */}
            <div className="relative pl-14">
              <div className="pipeline-track" />

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.12 }}
                    className="relative"
                  >
                    {/* Stage node centered on track */}
                    <div className="pipeline-node-wrap">
                      <div className="pipeline-node">
                        <span className="font-mono text-[8px] text-cyan-400">{index + 1}</span>
                      </div>
                    </div>

                    {/* Stage card */}
                    <div className="glass-devops rounded-xl overflow-hidden">
                      {/* Stage header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-slate-500 tracking-widest">STAGE {index + 1}</span>
                          <span className="text-slate-600">·</span>
                          <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                        </div>
                        <span className={`pipeline-status ${exp.status === 'RUNNING' ? 'status-running' : 'status-success'}`}>
                          {exp.status === 'RUNNING' ? (
                            <><Play className="w-2.5 h-2.5" /> RUNNING</>
                          ) : (
                            <><CheckCircle2 className="w-2.5 h-2.5" /> SUCCESS</>
                          )}
                        </span>
                      </div>

                      {/* Stage body */}
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2 items-baseline mb-1">
                          <h3 className="text-base font-bold text-white">{exp.role}</h3>
                          <span className="text-cyan-400 font-mono text-sm">@ {exp.company}</span>
                        </div>
                        <p className="text-slate-400 text-xs italic border-l-2 border-cyan-400/30 pl-3 mb-4">{exp.highlight}</p>

                        {exp.body}

                        {'achievements' in exp && exp.achievements && (
                          <ul className="space-y-2 mb-4">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="text-slate-300 text-sm flex gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        )}

                        {exp.stack && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.stack.map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded font-mono text-cyan-300 text-[10px]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS — Deployed Services ── */}
      <section id="projects" className="py-28 relative" style={{ background: 'rgba(2,12,27,0.95)' }}>
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">// DEPLOYED SERVICES</div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops">Featured Projects</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                className="project-deploy-card glass-devops rounded-xl overflow-hidden flex flex-col"
              >
                {/* Deployment status bar */}
                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${project.envBg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${
                      project.env === 'PRODUCTION' ? 'bg-green-400' : 'bg-amber-400'
                    }`} />
                    <span className={`font-mono text-[10px] font-bold tracking-widest ${project.envColor}`}>
                      ● {project.env}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] ${project.iconColor}`}>{project.icon}</span>
                </div>

                {/* Card content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-base mb-0.5">{project.title}</h3>
                  <p className="font-mono text-[10px] text-slate-500 mb-4">{project.subtitle}</p>

                  <div className="space-y-2.5 mb-5 flex-1">
                    <p className="text-xs text-slate-400">
                      <span className="text-red-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">PROBLEM · </span>
                      {project.problem}
                    </p>
                    <p className="text-xs text-slate-300">
                      <span className="text-cyan-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">SOLUTION · </span>
                      {project.solution}
                    </p>
                    <p className="text-xs text-white font-medium">
                      <span className="text-green-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">OUTCOME · </span>
                      {project.outcome}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="docker-tag text-[10px]">{tag}</span>
                    ))}
                  </div>

                  {/* Metrics mini dashboard */}
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="metric-widget text-center py-2 px-1 rounded">
                        <span className="text-[10px] text-cyan-300 leading-tight block font-mono">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-28 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">// SYSTEM LOG</div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops">Education</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { degree: 'Engineering Cycle — Computer Engineering', institution: 'National Engineering School of Sfax (ENIS)', icon: <BookOpen className="w-5 h-5" /> },
              { degree: 'Preparatory Cycle — Physics & Technology', institution: 'Preparatory Institute for Engineering Studies of Monastir (IPEIM)', icon: <Award className="w-5 h-5" /> },
              { degree: 'Technical Baccalaureate', institution: 'Eljem High School', icon: <BookOpen className="w-5 h-5" /> },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-devops p-5 rounded-xl flex items-center gap-4"
              >
                <div className="text-cyan-400 flex-shrink-0">{edu.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-0.5">{edu.degree}</h3>
                  <p className="text-slate-400 text-xs font-mono">{edu.institution}</p>
                </div>
                <Package className="w-4 h-4 text-slate-600 ml-auto flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT — Incoming Request ── */}
      <section id="contact" className="py-28 relative" style={{ background: 'rgba(2,12,27,0.98)' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0d1929',
              color: '#e2e8f0',
              border: '1px solid rgba(0,212,255,0.2)',
              fontFamily: 'monospace',
              fontSize: '13px',
            },
          }}
        />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="section-label mb-3">// INCOMING REQUEST</div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-devops mb-3">Open for Opportunities</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether it's a DevOps challenge, a cloud migration, or just to talk infrastructure —<br />
                my inbox is a well-monitored pipeline.
              </p>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3 mb-8">
              {[
                { href: 'https://github.com/gassenkalfallah', icon: <Github className="w-4 h-4" />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ghassenkhalfallah/', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass-devops rounded-lg text-slate-400 hover:text-cyan-400 font-mono text-xs transition-colors"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            {/* API form */}
            <div className="glass-devops rounded-xl overflow-hidden">
              {/* Request header */}
              <div className="px-5 py-3 border-b border-cyan-400/10 flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400">POST /api/contact HTTP/1.1</span>
                <span className="font-mono text-[10px] text-slate-500">Content-Type: application/json</span>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block font-mono text-[10px] text-slate-500 mb-1.5 tracking-widest">
                    "from_email"
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="api-input w-full"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-slate-500 mb-1.5 tracking-widest">
                    "message"
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or challenge..."
                    required
                    rows={5}
                    className="api-input w-full resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`api-submit w-full flex items-center justify-center gap-2 font-mono ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send Request →
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-7 border-t" style={{ borderColor: 'rgba(0,212,255,0.08)' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-600 font-mono">
            © 2025 · Ghassen Khalfallah · DevOps Engineer
          </p>
          <p className="text-[11px] text-slate-600 font-mono">
            Automating the path from commit to production
          </p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-green-400/60 font-mono">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
