import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  Mail, Linkedin, Github, Download, ArrowRight, MapPin, Phone, 
  ExternalLink, Server, Sparkles, Layers, Cpu, CheckCircle2, 
  Music, Wrench, Building2, Terminal, ShieldCheck, Play, Radio, Activity
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.hero-element', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.about-element',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '#about', start: 'top 80%' } }
      );

      gsap.utils.toArray('.timeline-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(card,
          { x: window.innerWidth > 768 ? direction : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } }
        );
      });

      gsap.fromTo('.project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '#projects', start: 'top 85%' } }
      );

      gsap.fromTo('.skill-tag',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(1.7)', scrollTrigger: { trigger: '#skills', start: 'top 85%' } }
      );

      gsap.fromTo('.edu-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '#education', start: 'top 85%' } }
      );

      gsap.fromTo('.contact-icon',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: '#contact', start: 'top 90%' } }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ state: 'loading', message: 'Sending message...' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus({ state: 'success', message: 'Thank you! Your message was saved in Neon database.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus({ state: 'error', message: data.error || 'Submission failed. Please email me directly.' });
      }
    } catch (err) {
      setFormStatus({ state: 'error', message: 'Direct submission requires Vercel deployment. Please email directly!' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const electricalSkills = [
    "Electric Transmission System Analysis",
    "Long-Range Transmission Planning",
    "Power System Modeling & Simulation",
    "Transmission & Substation Protection",
    "Relay Settings & Coordination (50/51, 67, 21, 87)",
    "Fault Analysis & Disturbance Review",
    "ASPEN OneLiner Modeling & Short Circuit Studies",
    "Relay Testing, Commissioning & Troubleshooting",
    "Utility Regulatory Standards (NERC / NYISO)",
    "Engineering Software: SEL Quickset, GE Enervista, MICOM",
    "Design Tools: AutoCAD, Bluebeam",
    "Storm Restoration & System Operations",
    "Safety & Compliance (OSHA 30)"
  ];

  const softwareSkills = [
    "Full-Stack Web Development (React, Next.js, Node.js)",
    "Cloud Server Hosting & DevOps (Linux, Nginx, Docker)",
    "Production App Operations & Serving ('Serve & Run')",
    "Generative AI & Audio API Orchestration",
    "Multi-Tenant SaaS Architecture & FSM Workflows",
    "Real-Time Audio Streaming & FFmpeg Processing",
    "Database Modeling & Performance (PostgreSQL)",
    "Financial Deal Screening & Analytics Algorithms",
    "RESTful APIs, Microservices & Webhooks",
    "Stripe Payment Gateway & Subscription Management"
  ];

  return (
    <div ref={containerRef} className="relative w-full text-primary">
      <div className="noise-overlay" />
      
      {/* Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-[2rem] px-6 py-3 flex items-center justify-between gap-8 ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-primary/10 shadow-sm' : 'bg-transparent text-primary'}`}>
        <div className="font-bold text-xl tracking-tighter">PM<span className="text-accent">.</span></div>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><a href="#about" className="hover-lift hover:text-accent transition-colors">About</a></li>
          <li><a href="#experience" className="hover-lift hover:text-accent transition-colors">Experience</a></li>
          <li><a href="#projects" className="hover-lift hover:text-accent transition-colors">Projects</a></li>
          <li><a href="#skills" className="hover-lift hover:text-accent transition-colors">Skills</a></li>
          <li><a href="#education" className="hover-lift hover:text-accent transition-colors">Education</a></li>
        </ul>
        <a href="#contact" className="hidden md:inline-flex bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold magnetic-btn items-center gap-2">
          Contact <ArrowRight size={16} />
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-20 pb-16">
        <div className="hero-element mb-6 relative z-10">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-2 border-accent/30 shadow-xl flex items-center justify-center mx-auto overflow-hidden">
            <span className="text-4xl text-primary opacity-40 font-bold">PM</span>
          </div>
        </div>

        {/* Live Ventures Pill */}
        <div className="hero-element inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-primary/10 shadow-sm text-xs md:text-sm font-data text-primary mb-6 relative z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span>Creator of <strong>CantaMe</strong> • Building <strong>Veylo</strong> & <strong>Propivo</strong></span>
        </div>
        
        <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-black mb-3 text-primary relative z-10 tracking-tight">
          Prince Mbome
        </h1>
        <h2 className="hero-element font-dramatic text-2xl md:text-4xl lg:text-5xl text-accent mb-8 relative z-10">
          Electric Power Engineer & Full-Stack Builder
        </h2>
        
        <div className="hero-element flex flex-wrap justify-center items-center gap-3 md:gap-6 font-data text-xs md:text-sm text-textDark mb-10 relative z-10">
          <span className="flex items-center gap-2"><MapPin size={15}/> Middletown, NY</span>
          <span className="hidden md:inline text-primary/30">|</span>
          <span className="flex items-center gap-2"><Phone size={15}/> (347) 379-6948</span>
          <span className="hidden md:inline text-primary/30">|</span>
          <span className="flex items-center gap-2"><Mail size={15}/> Oliviermbome75@gmail.com</span>
        </div>
        
        <div className="hero-element flex flex-wrap justify-center gap-4 relative z-10">
          <a href="/Resume.pdf" download className="bg-primary text-white px-8 py-4 rounded-[2rem] font-semibold flex items-center gap-2 magnetic-btn">
            Download Resume <Download size={18} />
          </a>
          <a href="#projects" className="bg-accent text-white px-8 py-4 rounded-[2rem] font-semibold flex items-center gap-2 magnetic-btn shadow-[0_0_20px_rgba(232,99,74,0.3)]">
            Explore Projects <ArrowRight size={18} />
          </a>
          <a href="#contact" className="border border-primary/20 text-primary px-8 py-4 rounded-[2rem] font-semibold magnetic-btn hover:bg-black/5 transition-colors">
            Get In Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 about-element">
          <div className="md:w-1/3">
            <h2 className="font-dramatic text-5xl md:text-6xl text-primary">Manifesto & Vision</h2>
            <div className="mt-4 font-data text-xs text-accent uppercase tracking-widest">
              Grid Reliability • Software Craft
            </div>
          </div>
          <div className="hidden md:block w-[2px] bg-accent rounded-full opacity-40" />
          <div className="md:w-2/3 text-lg md:text-xl leading-relaxed text-textDark space-y-6">
            <p>
              I am an <strong>Electric Power Engineer</strong> with hands-on expertise in high-voltage transmission systems, power system modeling, fault analysis, and protection & control operations with entities like the New York Power Authority (NYPA). My technical foundation centers on rigorous analytical modeling, relay coordination, and compliance with strict utility regulatory standards (NERC / NYISO).
            </p>
            <p>
              Parallel to my power engineering career, I operate as a <strong>Creative Technologist & Full-Stack Builder</strong>. I am the creator, host, and live operator of <strong>CantaMe</strong> — a personalized AI music composition platform that I serve and maintain in active production.
            </p>
            <p>
              Currently, I am also deeply engaged in developing two high-impact software platforms: <strong>Veylo</strong>, a modern field service and MEP operations system tailored for electrical contractors, and <strong>Propivo</strong>, an automated PropTech asset analytics and maintenance intelligence engine. I build at the crossroads of physical energy systems and resilient digital architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="font-dramatic text-5xl md:text-6xl text-primary">Experience</h2>
          <p className="font-data text-sm text-accent mt-3">From Grid Protection to Production Cloud Systems</p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/30 -translate-x-1/2" />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[1px] bg-accent/30" />

          <div className="space-y-12 md:space-y-20">
            
            {/* Exp 1 - CantaMe */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex flex-col items-end pr-8 text-right font-data">
                <span className="text-accent font-bold">2026 - Present</span>
                <span className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live & Running
                </span>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pl-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
                  <div className="md:hidden font-data text-accent mb-2 text-sm flex items-center justify-between">
                    <span>2026 - Present</span>
                    <span className="text-emerald-600 font-semibold text-xs">Live & Running</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1 flex items-center gap-2">
                    Founder, Full-Stack Architect & System Operator
                  </h3>
                  <h4 className="text-textDark font-medium mb-4 flex items-center gap-2">
                    <Music size={16} className="text-accent" /> CantaMe — AI Music Platform (cantame.app)
                  </h4>
                  <ul className="text-textDark/85 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li><strong>Created, self-hosts, and actively runs</strong> the CantaMe SaaS application in production, serving customized AI-composed songs with vocals and melodies.</li>
                    <li>Designed end-to-end full-stack architecture: prompt engineering workflows, LLM lyric generation, and generative audio API orchestration.</li>
                    <li>Manages continuous deployment (CI/CD), Linux cloud server administration, reverse proxies (Nginx), SSL automation, and database storage.</li>
                    <li>Ensures 24/7 server uptime, real-time media streaming delivery, and Stripe payment processing with high availability.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exp 2 - Freelance MEP */}
            <div className="timeline-card relative flex flex-col md:flex-row-reverse justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-start pl-8 font-data text-accent">08/2025 - Present</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pr-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">08/2025 - Present</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Freelance Design MEP Engineer</h3>
                  <h4 className="text-textDark font-medium mb-4 flex items-center gap-2">
                    <Wrench size={16} className="text-accent" /> Fiverr – Online Marketplace
                  </h4>
                  <ul className="text-textDark/85 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Provides freelance engineering support for multi-disciplinary MEP (Mechanical, Electrical, Plumbing) design projects.</li>
                    <li>Reviews one-line diagrams, schematics, panel schedules, and technical drawings for precision and constructability.</li>
                    <li>Performs electrical load calculations, system layouts, and comprehensive engineering documentation.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exp 3 - NYPA */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-end pr-8 text-right font-data text-accent">01/2025 - 07/2025</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pl-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">01/2025 - 07/2025</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Assistant Protection and Control Engineer</h3>
                  <h4 className="text-textDark font-medium mb-4 flex items-center gap-2">
                    <Cpu size={16} className="text-accent" /> New York Power Authority – White Plains, NY
                  </h4>
                  <ul className="text-textDark/85 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Supported planning and execution of capital protection & control projects to guarantee compliance with NERC reliability standards.</li>
                    <li>Collaborated cross-functionally with project managers, field technicians, and major relay vendors (SEL, GE, Siemens).</li>
                    <li>Performed short-circuit fault analysis and calculated protective relay settings using ASPEN OneLiner.</li>
                    <li>Configured protective elements (50/51 overcurrent, 67 directional, 21 distance, 87 differential) for advanced relay logic.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exp 4 - JC Broderick */}
            <div className="timeline-card relative flex flex-col md:flex-row-reverse justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-start pl-8 font-data text-accent">06/2023 - 09/2023</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pr-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">06/2023 - 09/2023</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Project Engineer (Intern)</h3>
                  <h4 className="text-textDark font-medium mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-accent" /> JC Broderick – Long Island, NY
                  </h4>
                  <ul className="text-textDark/85 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Participated in field engineering inspections and project coordination for construction and abatement sites.</li>
                    <li>Assisted with equipment staging, temporary power routing, and OSHA safety verification.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-dramatic text-5xl md:text-6xl text-primary mb-4">Featured Projects & Ventures</h2>
          <p className="text-lg text-textDark/80 max-w-2xl mx-auto">
            A showcase of live production software, active engineering platforms in development, and high-voltage grid infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          
          {/* Project 1: CantaMe */}
          <div className="project-card bg-white border border-primary/10 rounded-[3rem] p-8 md:p-12 card-hover shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-data text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                LIVE APPLICATION • CREATED, SERVED & RUN
              </div>
              <div className="font-data text-xs text-textDark/60">
                Flagship Production SaaS
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-2 flex items-center gap-3">
                  CantaMe <span className="font-dramatic text-accent text-2xl md:text-3xl font-normal">— AI Personalized Music SaaS</span>
                </h3>
                <p className="font-data text-sm text-textDark/70 mb-4">
                  <strong>Role:</strong> Creator, Full-Stack Architect & Production System Operator • <strong>Launched:</strong> 2026
                </p>
                <p className="text-textDark/90 text-base md:text-lg leading-relaxed mb-6">
                  <strong>CantaMe</strong> is an artificial intelligence-driven platform that composes and generates complete, personalized studio-quality songs — including custom lyrics, melodies, and vocals — tailored for milestones such as birthdays, weddings, anniversaries, and personal tributes.
                </p>
              </div>

              <div className="lg:w-72 shrink-0 bg-[#FAFAFA] border border-primary/10 p-6 rounded-[2rem]">
                <div className="text-xs font-data uppercase tracking-wider text-accent font-semibold mb-3">Live Operations ("Serve & Run")</div>
                <ul className="text-xs text-textDark/80 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> 24/7 Cloud Server Uptime</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> Reverse Proxy (Nginx) & SSL</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> AI Audio Generation Pipelines</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> Real-Time Streaming & CDN</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> Stripe Checkout Integration</li>
                </ul>
                <div className="mt-5">
                  <a 
                    href="https://cantame.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex w-full items-center justify-center gap-2 bg-primary text-white py-2.5 px-4 rounded-full font-semibold text-xs magnetic-btn hover:bg-accent transition-colors"
                  >
                    Visit CantaMe App <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Architecture & Technical Execution:</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-textDark/80 leading-relaxed mb-6">
                <div>
                  <strong className="text-primary block mb-1">Generative AI Pipeline:</strong>
                  Orchestrated prompt engineering with Large Language Models for poetic rhyming coupled with neural audio synthesis to render realistic musical genres and vocal performances.
                </div>
                <div>
                  <strong className="text-primary block mb-1">Infrastructure & Serving:</strong>
                  Deployed and maintained on cloud VPS with Docker containerization, asynchronous Redis job queues for audio rendering, and automated health checks to prevent downtime.
                </div>
                <div>
                  <strong className="text-primary block mb-1">User & Commerce Flow:</strong>
                  Built a frictionless responsive stepper interface guiding users from story input to audio generation, with encrypted payments via Stripe and instant MP3 audio streaming.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Node.js", "AI Generative Audio", "FFmpeg", "Nginx VPS", "Docker", "Stripe API", "Cloud Storage"].map((tag, i) => (
                  <span key={i} className="font-data text-xs bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project 2: Veylo */}
          <div className="project-card bg-white border border-primary/10 rounded-[3rem] p-8 md:p-12 card-hover shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-data text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                ACTIVE VENTURE • IN DEVELOPMENT
              </div>
              <div className="font-data text-xs text-textDark/60">
                Field Service & MEP Management SaaS
              </div>
            </div>

            <div className="max-w-3xl mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-primary mb-2 flex items-center gap-3">
                Veylo <span className="font-dramatic text-accent text-2xl md:text-3xl font-normal">— Next-Gen Field Service Platform for MEP</span>
              </h3>
              <p className="font-data text-sm text-textDark/70 mb-4">
                <strong>Role:</strong> Lead Product Architect & Systems Engineer
              </p>
              <p className="text-textDark/90 text-base md:text-lg leading-relaxed">
                <strong>Veylo</strong> is an all-in-one Field Service Management (FSM) cloud platform architected specifically for technical trade businesses — electrical contractors, MEP engineers, HVAC specialists, and plumbing teams. It bridges Prince's practical electrical engineering background with modern enterprise software.
              </p>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Core Innovations & Ongoing Engineering:</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-textDark/80 leading-relaxed mb-6">
                <div>
                  <strong className="text-primary block mb-1">Smart Dispatch & Geo-Routing:</strong>
                  Dynamic dispatch calendar matching emergency calls and planned substation/facility visits based on electrician licenses, OSHA certifications, and proximity.
                </div>
                <div>
                  <strong className="text-primary block mb-1">Mobile Field Work Orders:</strong>
                  Offline-first technician interface providing instant access to wiring diagrams, safety checklists (NEC & OSHA compliance), photo documentation, and digital signature sign-offs.
                </div>
                <div>
                  <strong className="text-primary block mb-1">Automated Job Costing:</strong>
                  Seamless synchronization between materials used, technician labor hours, supplier purchase orders, and client invoicing, eliminating administrative revenue leaks.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React / TypeScript", "Node.js", "PostgreSQL", "Multi-Tenant Cloud", "Offline-First Mobile", "MEP Workflows", "OSHA Compliance"].map((tag, i) => (
                  <span key={i} className="font-data text-xs bg-amber-500/10 text-amber-900 px-3 py-1.5 rounded-full border border-amber-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project 3: Propivo */}
          <div className="project-card bg-white border border-primary/10 rounded-[3rem] p-8 md:p-12 card-hover shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-data text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                ACTIVE VENTURE • IN DEVELOPMENT
              </div>
              <div className="font-data text-xs text-textDark/60">
                PropTech & Real Estate Asset Intelligence
              </div>
            </div>

            <div className="max-w-3xl mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-primary mb-2 flex items-center gap-3">
                Propivo <span className="font-dramatic text-accent text-2xl md:text-3xl font-normal">— Residential Asset Intelligence & Zero-Markup Maintenance</span>
              </h3>
              <p className="font-data text-sm text-textDark/70 mb-4">
                <strong>Role:</strong> Lead Full-Stack Architect & Financial Modeling Engineer
              </p>
              <p className="text-textDark/90 text-base md:text-lg leading-relaxed">
                <strong>Propivo</strong> is a cutting-edge PropTech platform designed for real estate investors, asset managers, and residential landlords. It replaces manual underwriting spreadsheets and opaque property management fees with automated deal screening and transparent, direct-to-contractor maintenance orchestration.
              </p>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Core Innovations & Ongoing Engineering:</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-textDark/80 leading-relaxed mb-6">
                <div>
                  <strong className="text-primary block mb-1">Automated Deal Screening:</strong>
                  Algorithmic underwriting engine that computes Net Operating Income (NOI), Cap Rate, Cash-on-Cash Return, and Internal Rate of Return (IRR) across prospective acquisitions.
                </div>
                <div>
                  <strong className="text-primary block mb-1">"Zero-Markup" Maintenance:</strong>
                  Direct dispatch engine for maintenance tickets directly to vetted local trades without hidden manager markups, saving property owners 15-30% in operational costs.
                </div>
                <div>
                  <strong className="text-primary block mb-1">Unified Investor Dashboard:</strong>
                  Real-time rent roll tracking, lease lifecycle management, automated tenant payment reminders, and one-click financial reporting for tax filing.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js", "Financial Underwriting Engine", "Data Analytics", "PostgreSQL", "Tailwind CSS", "PropTech", "API Integrations"].map((tag, i) => (
                  <span key={i} className="font-data text-xs bg-blue-500/10 text-blue-900 px-3 py-1.5 rounded-full border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project 4: NIAGARA Unit Substation */}
          <div className="project-card bg-white border border-primary/10 rounded-[3rem] p-8 md:p-12 card-hover shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary font-data text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary" />
                UTILITY CAPITAL PROJECT • NYPA
              </div>
              <div className="font-data text-xs text-textDark/60">
                High-Voltage Grid Protection
              </div>
            </div>

            <div className="max-w-3xl mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-primary mb-2 flex items-center gap-3">
                Unit Substation at NIAGARA <span className="font-dramatic text-accent text-2xl md:text-3xl font-normal">— Robert Moses Power Plant</span>
              </h3>
              <p className="font-data text-sm text-textDark/70 mb-4">
                <strong>Role:</strong> Assistant Protection & Control Engineer
              </p>
              <p className="text-textDark/90 text-base md:text-lg leading-relaxed">
                A critical utility capital infrastructure project executed in collaboration with the New York Power Authority (NYPA) at the Robert Moses Niagara Power Plant, safeguarding major clean power generation and multi-voltage transmission across New York State.
              </p>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Engineering Highlights:</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-textDark/80 leading-relaxed mb-6">
                <div>
                  <strong className="text-primary block mb-1">Multi-Voltage Protection:</strong>
                  Calculated protective relay settings and logic schemes for 345kV, 230kV, and 115kV generator step-up units and transmission interconnects.
                </div>
                <div>
                  <strong className="text-primary block mb-1">ASPEN Modeling:</strong>
                  Performed comprehensive short circuit studies and validated coordination curves for 50/51 overcurrent, 67 directional, 21 distance, and 87 differential elements.
                </div>
                <div>
                  <strong className="text-primary block mb-1">Bench Testing & Commissioning:</strong>
                  Partnered with plant technicians on secondary injection bench testing, relay commissioning, and compliance verification with NERC standards.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["ASPEN OneLiner", "Relay Coordination", "345kV / 230kV / 115kV", "SEL Relays", "GE Enervista", "NERC Compliance"].map((tag, i) => (
                  <span key={i} className="font-data text-xs bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-dramatic text-5xl md:text-6xl text-primary mb-4">Core Competencies & Tools</h2>
          <p className="text-base text-textDark/80 max-w-xl mx-auto">
            Dual proficiency in high-voltage power engineering and full-stack software development.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-sm font-data font-bold uppercase tracking-wider text-accent mb-6 text-center">
              ⚡ Electrical Power & Protection Engineering
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {electricalSkills.map((skill, index) => (
                <span key={index} className="skill-tag bg-white text-primary px-5 py-3 rounded-full text-sm font-semibold border border-primary/10 shadow-sm hover:border-accent hover:text-accent transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-data font-bold uppercase tracking-wider text-accent mb-6 text-center">
              💻 Software Architecture, Cloud & SaaS Operations
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {softwareSkills.map((skill, index) => (
                <span key={index} className="skill-tag bg-white text-primary px-5 py-3 rounded-full text-sm font-semibold border border-primary/10 shadow-sm hover:border-accent hover:text-accent transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="font-dramatic text-5xl md:text-6xl text-primary text-center mb-16">Education & Training</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
            <div className="font-data text-accent mb-2">Class of 2024</div>
            <h3 className="text-2xl font-bold text-primary mb-1">B.S in Electrical Engineering</h3>
            <p className="text-textDark/80">SUNY Maritime College — Throggs Neck, NY</p>
          </div>
          
          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm">
            <div className="font-data text-accent mb-2">03/07/2025</div>
            <h3 className="text-2xl font-bold text-primary mb-1">OSHA License</h3>
            <p className="text-textDark/80">30-hour Construction Safety and Health — White Plains, NY</p>
          </div>

          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover shadow-sm md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Relevant Training & Workshops</h3>
            <div className="grid md:grid-cols-2 gap-4 text-textDark/80 text-sm">
              <ul className="list-disc pl-4 space-y-2">
                <li>Power System Commissioning & Acceptance Testing</li>
                <li>OMICRON Advanced Relay Testing Workshops</li>
                <li>Electrical and Arc Flash Safety Workshop</li>
              </ul>
              <ul className="list-disc pl-4 space-y-2">
                <li>SEL EPROT 401: Protecting Power Systems for Engineers</li>
                <li>AC & DC Power Distribution Systems Design</li>
                <li>Full-Stack Software Architecture & Cloud Operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-primary mt-24 rounded-[3rem] mx-4 mb-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dramatic text-5xl md:text-7xl mb-6">Let's Work Together</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Available for power engineering consultations, grid protection initiatives, or collaborative software ventures.
          </p>

          {/* Neon-Connected Direct Message Form */}
          <div className="max-w-xl mx-auto mb-12 bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] text-left backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-data text-xs text-accent uppercase tracking-wider font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Direct Message • Connected to Neon Database
              </span>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-data text-white/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-data text-white/70 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-data text-white/70 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Prince, let's discuss grid protection or collaborative ventures..."
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={formStatus.state === 'loading'}
                  className="w-full sm:w-auto bg-accent text-white px-7 py-3 rounded-full font-semibold text-sm magnetic-btn flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(232,99,74,0.4)]"
                >
                  {formStatus.state === 'loading' ? 'Saving to Database...' : 'Send Message'}
                  <ArrowRight size={15} />
                </button>
                {formStatus.message && (
                  <span className={`text-xs font-data ${formStatus.state === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {formStatus.message}
                  </span>
                )}
              </div>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="mailto:Oliviermbome75@gmail.com" className="inline-block bg-white/10 border border-white/20 text-white px-8 py-4 rounded-[3rem] font-bold text-lg hover:bg-white/15 transition-colors">
              Oliviermbome75@gmail.com
            </a>
            <a href="tel:3473796948" className="inline-block border border-white/20 text-white px-8 py-4 rounded-[3rem] font-semibold text-lg hover:bg-white/10 transition-colors">
              (347) 379-6948
            </a>
          </div>
          
          <div className="flex justify-center gap-6">
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="contact-icon w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all hover-lift">
              <Linkedin size={22} />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-icon w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all hover-lift">
              <Github size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1E] py-8 rounded-t-[4rem] text-center relative z-10 mx-4">
        <div className="flex items-center justify-center gap-3 font-data text-sm text-gray-400 mb-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          Systems Operational • Ready for Opportunities
        </div>
        <p className="text-gray-500 text-xs font-data">Prince Mbome • 2026 • Crafted with Modern Web Architecture</p>
      </footer>
    </div>
  );
}
