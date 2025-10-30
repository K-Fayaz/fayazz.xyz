import React, { useEffect, useState } from 'react';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import ScrollProgressBar from './ScrollProgressBar';

const MePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <ScrollProgressBar sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
      
      <div className="ml-5 md:ml-20 pt-24">
        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center px-8 max-w-4xl mx-auto">
          <div className="w-full">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-extralight mb-8 leading-tight tracking-tight">
                Exploring the
                <br />
                <span className="text-gray-400">digital cosmos</span>
              </h1>
            </div>
            
            <div className="max-w-2xl space-y-6">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                Hi I'm Fayaz, a developer and creator embarking on a journey to build 12 meaningful projects in 12 months. 
                Each project is a new constellation in my expanding universe of ideas.
              </p>
              
              <p className="text-base text-gray-500 leading-relaxed font-light">
                From AI-powered applications to elegant digital experiences, I believe in learning through creation. 
                This odyssey is about growth, experimentation, and crafting value through technology.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center px-8 max-w-4xl mx-auto">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-extralight mb-16 text-gray-200 tracking-tight">Capabilities</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wide">Technology</h3>
                <div className="space-y-3">
                  {['Next.js','React & TypeScript', 'Node.js & Express', 'Python & FastAPI', 'PostgreSQL & MongoDB', 'GCP & Docker'].map((skill) => (
                    <div key={skill} className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wide">Product & Design</h3>
                <div className="space-y-3">
                  {['UI/UX Design', 'MVP Development', 'User Research', 'Product Strategy'].map((skill) => (
                    <div key={skill} className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wide">GenAI</h3>
                <div className="space-y-3">
                  {['OpenAI & Anthropic APIs', 'Prompt Engineering'].map((skill) => (
                    <div key={skill} className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center px-8 max-w-4xl mx-auto">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-extralight mb-16 text-gray-200 tracking-tight">Journey</h2>
            
            <div className="space-y-12">
              <div className="border-l border-gray-800 pl-8 relative">
                <div className="absolute w-2 h-2 bg-white rounded-full -left-1 top-2"></div>
                <div className="text-xs text-gray-500 mb-2 font-light tracking-wider uppercase">Dec 2024 - May 2025</div>
                <h3 className="text-lg font-light text-white mb-2 tracking-wide">Software Engineer</h3>
                <p className="text-gray-400 mb-4 font-light text-sm">Instahyre</p>
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  Worked on bug fixes and feature development using Django and Angular. Enhanced application performance and user experience. Collaborated with cross-functional teams for system improvements.
                </p>
              </div>
              
              <div className="border-l border-gray-800 pl-8 relative">
                <div className="absolute w-2 h-2 bg-gray-600 rounded-full -left-1 top-2"></div>
                <div className="text-xs text-gray-500 mb-2 font-light tracking-wider uppercase">Jul 2024 - Dec 2024</div>
                <h3 className="text-lg font-light text-white mb-2 tracking-wide">Full Stack Developer</h3>
                <p className="text-gray-400 mb-4 font-light text-sm">Think41</p>
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  Worked on various GenAI projects involving SDLC automation, including PRD creation, user stories, OpenAPI development, and testing. Contributed to process optimization and faster product delivery through GenAI integration.
                </p>
              </div>
              
              <div className="border-l border-gray-800 pl-8 relative">
                <div className="absolute w-2 h-2 bg-gray-600 rounded-full -left-1 top-2"></div>
                <div className="text-xs text-gray-500 mb-2 font-light tracking-wider uppercase">Aug 2020 - Jun 2024</div>
                <h3 className="text-lg font-light text-white mb-2 tracking-wide">B.E. in Computer Science</h3>
                <p className="text-gray-400 mb-4 font-light text-sm">KLE Technological University</p>
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  Hubli, India
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-8 max-w-4xl mx-auto">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-extralight mb-16 text-gray-200 tracking-tight">Connect</h2>
            
            <div className="max-w-2xl">
              <p className="text-lg text-gray-300 mb-12 leading-relaxed font-light">
                Looking to connect, discuss ideas, or explore potential collaborations? Feel free to reach out—I'm always open to new opportunities and engaging conversations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <a
                  href="mailto:kfayaz1407@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-light">kfayaz1407@gmail.com</span>
                </a>

                <a
                  href="https://x.com/fayaxtwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-light">X</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>

                <a
                  href="https://github.com/K-Fayaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-light">Github</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>

                <a
                  href="https://peerlist.io/fayaz_3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <svg className='group-hover:scale-110 transition-transform duration-300' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C2.667 0 0 2.667 0 12s2.673 12 12 12s12-2.667 12-12S21.327 0 12 0zm8.892 20.894c-1.57 1.569-4.247 2.249-8.892 2.249s-7.322-.68-8.892-2.25C1.735 19.522 1.041 17.3.89 13.654A39.74 39.74 0 0 1 .857 12c0-1.162.043-2.201.13-3.13c.177-1.859.537-3.278 1.106-4.366c.284-.544.62-1.006 1.013-1.398s.854-.729 1.398-1.013C5.592 1.524 7.01 1.164 8.87.988C9.799.9 10.838.858 12 .858c4.645 0 7.322.68 8.892 2.248c1.569 1.569 2.25 4.246 2.25 8.894s-.681 7.325-2.25 8.894zM20.538 3.46C19.064 1.986 16.51 1.357 12 1.357c-4.513 0-7.067.629-8.54 2.103C1.986 4.933 1.357 7.487 1.357 12c0 4.511.63 7.065 2.105 8.54C4.936 22.014 7.49 22.643 12 22.643s7.064-.629 8.538-2.103c1.475-1.475 2.105-4.029 2.105-8.54s-.63-7.065-2.105-8.54zM14.25 16.49a6.097 6.097 0 0 1-2.442.59v2.706H10.45v.357H6.429V5.57h.357V4.214h5.676c3.565 0 6.467 2.81 6.467 6.262c0 2.852-1.981 5.26-4.68 6.013zm-1.788-8.728H10.45v5.428h2.011c1.532 0 2.802-1.2 2.802-2.714s-1.27-2.714-2.802-2.714zm.901 4.351c.117-.239.186-.502.186-.78c0-1.01-.855-1.857-1.945-1.857h-.296V8.62h1.154c1.09 0 1.945.847 1.945 1.857c0 .705-.422 1.323-1.044 1.637zm4.104 1.493c.043-.063.083-.129.123-.194a5.653 5.653 0 0 0 .526-1.103a5.56 5.56 0 0 0 .11-.362c.02-.076.042-.15.06-.227a5.58 5.58 0 0 0 .073-.41c.01-.068.025-.134.032-.203c.024-.207.038-.417.038-.63c0-3.198-2.687-5.763-5.967-5.763H7.286v14.572h4.022v-3.048h1.154c1.43 0 2.747-.488 3.778-1.303a5.92 5.92 0 0 0 .46-.406c.035-.034.066-.07.1-.105c.107-.11.21-.22.308-.337c.044-.053.084-.108.126-.162c.081-.104.16-.21.233-.319zm-5.005 1.775H10.45v3.048H8.143V5.57h4.319c2.837 0 5.11 2.211 5.11 4.905s-2.273 4.905-5.11 4.905z"/></svg>
                  <span className="text-sm font-light">Peerlist</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>

                <a
                  href="https://linkedin.com/in/fayaz-k-769b68225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-light">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MePage;
