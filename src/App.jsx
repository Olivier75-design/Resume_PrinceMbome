import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Twitter, Download, ArrowRight, MapPin, Phone } from 'lucide-react';

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

      gsap.fromTo('.skill-tag',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)', scrollTrigger: { trigger: '#skills', start: 'top 85%' } }
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
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allSkills = [
    "Electric Transmission System Analysis",
    "Long-Range Transmission Planning",
    "Power System Modeling & Simulation",
    "Interconnection & Grid Impact Analysis",
    "Utility Regulatory Awareness (NERC/NYISO)",
    "Storm Restoration & System Operations",
    "Transmission & Substation Protection",
    "Relay Settings & Coordination (50/51, 67, 21, 87)",
    "Fault Analysis & Disturbance Review",
    "ASPEN OneLiner Modeling & Short Circuit Studies",
    "Relay Testing, Commissioning & Troubleshooting",
    "Engineering Software: SEL Quickset, GE Enervista, MICOM",
    "Design Tools: AutoCAD, Bluebeam",
    "Technical Reporting & Stakeholder Coordination",
    "Safety & Compliance (OSHA 30)"
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
        </ul>
        <a href="#contact" className="hidden md:inline-flex bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold magnetic-btn items-center gap-2">
          Contact <ArrowRight size={16} />
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="hero-element mb-8 relative z-10">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border border-primary/10 shadow-xl flex items-center justify-center mx-auto overflow-hidden">
            <span className="text-4xl text-primary opacity-30 font-bold">PM</span>
          </div>
        </div>
        
        <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-primary relative z-10">Prince Mbome</h1>
        <h2 className="hero-element font-dramatic text-3xl md:text-5xl text-accent mb-12 relative z-10">Electric Power Engineer</h2>
        
        <div className="hero-element flex flex-wrap justify-center items-center gap-4 md:gap-8 font-data text-sm md:text-base text-textDark mb-12 relative z-10">
          <span className="flex items-center gap-2"><MapPin size={16}/> Middletown, NY</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2"><Phone size={16}/> (347) 379-6948</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2"><Mail size={16}/> Oliviermbome75@gmail.com</span>
        </div>
        
        <div className="hero-element flex flex-wrap justify-center gap-4 relative z-10">
          <a href="/Resume.pdf" download className="bg-primary text-white px-8 py-4 rounded-[2rem] font-semibold flex items-center gap-2 magnetic-btn">
            Download Resume <Download size={20} />
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
            <h2 className="font-dramatic text-5xl md:text-6xl text-primary">Objective</h2>
          </div>
          <div className="hidden md:block w-[2px] bg-accent rounded-full opacity-50" />
          <div className="md:w-2/3 text-lg md:text-xl leading-relaxed text-textDark">
            <p className="mb-6">
              Electric Power Engineer with experience in transmission systems, power system analysis, and utility operations. Background in system modeling, fault analysis, and coordination with utility stakeholders.
            </p>
            <p>
              Strong analytical skills with exposure to transmission planning concepts, regulatory environments, and reliability-focused engineering. Experienced in collaborating with system operations, protection teams, and external entities to support safe, reliable, and compliant electric grid performance.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative overflow-hidden">
        <h2 className="font-dramatic text-5xl md:text-6xl text-primary text-center mb-20">Experience</h2>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/30 -translate-x-1/2" />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[1px] bg-accent/30" />

          <div className="space-y-12 md:space-y-24">
            
            {/* Exp 1 */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-end pr-8 text-right font-data text-accent">08/2025 - Present</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pl-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">08/2025 - Present</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Freelance Design MEP Engineer</h3>
                  <h4 className="text-textDark font-medium mb-4">Fiverr – Online Marketplace</h4>
                  <ul className="text-textDark/80 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Provided freelance engineering support in MEP design projects.</li>
                    <li>Reviewed one-line diagrams, schematics, and drawings for technical accuracy and constructability.</li>
                    <li>Assisted with electrical system layouts, load calculations, and design documentation.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exp 2 */}
            <div className="timeline-card relative flex flex-col md:flex-row-reverse justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-start pl-8 font-data text-accent">01/2025 - 07/2025</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pr-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">01/2025 - 07/2025</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Assistant Protection and Control Engineer</h3>
                  <h4 className="text-textDark font-medium mb-4">New York Power Authority – White Plains, NY</h4>
                  <ul className="text-textDark/80 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Supported planning and execution of capital protection & control projects to ensure compliance with NERC standards.</li>
                    <li>Collaborated cross-functionally with project managers, field technicians, and major vendors (SEL, GE, Siemens).</li>
                    <li>Performed fault analysis and developed relay protection settings using ASPEN OneLiner.</li>
                    <li>Applied protective elements such as 50/51, 67, 21, 87 for relay logic and coordination.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exp 3 */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 hidden md:flex justify-end pr-8 text-right font-data text-accent">06/2023 - 09/2023</div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#E8634A]" />
              <div className="md:w-5/12 ml-12 md:ml-0 md:pl-8 w-full">
                <div className="bg-white border border-primary/10 p-8 rounded-[2rem] card-hover">
                  <div className="md:hidden font-data text-accent mb-2 text-sm">06/2023 - 09/2023</div>
                  <h3 className="text-2xl font-bold text-primary mb-1">Project Engineer (Intern)</h3>
                  <h4 className="text-textDark font-medium mb-4">JC Broderick – Long Island, NY</h4>
                  <ul className="text-textDark/80 text-sm leading-relaxed list-disc pl-4 space-y-2">
                    <li>Participated in field engineering and project management tasks related to construction and abatement activities.</li>
                    <li>Assisted in equipment removal and reinstallation to ensure protection during hazardous material abatement.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-white border border-primary/10 p-12 rounded-[3rem] card-hover">
          <h2 className="font-dramatic text-5xl text-primary mb-8 text-center">Featured Projects</h2>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-2">Unit Substation at NIAGARA</h3>
            <ul className="text-textDark/80 text-base leading-relaxed list-disc pl-4 space-y-3">
              <li>Worked alongside Robert Moses technicians on setting development for 345kV, 230kV, and 115kV generator units.</li>
              <li>Assisted in bench testing and commissioning activities for substation equipment and relays.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="font-dramatic text-5xl md:text-6xl text-primary mb-16">Core Competencies & Tools</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {allSkills.map((skill, index) => (
            <span key={index} className="skill-tag bg-white text-primary px-5 py-3 rounded-full text-sm font-semibold border border-primary/10 shadow-sm hover:border-accent hover:text-accent transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="font-dramatic text-5xl md:text-6xl text-primary text-center mb-16">Education & Training</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover">
            <div className="font-data text-accent mb-2">Class of 2024</div>
            <h3 className="text-2xl font-bold text-primary mb-1">B.S in Electrical Engineering</h3>
            <p className="text-textDark/80">SUNY Maritime College — Throggs Neck, NY</p>
          </div>
          
          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover">
            <div className="font-data text-accent mb-2">03/07/2025</div>
            <h3 className="text-2xl font-bold text-primary mb-1">OSHA License</h3>
            <p className="text-textDark/80">30-hour Construction Safety and Health — White Plains, NY</p>
          </div>

          <div className="edu-card bg-white border border-primary/10 p-8 rounded-[2rem] card-hover md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Relevant Training</h3>
            <div className="grid md:grid-cols-2 gap-4 text-textDark/80 text-sm">
              <ul className="list-disc pl-4 space-y-2">
                <li>Power System Commissioning</li>
                <li>OMICRON Relay Testing</li>
                <li>Electrical and Arc flash Safety workshop</li>
              </ul>
              <ul className="list-disc pl-4 space-y-2">
                <li>SEL EPROT 401: Protecting Power Systems for Engineers</li>
                <li>AC & DC Power Distribution System</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-primary mt-24 rounded-[3rem] mx-4 mb-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dramatic text-5xl md:text-7xl mb-8">Let's Work Together</h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:Oliviermbome75@gmail.com" className="inline-block bg-accent text-white px-10 py-5 rounded-[3rem] font-bold text-xl magnetic-btn shadow-[0_0_20px_rgba(232,99,74,0.4)] mb-16">
            Oliviermbome75@gmail.com
          </a>
          
          <div className="flex justify-center gap-6">
            <a href="https://linkedin.com/" className="contact-icon w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all hover-lift">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1E] py-8 rounded-t-[4rem] text-center relative z-10 mx-4">
        <div className="flex items-center justify-center gap-3 font-data text-sm text-gray-500 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          Online
        </div>
        <p className="text-gray-400 text-sm">Prince Mbome • 2026</p>
      </footer>
    </div>
  );
}
