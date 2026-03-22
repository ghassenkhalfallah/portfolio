import React, { useEffect, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import profileImage from './profile.jpeg';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Toaster, toast } from 'react-hot-toast';
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
  User,
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

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.success('Message sent!');
      setFormData({ email: '', message: '' });
    } catch {
      toast.error('Failed to send. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      icon: <Cloud className="w-10 h-10" />,
      iconColor: 'text-cyan-400',
      accentClass: 'skill-accent-cyan',
      title: 'Cloud Platforms',
      desc: 'Provisions multi-region AWS and Azure environments with Terraform — reproducible infrastructure at scale, zero manual clicks.',
      tools: ['AWS', 'Azure', 'Terraform', 'EKS'],
    },
    {
      icon: <GitBranch className="w-10 h-10" />,
      iconColor: 'text-purple-400',
      accentClass: 'skill-accent-purple',
      title: 'DevOps & CI/CD',
      desc: 'Ships production-ready code through battle-tested GitLab pipelines with Docker containerization and Kubernetes orchestration.',
      tools: ['GitLab CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
    },
    {
      icon: <Boxes className="w-10 h-10" />,
      iconColor: 'text-orange-400',
      accentClass: 'skill-accent-orange',
      title: 'Artifact Management',
      desc: 'Manages the full artifact lifecycle — every binary traceable, every release reproducible, zero dependency drift.',
      tools: ['Nexus', 'Artifactory', 'Docker Hub', 'SharePoint'],
    },
    {
      icon: <TestTube className="w-10 h-10" />,
      iconColor: 'text-green-400',
      accentClass: 'skill-accent-green',
      title: 'Testing & Quality',
      desc: 'Runs parallel nightly test suites across live TPE hardware with X-Ray integration — bugs caught before they reach payment terminals.',
      tools: ['X-Ray', 'Test Automation', 'Integration Testing', 'CI Testing'],
    },
    {
      icon: <Terminal className="w-10 h-10" />,
      iconColor: 'text-yellow-400',
      accentClass: 'skill-accent-yellow',
      title: 'Scripting & OS',
      desc: 'Automates the unglamorous work — Shell, Bash, and Python scripts that run quietly in production and eliminate human error.',
      tools: ['Shell Scripting', 'Linux', 'Bash', 'Python'],
    },
    {
      icon: <Workflow className="w-10 h-10" />,
      iconColor: 'text-pink-400',
      accentClass: 'skill-accent-pink',
      title: 'Methodologies & Tools',
      desc: 'Ships in 2-week sprints, tracks in Jira, reviews in Git — Agile discipline without ceremony overhead.',
      tools: ['Agile', 'Scrum', 'Jira', 'Git'],
    },
  ];

  const experiences = [
    {
      role: 'DevOps & Automation Engineer',
      company: 'Telnet × Worldline',
      period: 'Sep 2023 — Present',
      highlight: 'Building the CI/CD backbone behind global payment terminal software.',
      body: (
        <>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            Embedded with Worldline — a global leader in electronic payment solutions — designing and maintaining the DevOps infrastructure that underpins TPE software development and release cycles.
          </p>
          <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Key Wins</h4>
          <ul className="space-y-3 text-sm text-gray-300 mb-5">
            {[
              ['Terminal Packager', 'Automated consolidation of 15+ TPE software components into validated packages — reduced packaging time from hours to under 60 seconds, deployed to production.'],
              ['Infrastructure Resilience', 'Built a Docker-based local simulation of payment servers (acquirer + treatment) that kept development unblocked during a major infrastructure migration.'],
              ['Automated TPE Testing', 'Architected a CI/CD-driven testing system with nightly parallel runs across multiple physical payment terminals — results integrated with X-Ray for instant visibility.'],
            ].map(([label, text], i) => (
              <li key={i} className="flex gap-3">
                <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
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
      icon: <Zap className="w-7 h-7" />,
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
      icon: <TestTube className="w-7 h-7" />,
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
      icon: <Cloud className="w-7 h-7" />,
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
      icon: <Workflow className="w-7 h-7" />,
      iconColor: 'text-purple-400',
      problem: 'Java application deployments were manual, inconsistent, and required intervention at every step.',
      solution: 'Built a zero-downtime delivery pipeline — Maven build, Docker image creation, and automated deployment triggered by a git push.',
      outcome: 'Every commit automatically validated and shipped. No manual deployments.',
      tags: ['Jenkins', 'Docker', 'Maven', 'Java'],
      metrics: ['Automated on Push', 'Container-First', 'Zero Downtime'],
    },
  ];

  const floatingIcons = [GitBranch, Cloud, Terminal, Boxes, Workflow, Settings];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md py-4 border-b border-white/5' : 'py-6'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#home" className="text-lg font-bold gradient-text flex items-center gap-2 hover-lift">
            <Terminal className="w-4 h-4" />
            ghassen.devops
          </a>
          <div className="hidden md:flex gap-6">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-all relative pb-1 ${
                  activeSection === item.href.slice(1)
                    ? 'text-blue-400 active-nav-link'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header id="home" className="min-h-screen flex items-center justify-center relative matrix-bg overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center opacity-5" />

        {/* Floating background icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingIcons.map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${[8, 22, 72, 88, 50, 35][i]}%`,
                top: `${[18, 72, 12, 62, 88, 45][i]}%`,
                animationDelay: `${i * 1.1}s`,
                opacity: 0.05,
              }}
            >
              <Icon style={{ width: `${[80, 56, 96, 48, 64, 40][i]}px`, height: `${[80, 56, 96, 48, 64, 40][i]}px` }} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                <img
                  src={profileImage}
                  alt="Ghassen Khalfallah"
                  className="w-36 h-36 rounded-full border-2 border-blue-400/30 object-cover relative z-10"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 z-20" title="Available" />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-blue-400/70 text-xs font-mono tracking-[0.35em] uppercase mb-5"
            >
              Infrastructure as Code · Delivery as Art
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold mb-5 gradient-text"
            >
              Ghassen Khalfallah
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-400 mb-8 h-7 font-light"
            >
              <TypeAnimation
                sequence={[
                  'DevOps Engineer', 2200,
                  'Cloud Infrastructure Specialist', 2200,
                  'CI/CD Architect', 2200,
                  'Automation Engineer', 2200,
                ]}
                repeat={Infinity}
                className="text-blue-300"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex justify-center gap-10 mb-9"
            >
              {[
                { value: '2+', label: 'Years in Production' },
                { value: '<60s', label: 'Deploy Cycles' },
                { value: '3', label: 'Cloud Platforms' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
              className="flex flex-wrap justify-center gap-2.5 mb-11"
            >
              {['Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD', 'AWS'].map((tech, i) => (
                <span key={i} className="tech-stack-item px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm">
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center gap-4"
            >
              <a
                href="#contact"
                className="group px-8 py-3.5 bg-blue-600 rounded-xl font-semibold flex items-center gap-2 animate-pulse-glow hover:bg-blue-500 transition-colors"
              >
                Work With Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="px-8 py-3.5 border border-white/10 rounded-xl hover:border-blue-400/40 hover:bg-white/5 transition-all"
              >
                My Story
              </a>
            </motion.div>

          </div>
        </div>
      </header>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 gradient-text"
          >
            The Engineer Behind the Pipeline
          </motion.h2>
          <div className="max-w-4xl mx-auto glass-effect p-10 rounded-2xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {[
                {
                  icon: <Rocket className="w-7 h-7 text-blue-400 flex-shrink-0 mt-1" />,
                  label: 'Mission',
                  text: 'When payment terminals ship with bugs, global transactions fail. I build the infrastructure that prevents that — automated pipelines, containerized environments, and testing systems that catch problems before they reach production. Currently embedded at Worldline through Telnet, working on the DevOps backbone of critical TPE software.',
                },
                {
                  icon: <Coffee className="w-7 h-7 text-blue-400 flex-shrink-0 mt-1" />,
                  label: 'Philosophy',
                  text: 'Every manual process is a future incident. Every untracked deployment is a liability. I don\'t automate to be lazy — I automate to eliminate the gap between code and confidence. Infrastructure should be invisible, predictable, and boring in the best possible way.',
                },
              ].map(({ icon, label, text }, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-6 items-start">
                  {icon}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-glow">{label}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{text}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="flex gap-6 items-start">
                <Award className="w-7 h-7 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-glow">Key Achievements</h3>
                  <ul className="space-y-2.5 text-sm text-gray-300">
                    {[
                      ['Terminal Packager', 'reduced packaging time from hours to under 60 seconds, deployed to production'],
                      ['Docker-simulated payment stack', 'zero development downtime during major infrastructure migration'],
                      ['Automated TPE test infrastructure', 'nightly parallel CI runs across physical terminals with X-Ray reporting'],
                      ['AWS IaC with Terraform', '50% faster environment provisioning at Spark-it'],
                    ].map(([label, text], i) => (
                      <li key={i} className="flex gap-2.5">
                        <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">{label}</strong> → {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-32 relative overflow-hidden bg-gray-900/50">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 gradient-text"
          >
            Technical Arsenal
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                className={`skill-card glass-effect p-8 rounded-2xl ${skill.accentClass}`}
              >
                <div className={`${skill.iconColor} mb-5`}>{skill.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{skill.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 gradient-text"
          >
            Professional Journey
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-7">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl experience-line"
              >
                <div className="flex flex-wrap gap-2 items-baseline mb-1">
                  <h3 className="text-xl font-semibold gradient-text">{exp.role}</h3>
                  <span className="text-blue-400 text-sm">@ {exp.company}</span>
                </div>
                <p className="text-gray-500 text-xs font-mono mb-3">{exp.period}</p>
                <p className="text-gray-400 text-sm italic border-l-2 border-blue-400/30 pl-4 mb-5">{exp.highlight}</p>

                {exp.body}

                {'achievements' in exp && exp.achievements && (
                  <ul className="space-y-2 mb-5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.stack && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.stack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-32 bg-gray-900/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 gradient-text"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                className="project-card glass-effect p-8 rounded-2xl flex flex-col"
              >
                <div className="project-content flex flex-col flex-1">
                  <div className={`${project.iconColor} mb-4`}>{project.icon}</div>
                  <h3 className="text-lg font-semibold mb-0.5">{project.title}</h3>
                  <p className="text-[11px] text-gray-500 font-mono mb-5">{project.subtitle}</p>

                  <div className="space-y-2.5 mb-6 flex-1">
                    <p className="text-sm text-gray-400">
                      <span className="text-red-400/70 text-[10px] font-semibold uppercase tracking-wider">Problem · </span>
                      {project.problem}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-blue-400/70 text-[10px] font-semibold uppercase tracking-wider">Solution · </span>
                      {project.solution}
                    </p>
                    <p className="text-sm text-white font-medium">
                      <span className="text-green-400/70 text-[10px] font-semibold uppercase tracking-wider">Outcome · </span>
                      {project.outcome}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center py-2 px-1 bg-blue-500/10 border border-blue-500/10 rounded-lg">
                        <span className="text-[11px] text-blue-300 leading-tight block">{metric}</span>
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
      <section id="education" className="py-32 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 gradient-text"
          >
            Education
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-5">
            {[
              { degree: 'Engineering Cycle — Computer Engineering', institution: 'National Engineering School of Sfax (ENIS)', icon: <BookOpen className="w-6 h-6" /> },
              { degree: 'Preparatory Cycle — Physics & Technology', institution: 'Preparatory Institute for Engineering Studies of Monastir (IPEIM)', icon: <Award className="w-6 h-6" /> },
              { degree: 'Technical Baccalaureate', institution: 'Eljem High School', icon: <BookOpen className="w-6 h-6" /> },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl flex items-start gap-5"
              >
                <div className="text-blue-400 mt-0.5">{edu.icon}</div>
                <div>
                  <h3 className="text-base font-semibold mb-0.5">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 relative">
        <Toaster position="top-right" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 gradient-text">
              Open for Opportunities
            </h2>
            <p className="text-gray-400 text-center mb-10 text-sm leading-relaxed">
              Whether it's a DevOps challenge, a cloud migration, or just to talk infrastructure —<br />
              my inbox is a well-monitored pipeline.
            </p>

            <div className="flex justify-center gap-4 mb-10">
              {[
                { href: 'https://github.com/gassenkalfallah', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ghassenkhalfallah/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 glass-effect rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="glass-effect rounded-xl overflow-hidden">
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your@email.com" required
                  className="w-full px-6 py-4 bg-transparent outline-none text-white placeholder-gray-600 text-sm"
                />
              </div>
              <div className="glass-effect rounded-xl overflow-hidden">
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project, team, or challenge..."
                  required rows={5}
                  className="w-full px-6 py-4 bg-transparent outline-none text-white placeholder-gray-600 resize-none text-sm"
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:from-blue-500 hover:to-cyan-400 hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'Sending...' : (<><span>Send Message</span><ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-gray-600 font-mono">
            © 2025 · Ghassen Khalfallah · DevOps Engineer · Automating the path from commit to production
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
