import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioSection, ProjectItem } from '../types';
import {
  Github,
  Send,
  Cpu,
  Layers,
  Orbit,
  ArrowUpRight,
  Sparkles,
  Compass,
  GraduationCap,
  Award,
  ChevronRight,
  Instagram,
  Linkedin,
  Phone,
  Mail
} from 'lucide-react';

interface PortfolioContentProps {
  activeSection: PortfolioSection;
  setActiveSection: (section: PortfolioSection) => void;
}

export default function PortfolioContent({
  activeSection,
  setActiveSection,
}: PortfolioContentProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'saathi',
      title: 'Saathi-OS',
      tagline: 'AI-Orchestrated Workspace & Hardware Bridge',
      description:
        'A local desktop environment, leveraging AI coding assistants to rapidly prototype and integrate a React frontend with a Node.js/Flask backend. Features a hybrid cloud-fallback system, configuring Ngrok tunnels to map local client requests to remote cloud GPUs when hardware limits are hit.',
      tech: ['React', 'Node.js', 'Flask', 'Python', 'Ngrok', 'Gemma API'],
      role: 'Systems Architect & Integrator',
      link: '#',
      spaceCoordinates: [1.2, -0.8, -1.0],
    },
    {
      id: 'grainguard',
      title: 'GrainGuard AI',
      tagline: 'Predictive Calculus & Spoilage Simulation Engine',
      description:
        'An interactive, calculus-based web application to predict post-harvest grain spoilage, translating complex differential equations into an accessible analytics dashboard. Implemented numerical simulation logic (Runge-Kutta approximations) and phase space analysis to identify metastable transitions triggering exponential fungal growth.',
      tech: ['Python', 'Streamlit', 'NumPy', 'Matplotlib', 'Calculus'],
      role: 'Simulation Integrator & Frontend Architect',
      link: '#',
      spaceCoordinates: [-1.0, 1.2, 0.5],
    },
    {
      id: 'telemetry',
      title: 'IoT Telemetry Dashboard',
      tagline: 'Hardware-to-Web Telemetry Pipeline',
      description:
        'An end-to-end IoT ecosystem, bridging physical microcontroller sensor data to a live, responsive web dashboard. Configured the Arduino Cloud Agent to establish secure, low-latency data pipelines between local edge hardware and the cloud.',
      tech: ['Node.js', 'React', 'Arduino C/C++', 'Arduino Cloud', 'Python'],
      role: 'IoT Systems Integrator',
      link: '#',
      spaceCoordinates: [0.5, 0.5, -2.5],
    },
    {
      id: 'ai-ecosystem',
      title: 'Personal AI Assistant Ecosystem',
      tagline: 'Modular Diagnostic Diagnostic Architecture',
      description:
        'Initiated development in 8th grade and continuously iterated and updated a modular diagnostic assistant. Served as a foundational catalyst for pursuing software engineering, self-taught programming, and systems integration.',
      tech: ['Python', 'Shell Scripting', 'Systems Integration'],
      role: 'Creator & Developer',
      link: '#',
      spaceCoordinates: [-0.8, -1.2, -1.5],
    },
  ];

  const skillCategories = [
    {
      title: 'Languages & AI Stack',
      items: ['Python', 'C / C++', 'React', 'TypeScript', 'Node.js / Flask'],
    },
    {
      title: 'Systems & Hardware',
      items: ['Arduino IoT Cloud', 'Ngrok Tunnels', 'Ollama Deployments', 'Hugging Face', 'Linux KDE Plasma'],
    },
    {
      title: 'Core Competencies',
      items: ['AI-Driven Dev', 'Rapid Prototyping', 'Prompt Engineering', 'API Routing', 'Math Modeling'],
    },
  ];

  const education = [
    {
      institution: 'Vellore Institute of Technology (VIT), Chennai',
      degree: 'B.Tech in Computer Science and Engineering (CSE Core)',
      metric: 'Current CGPA: 8.6 / 10.0 (First Semester)',
      details: 'Relevant Coursework: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOPS), Computational Structures, Multivariable Calculus, Probability & Statistics, Applied Chemistry, Engineering Physics.',
    },
    {
      institution: 'Brilliant Study Centre, Pala',
      degree: 'Advanced Engineering Entrance Preparation',
      metric: '95th Percentile in JEE Main',
      details: 'Scored 95th percentile in JEE Main, alongside top merit rankings in VITEEE and AEEE.',
    },
    {
      institution: 'IJM HSS Kottiyoor',
      degree: 'Higher Secondary Education (PCMB)',
      metric: '12th Board Score: 1194 / 1200 (99.5%)',
      details: 'Earned 99.5% with distinction as the School Topper.',
    },
    {
      institution: 'St. Thomas Higher Secondary School, Kelakam',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      metric: '10th Board Score: Full A+ (Equivalent to 95%+)',
      details: 'Sustained peak academic merit with a perfect GPA across all core fields.',
    },
  ];

  const leadership = [
    { role: 'Technical Club Member', organization: 'CYSCOM (Cybersecurity Club, VIT Chennai)', desc: 'Focusing on active cyber security challenges.' },
    { role: 'Core Member', organization: 'Fraternity of Young Innovators (VIT Chennai)', desc: 'Developing cross-disciplinary collaborative projects.' },
    { role: 'State Scholar', organization: 'NUMATS Math Talent Search', desc: 'Selected as one of only 15 students state-wide.' },
    { role: 'Technical Head', organization: 'Little Kites (St. Thomas HSS)', desc: 'Led technical workshops on game and application design.' },
  ];

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);

    setTimeout(() => {
      setCopiedLabel(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pointer-events-none p-6 md:p-12 relative z-10 font-sans text-slate-200">
      
      {/* Sleek Minimalist Navigation Header */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center pointer-events-auto select-none mt-2">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
          <div className="w-8 h-8 rounded-lg bg-[#010204]/90 flex items-center justify-center border border-[#00f2ff]/30 shadow-[0_0_15px_rgba(0,242,255,0.1)] hover:border-[#00f2ff]/70 transition-all duration-300">
            <Orbit className="w-4.5 h-4.5 text-[#00f2ff] animate-spin-slow" />
          </div>
          <span className="font-display text-xs tracking-[0.3em] text-white font-semibold">
            GODWIN K S
          </span>
        </div>

        {/* Floating Menu Link list */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/75 backdrop-blur-md rounded-2xl border border-[#00f2ff]/5">
          {(['home', 'projects', 'skills'] as PortfolioSection[]).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                activeSection === sec
                  ? 'bg-[#00f2ff]/10 text-[#00f2ff] font-semibold border-b border-[#00f2ff]/30'
                  : 'text-slate-400 hover:text-[#00f2ff]'
              }`}
            >
              {sec}
            </button>
          ))}
        </nav>

        {/* Connect Action Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection('contact')}
            className={`px-4 py-2 text-[10px] font-mono border rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.05)] cursor-pointer text-nowrap ${
              activeSection === 'contact'
                ? 'bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/60 font-semibold shadow-[0_0_15px_rgba(0,242,255,0.15)]'
                : 'bg-[#010204]/80 hover:bg-slate-900 text-slate-350 border-[#00f2ff]/30 hover:border-[#00f2ff]/60'
            }`}
          >
            Contact Me
          </button>
        </div>
      </header>

      {/* Primary content area */}
      <main className="w-full max-w-7xl mx-auto my-auto py-12">
        <AnimatePresence mode="wait">
          
          {/* HOME SECTION */}
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-auto max-w-xl space-y-8 text-center md:text-left md:ml-12"
            >
              {/* Minimal Status Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2ff]/5 border border-[#00f2ff]/10 rounded-full select-none">
                <Sparkles size={10} className="text-[#00f2ff] animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#00f2ff]/90">
                  VIT CHENNAI CSE Student
                </span>
              </div>

              {/* Tagline Headings */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight leading-tight text-white">
                  Building the next{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f2ff] via-indigo-400 to-[#00f2ff] font-semibold cyan-glow-text">
                    intelligent workspace
                  </span>
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-md opacity-90">
                  Hi, I am Godwin K S, a lifelong systems enthusiast. I combine rigorous math modeling with AI integrations to craft real-time 3D pipelines, responsive IoT dashboards, and custom local assistants.
                </p>
              </div>

              {/* Minimal Action Rows */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                <button
                  onClick={() => setActiveSection('projects')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#010204]/90 text-[#00f2ff] font-medium text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#00f2ff]/10 cursor-pointer border border-[#00f2ff]/25 shadow-[0_0_15px_rgba(0,242,255,0.05)] transition-all"
                >
                  <Compass size={13} />
                  <span className="font-mono tracking-[0.12em] uppercase">View Projects</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* PROJECTS SECTION */}
          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-auto space-y-8 md:ml-12"
            >
              <div className="border-b border-[#00f2ff]/10 pb-4 max-w-2xl">
                <h2 className="text-2xl font-bold font-display tracking-wider text-white uppercase">Selected Projects</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Select a project to inspect its architecture, engineering role, and technology stack.
                </p>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Projects Left Sidebar List */}
                <div className="md:col-span-5 space-y-3">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                        activeProject === proj.id
                          ? 'bg-slate-950/90 border-[#00f2ff]/40 shadow-[0_0_20px_rgba(0,242,255,0.08)]'
                          : 'bg-slate-950/45 hover:bg-slate-900/10 border-slate-900 hover:border-[#00f2ff]/15'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg border transition-colors ${
                            activeProject === proj.id ? 'border-[#00f2ff]/50 bg-[#00f2ff]/5' : 'border-slate-800 bg-slate-900/40'
                          }`}>
                            <Cpu size={12} className={activeProject === proj.id ? 'text-[#00f2ff]' : 'text-slate-400'} />
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold font-display tracking-widest text-white">{proj.title}</h3>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{proj.tagline}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className={`text-slate-500 group-hover:text-[#00f2ff] transition-transform ${
                          activeProject === proj.id ? 'rotate-90 text-[#00f2ff]' : ''
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Expanded Details Panel on Right */}
                <div className="md:col-span-7 h-full">
                  <AnimatePresence mode="wait">
                    {activeProject ? (
                      <motion.div
                        key={activeProject}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-[#00f2ff]/15 shadow-[0_0_30px_rgba(0,242,255,0.04)] space-y-4"
                      >
                        {(() => {
                          const proj = projects.find((p) => p.id === activeProject);
                          if (!proj) return null;
                          return (
                            <div className="space-y-4">
                              <div className="border-b border-slate-900 pb-3">
                                <h4 className="text-md font-bold text-white font-display tracking-wider leading-none">{proj.title}</h4>
                                <p className="text-[9px] font-mono text-[#00f2ff] mt-1.5 uppercase tracking-widest font-semibold leading-none">
                                  Role: {proj.role}
                                </p>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed font-sans scrollbar-thin select-text">
                                {proj.description}
                              </p>
                              
                              <div className="pt-2">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                                  Core Stack Matrix:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {proj.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-850 text-slate-300 rounded"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    ) : (
                      <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/20 flex flex-col items-center justify-center space-y-3 h-full">
                        <Cpu className="text-slate-600 w-8 h-8 opacity-40" />
                        <p className="text-xs text-slate-400 font-mono">Select a project on the left to view technical details.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* SKILLS SECTION */}
          {activeSection === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-auto space-y-8 md:ml-12"
            >
              <div className="border-b border-[#00f2ff]/10 pb-4 max-w-2xl">
                <h2 className="text-2xl font-bold font-display tracking-wider text-white uppercase">Skills & Qualifications</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  A summary of academic achievements, technical proficiencies, roles, and leadership experience.
                </p>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Column Left: Academic logs & Leadership (VIT Chennai, St.Thomas) */}
                <div className="md:col-span-7 space-y-6">
                  {/* Academic Logs */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00f2ff] flex items-center gap-2">
                      <GraduationCap size={14} /> Education History
                    </h3>
                    
                    <div className="space-y-4">
                      {education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-slate-950/50 rounded-xl border border-slate-900 hover:border-slate-800 transition-colors">
                          <h4 className="text-xs font-semibold text-white font-display tracking-wider">{edu.institution}</h4>
                          <div className="flex justify-between items-center text-[10px] mt-1 text-[#00f2ff] font-mono">
                            <span>{edu.degree}</span>
                            <span className="font-semibold">{edu.metric}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-2 font-sans leading-relaxed">{edu.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leadership logs */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00f2ff] flex items-center gap-2">
                      <Award size={14} /> Leadership & Roles
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {leadership.map((lead, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-slate-900/80">
                          <div className="text-[10px] text-white font-semibold tracking-wider font-display">{lead.role}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5">{lead.organization}</div>
                          <p className="text-[9px] text-[#00f2ff]/75 mt-1 font-sans">{lead.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column Right: Technical Skill Categories */}
                <div className="md:col-span-5 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00f2ff] flex items-center gap-2">
                    <Layers size={14} /> Skills Matrix
                  </h3>

                  <div className="space-y-4">
                    {skillCategories.map((cat) => (
                      <div
                        key={cat.title}
                        className="p-5 bg-slate-950/85 rounded-xl border border-slate-900 space-y-3"
                      >
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#00f2ff]/80 pb-2 border-b border-slate-900">{cat.title}</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((skill) => (
                            <span 
                              key={skill}
                              className="text-[9px] font-mono px-2 py-0.5 bg-slate-900/60 border border-slate-800/80 text-slate-300 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* CONTACT SECTION */}
          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-auto space-y-6 max-w-lg md:ml-12 w-full"
            >
              <div className="border-b border-emerald-500/15 pb-4">
                <h2 className="text-2xl font-bold font-display tracking-wider text-white uppercase">Get In Touch</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Access direct channels for partnerships, project inquiries, or digital networking.
                </p>
              </div>

              {/* Bento Grid list */}
              <div className="space-y-3">
                {[
                  {
                    id: 'email',
                    name: 'Email ID',
                    value: 'godwin1708@gmail.com',
                    displayValue: 'godwin1708@gmail.com',
                    href: 'mailto:godwin1708@gmail.com',
                    icon: Mail,
                    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
                    tag: 'PRIMARY'
                  },
                  {
                    id: 'phone',
                    name: 'Phone Number',
                    value: '+91 8921104787',
                    displayValue: '+91 8921104787',
                    href: 'tel:+918921104787',
                    icon: Phone,
                    color: 'text-teal-400 border-teal-500/20 bg-teal-500/5 hover:border-teal-500/40',
                    tag: 'MOBILE'
                  },
                  {
                    id: 'linkedin',
                    name: 'LinkedIn',
                    value: 'https://www.linkedin.com/in/godwin-k-s-undefined-5976a7373',
                    displayValue: 'linkedin.com/in/godwin-k-s...',
                    href: 'https://www.linkedin.com/in/godwin-k-s-undefined-5976a7373',
                    icon: Linkedin,
                    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40',
                    tag: 'CONNECT'
                  },
                  {
                    id: 'github',
                    name: 'GitHub',
                    value: 'https://github.com/GodwinKS',
                    displayValue: 'github.com/GodwinKS',
                    href: 'https://github.com/GodwinKS',
                    icon: Github,
                    color: 'text-purple-400 border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40',
                    tag: 'CODEBASE'
                  },
                  {
                    id: 'instagram',
                    name: 'Instagram',
                    value: 'https://instagram.com/godwin_k_s',
                    displayValue: '@godwin_k_s',
                    href: 'https://instagram.com/godwin_k_s',
                    icon: Instagram,
                    color: 'text-pink-400 border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40',
                    tag: 'SOCIAL'
                  }
                ].map((channel) => {
                  const ChannelIcon = channel.icon;
                  const isCopied = copiedLabel === channel.id;
                  
                  return (
                    <motion.div
                      key={channel.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`group relative flex items-center justify-between p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${channel.color}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 transition-colors group-hover:text-white shrink-0 shadow-inner">
                          <ChannelIcon size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                              {channel.name}
                            </span>
                            <span className="text-[8px] font-mono font-semibold px-1.5 py-0.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded">
                              {channel.tag}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-white truncate pr-2 mt-0.5 font-mono select-all">
                            {channel.displayValue}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Copy trigger button */}
                        <button
                          onClick={() => handleCopyText(channel.value, channel.id)}
                          className="px-2.5 py-1.5 text-[9px] font-mono uppercase bg-slate-900/80 hover:bg-slate-900 text-slate-300 rounded-lg cursor-pointer transition-all border border-slate-800 hover:border-slate-700 select-none relative"
                        >
                          <AnimatePresence mode="wait">
                            {isCopied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="text-emerald-400 font-bold"
                              >
                                COPIED
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                              >
                                COPY
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>

                        {/* Open link action */}
                        <a
                          href={channel.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                          title={`Open ${channel.name}`}
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer copyright and live telemetry */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-slate-500 gap-4 select-none mb-1">
        <div>
          <span>© 2026 GODWIN K S. Computer Science Engineering (VIT Chennai). All rights reserved.</span>
        </div>
        
        {/* Mobile Navigation fallback */}
        <div className="flex md:hidden items-center gap-1.5 p-1 bg-slate-950/75 backdrop-blur-md rounded-2xl border border-slate-800/20 pointer-events-auto">
          {(['home', 'projects', 'skills'] as PortfolioSection[]).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3 py-1 rounded-lg text-[8px] font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === sec
                  ? 'bg-slate-900 text-[#00f2ff] border border-slate-800'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[#00f2ff]/40">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-ping" />
            <span>PROD_MODE: 60 FPS</span>
          </span>
          <span>RENDERER: WEBGL</span>
        </div>
      </footer>
    </div>
  );
}
