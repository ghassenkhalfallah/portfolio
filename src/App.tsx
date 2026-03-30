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
  ArrowDownToLine,
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
  { cmd: '$ puppet apply --noop manifests/init.pp', result: '✓ 14 resources compiled, 0 errors [3s]', delay: 2200 },
  { cmd: '$ terraform apply -auto-approve', result: '✓ 9 VMs provisioned across 3 envs [32s]', delay: 4400 },
  { cmd: '$ docker build -t app:latest .', result: '✓ Image built (247MB) [18s]', delay: 6600 },
  { cmd: '$ vault-manage-keys list', result: '✓ 3 workers · tokens refreshed [5min]', delay: 8800 },
  { cmd: '$ kubectl rollout status deploy/app', result: '✓ Rolled out to 3/3 pods [4s]', delay: 11000 },
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
      healthColor: '#22d3ee',
      title: 'Cloud Platforms',
      desc: 'Provisions multi-region AWS and Azure environments with Terraform IaC — from VM fleets to EKS clusters, reproducible at scale.',
      tools: ['AWS', 'Azure', 'Terraform', 'EKS'],
      badge: 'DEPLOYED',
      version: 'v3.1',
      proficiency: 85,
      digest: 'sha256:c4f9a1b7e2d08f3e · pulled 3 days ago',
      pullCmd: 'docker pull ghassen/cloud-platforms:v3.1',
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      iconColor: 'text-purple-400',
      accentClass: 'skill-accent-purple',
      accentHex: '#c084fc',
      healthColor: '#c084fc',
      title: 'DevOps & CI/CD',
      desc: 'Ships production-ready code through battle-tested GitLab pipelines with Docker containerization and Kubernetes orchestration.',
      tools: ['GitLab CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
      badge: 'RUNNING',
      version: 'latest',
      proficiency: 92,
      digest: 'sha256:a3f2b1d9c7e045ac · pulled 2 days ago',
      pullCmd: 'docker pull ghassen/devops-cicd:latest',
    },
    {
      icon: <Boxes className="w-8 h-8" />,
      iconColor: 'text-orange-400',
      accentClass: 'skill-accent-orange',
      accentHex: '#fb923c',
      healthColor: '#fb923c',
      title: 'Artifact Management',
      desc: 'Manages the full artifact lifecycle — every binary traceable, every release reproducible, zero dependency drift.',
      tools: ['Nexus', 'Artifactory', 'Docker Hub'],
      badge: 'PULLED',
      version: 'v2.4',
      proficiency: 80,
      digest: 'sha256:e8b3f2a1d0c94e7f · pulled 5 days ago',
      pullCmd: 'docker pull ghassen/artifact-mgmt:v2.4',
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      iconColor: 'text-green-400',
      accentClass: 'skill-accent-green',
      accentHex: '#4ade80',
      healthColor: '#4ade80',
      title: 'Testing & Quality',
      desc: 'Runs parallel nightly test suites across live TPE hardware with X-Ray integration — bugs caught before they reach payment terminals.',
      tools: ['X-Ray', 'Test Automation', 'Integration Testing', 'CI Testing'],
      badge: 'PASSED',
      version: 'v1.8',
      proficiency: 78,
      digest: 'sha256:f1a0b8e3c2d59674 · pulled 1 day ago',
      pullCmd: 'docker pull ghassen/testing-qa:v1.8',
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      iconColor: 'text-yellow-400',
      accentClass: 'skill-accent-yellow',
      accentHex: '#facc15',
      healthColor: '#facc15',
      title: 'Scripting & OS',
      desc: 'Automates the unglamorous work — Shell, Bash, and Python 3.12 scripts that run quietly in production and eliminate human error.',
      tools: ['Shell Scripting', 'Linux', 'Bash', 'Python 3.12'],
      badge: 'ACTIVE',
      version: 'v4.0',
      proficiency: 88,
      digest: 'sha256:9d2c5e7b1f3a08e4 · pulled 4 days ago',
      pullCmd: 'docker pull ghassen/scripting-os:v4.0',
    },
    {
      icon: <Server className="w-8 h-8" />,
      iconColor: 'text-emerald-400',
      accentClass: 'skill-accent-emerald',
      accentHex: '#34d399',
      healthColor: '#34d399',
      title: 'Config Management',
      desc: 'Authors production Puppet modules with Hiera hierarchies and HashiCorp Vault AppRole integration — full lifecycle IaC from VM to running service.',
      tools: ['Puppet 8', 'HashiCorp Vault', 'Hiera', 'RHEL 9', 'systemd'],
      badge: 'DEPLOYED',
      version: 'v1.5.2',
      proficiency: 94,
      digest: 'sha256:b7d4e9c2f1a305b8 · pulled just now',
      pullCmd: 'docker pull ghassen/config-mgmt:v1.5.2',
      isNew: true,
    },
  ];

  const experiences = [
    {
      role: 'DevOps & Automation Engineer',
      company: 'Telnet × Worldline',
      period: 'Sep 2023 — Present',
      status: 'RUNNING',
      commitCount: '40+',
      highlight: 'Building CI/CD pipelines, Puppet IaC modules, and multi-environment infrastructure for global payment software.',
      body: (
        <>
          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            Embedded with Worldline — a global leader in electronic payment solutions — designing and owning the full DevOps stack: CI/CD pipelines, configuration management, infrastructure provisioning, and automated testing for TPE and conversion service software.
          </p>

          {/* Impact numbers strip */}
          <div className="impact-strip mb-5">
            {[
              { value: '9', label: 'VMs Provisioned' },
              { value: '3', label: 'Environments' },
              { value: '5 min', label: 'Secret Rotation' },
              { value: '<60s', label: 'Deploy Time' },
              { value: '674', label: 'Lines DSL' },
              { value: '3', label: 'Workers / VM' },
            ].map(({ value, label }) => (
              <div key={label} className="impact-chip">
                <span className="impact-chip-value">{value}</span>
                <span className="impact-chip-label">{label}</span>
              </div>
            ))}
          </div>

          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Key Wins</h4>
          <ul className="space-y-3 text-sm text-slate-300 mb-5">
            {[
              ['Axis Provisioning Converter', 'Built a production Puppet module (v1.5.2) from scratch — 5 classes, 674 lines of DSL — orchestrating 3 parallel Python workers per VM with HashiCorp Vault AppRole secret rotation every 5 minutes. Provisioned 9 VMs across sandbox/preprod/production with Terraform.'],
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

          {/* Pipeline log output widget */}
          <div className="pipeline-log">
            <div className="pipeline-log-header">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[10px] text-green-400 tracking-widest">LIVE DEPLOY LOG</span>
              <span className="ml-auto font-mono text-[9px] text-slate-600">gitlab-runner #247</span>
            </div>
            <div className="pipeline-log-body">
              {[
                { ts: '09:23:01', icon: '✓', text: 'puppet apply --noop passed (14 resources)', type: 'success' },
                { ts: '09:23:47', icon: '✓', text: 'vault-sync: AppRole tokens refreshed (3 workers)', type: 'success' },
                { ts: '09:24:12', icon: '✓', text: 'terraform plan: 0 changes, infrastructure up-to-date', type: 'info' },
                { ts: '09:24:55', icon: '✓', text: 'deploy/axis-converter rollout complete (9/9 VMs)', type: 'success' },
                { ts: '09:25:03', icon: '✓', text: 'health-check: all 27 workers responding on :8000 :8080 :8090', type: 'success' },
              ].map(({ ts, icon, text, type }, i) => (
                <div key={i} className={type === 'success' ? 'log-line-success' : 'log-line-info'}>
                  <span className="log-timestamp">[{ts}]</span>
                  <span>{icon} {text}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
      stackGrouped: [
        { cat: 'IaC', items: ['Puppet 8', 'Terraform', 'Hiera'] },
        { cat: 'Secrets', items: ['HashiCorp Vault'] },
        { cat: 'Containers', items: ['Docker'] },
        { cat: 'Pipeline', items: ['GitLab CI/CD', 'Nexus', 'X-Ray'] },
        { cat: 'OS', items: ['RHEL 9', 'Linux', 'Shell', 'Python 3.12'] },
      ],
      stack: null,
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
      title: 'Axis Provisioning Converter',
      subtitle: 'Puppet · Terraform · Vault · Worldline/Ingenico',
      env: 'PRODUCTION',
      envColor: 'text-green-400',
      envBg: 'bg-green-400/10 border-green-400/20',
      icon: <Server className="w-6 h-6" />,
      iconColor: 'text-green-400',
      problem: 'Payment conversion services required reproducible, multi-environment deployment with zero-downtime updates and enterprise-grade secret management — none of which existed.',
      solution: 'Built a production Puppet module (v1.5.2) from scratch — 5 classes, 674 lines of DSL — orchestrating 3 parallel Python workers per VM, HashiCorp Vault AppRole integration for automatic API key rotation every 5 minutes, and Terraform-provisioned VMs across 3 environments.',
      outcome: '9 VMs deployed across sandbox/preprod/production via Terraform. Zero-downtime config reloads, secrets auto-rotate every 5 min, 6 merchant rate-limit categories enforced in production.',
      tags: ['Puppet 8', 'Terraform', 'HashiCorp Vault', 'RHEL 9', 'Python 3.12', 'GitLab CI/CD', 'Nexus', 'Hiera'],
      metrics: ['9 VMs · 3 Envs', '5-min Secret Rotation', '3 Workers/VM'],
      featured: true,
    },
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
          <div className="flex items-center gap-3">
            <a
              href="/portfolio/cv_ghassen_khalfallah.pdf"
              download="Ghassen_Khalfallah_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="border border-green-400/30 text-green-400 font-mono text-[10px] px-2.5 py-1 rounded hover:bg-green-400/10 transition-colors flex items-center gap-1"
            >
              <ArrowDownToLine className="w-3 h-3" />
              CV
            </a>
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
        <div className="absolute inset-0 cyber-grid z-0 opacity-20 pointer-events-none" />

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
                <a
                  href="/portfolio/cv_ghassen_khalfallah.pdf"
                  download="Ghassen_Khalfallah_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="cv-download-btn"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  $ artifact pull resume.pdf
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
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #020c1b)' }} />
      </header>

      {/* ── ABOUT — Service Status ── */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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

            {/* Right — Status Dashboard + Release Artifact */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              <div className="status-card rounded-xl overflow-hidden">
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

              {/* LATEST RELEASE — artifact card */}
              <div className="release-card rounded-xl overflow-hidden">
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(0,255,157,0.04)', borderBottom: '1px solid rgba(0,255,157,0.1)' }}>
                  <Package className="w-3.5 h-3.5 text-green-400" />
                  <span className="font-mono text-xs text-green-400 tracking-widest">LATEST RELEASE</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-base">📦</span>
                    <span className="text-white font-semibold text-xs">resume.pdf</span>
                  </div>
                  <div className="text-slate-500 text-xs">ghassen/resume:latest</div>

                  <div className="space-y-1.5 pt-1 border-t border-green-400/10">
                    {[
                      { key: 'size', value: '133KB' },
                      { key: 'format', value: 'PDF' },
                      { key: 'updated', value: '2025' },
                    ].map(({ key, value }) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs">{key}:</span>
                        <span className="text-green-300 text-xs">{value}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/portfolio/cv_ghassen_khalfallah.pdf"
                    download="Ghassen_Khalfallah_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="docker-pull-btn mt-2"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5 flex-shrink-0" />
                    $ docker pull resume
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS — Container Registry ── */}
      <section id="skills" className="py-28 relative overflow-hidden" style={{ background: 'rgba(2,12,27,0.95)' }}>
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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
            <p className="font-mono text-[11px] text-slate-500 mt-3 tracking-wider">
              registry.ghassen.devops/skills — <span className="text-cyan-400/70">{skills.length} images available</span>
            </p>
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
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`skill-card glass-devops rounded-xl overflow-hidden ${skill.accentClass} ${skill.isNew ? 'skill-card-new' : ''}`}
                style={skill.isNew ? { boxShadow: '0 0 0 1px rgba(52,211,153,0.25), 0 0 40px rgba(52,211,153,0.08)' } : {}}
              >
                {/* Card header bar */}
                <div className="skill-card-header flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                  <div className="flex items-center gap-2">
                    {/* Heartbeat live dot */}
                    <span
                      className="skill-heartbeat"
                      style={{ color: skill.accentHex }}
                    />
                    <span className={`${skill.iconColor}`}>{React.cloneElement(skill.icon as React.ReactElement, { className: 'w-4 h-4' })}</span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">{skill.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {skill.isNew && (
                      <span className="skill-badge badge-new text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">NEW</span>
                    )}
                    <span className={`skill-badge text-[9px] font-mono font-bold ${
                      skill.badge === 'RUNNING' ? 'badge-running' :
                      skill.badge === 'DEPLOYED' ? 'badge-deployed' :
                      'badge-default'
                    }`}>
                      {skill.badge}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-4 py-4 flex flex-col gap-3">
                  <p className="text-slate-400 text-xs leading-relaxed">{skill.desc}</p>

                  {/* Docker-style tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="docker-tag docker-tag-latest">latest</span>
                    <span className="docker-tag docker-tag-version">{skill.version}</span>
                    {skill.tools.map((tool, i) => (
                      <span key={i} className="docker-tag">{tool}</span>
                    ))}
                  </div>

                  {/* Health check bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Health Check</span>
                      <span className="font-mono text-[9px]" style={{ color: skill.accentHex }}>{skill.proficiency}%</span>
                    </div>
                    <div className="health-bar-track">
                      <motion.div
                        className="health-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                        style={{ background: skill.accentHex, color: skill.accentHex }}
                      />
                    </div>
                  </div>

                  {/* Image digest + pull command */}
                  <div className="border-t border-white/5 pt-2">
                    <div className="img-digest mb-2">{skill.digest}</div>
                    <div className="skill-card-pull">
                      <span className="pull-cmd">
                        <span style={{ color: skill.accentHex }}>$</span>
                        {skill.pullCmd}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE — CI/CD Pipeline ── */}
      <section id="experience" className="py-28 relative">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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
                      <div className={`pipeline-node ${exp.status === 'RUNNING' ? '' : 'border-cyan-500/50'}`}
                        style={exp.status === 'RUNNING' ? {} : { animation: 'none', boxShadow: 'none', borderColor: 'rgba(0,212,255,0.35)' }}
                      >
                        <span className="font-mono text-[8px] text-cyan-400">{index + 1}</span>
                      </div>
                    </div>

                    {/* Stage card */}
                    <div className="glass-devops rounded-xl overflow-hidden">
                      {/* Stage header — enriched */}
                      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-white/5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-500 tracking-widest">STAGE {index + 1}</span>
                          <span className="text-slate-700">·</span>
                          <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                          {'commitCount' in exp && exp.commitCount && (
                            <>
                              <span className="text-slate-700">·</span>
                              <span className="commit-badge">
                                <GitBranch className="w-2.5 h-2.5" />
                                {exp.commitCount} commits
                              </span>
                            </>
                          )}
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

                        {/* Technology constellation — grouped stack */}
                        {'stackGrouped' in exp && exp.stackGrouped && (
                          <div className="pt-3 border-t border-white/5">
                            <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-3">Tech Constellation</div>
                            <div className="space-y-1.5">
                              {exp.stackGrouped.map(({ cat, items }) => (
                                <div key={cat} className="stack-group">
                                  <span className="stack-cat-label">{cat}:</span>
                                  {items.map((tech, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded font-mono text-cyan-300 text-[10px]">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Flat stack for non-grouped entries */}
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
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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
            {/* Featured project — full width */}
            {projects[0].featured && (
              <motion.div
                variants={fadeUp}
                custom={0}
                className="project-deploy-card glass-devops rounded-xl overflow-hidden flex flex-col md:col-span-2"
              >
                {/* Deployment status bar */}
                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${projects[0].envBg}`}>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full animate-pulse bg-green-400" />
                    <span className={`font-mono text-[10px] font-bold tracking-widest ${projects[0].envColor}`}>
                      ● {projects[0].env}
                    </span>
                    <span className="ml-2 font-mono text-[9px] text-green-400/60 border border-green-400/20 rounded px-1.5 py-0.5 tracking-widest">FEATURED</span>
                  </div>
                  <span className={projects[0].iconColor}>{projects[0].icon}</span>
                </div>

                {/* Card content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="md:flex md:gap-8">
                    {/* Left column */}
                    <div className="md:flex-1">
                      <h3 className="font-bold text-white text-lg mb-0.5">{projects[0].title}</h3>
                      <p className="font-mono text-[10px] text-slate-500 mb-4">{projects[0].subtitle}</p>

                      <div className="space-y-2.5 mb-5">
                        <p className="text-xs text-slate-400">
                          <span className="text-red-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">PROBLEM · </span>
                          {projects[0].problem}
                        </p>
                        <p className="text-xs text-slate-300">
                          <span className="text-cyan-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">SOLUTION · </span>
                          {projects[0].solution}
                        </p>
                        <p className="text-xs text-white font-medium">
                          <span className="text-green-400/80 font-mono text-[9px] uppercase tracking-wider font-bold">OUTCOME · </span>
                          {projects[0].outcome}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {projects[0].tags.map((tag, i) => (
                          <span key={i} className="docker-tag text-[10px]">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right column — infra stats */}
                    <div className="md:w-52 md:flex-shrink-0">
                      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2">Infrastructure</div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { label: '9 VMs', sub: 'Total' },
                          { label: '3 Envs', sub: 'Sandbox→Prod' },
                          { label: '5 Classes', sub: 'Puppet DSL' },
                          { label: 'v1.5.2', sub: 'Latest Tag' },
                        ].map((stat, i) => (
                          <div key={i} className="metric-widget text-center py-2 px-1 rounded">
                            <span className="text-[11px] text-green-300 leading-tight block font-mono font-bold">{stat.label}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{stat.sub}</span>
                          </div>
                        ))}
                      </div>
                      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2">Metrics</div>
                      <div className="grid grid-cols-1 gap-2">
                        {projects[0].metrics.map((metric, i) => (
                          <div key={i} className="metric-widget text-center py-2 px-1 rounded">
                            <span className="text-[10px] text-cyan-300 leading-tight block font-mono">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Remaining projects — 2-column grid */}
            {projects.slice(1).map((project, index) => (
              <motion.div
                key={index + 1}
                variants={fadeUp}
                custom={index + 1}
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
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
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
          <a
            href="/portfolio/cv_ghassen_khalfallah.pdf"
            download="Ghassen_Khalfallah_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-green-400/50 font-mono hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <ArrowDownToLine className="w-3 h-3" />
            resume.pdf
          </a>
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
