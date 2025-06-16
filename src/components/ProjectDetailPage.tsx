import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBar';
import ProjectSeed from "../seed/ProjectSeed.js";
import type { Section, SectionContent, IdeaContent, StackContent, ProjectMeta, Feature } from '../seed/ProjectSeed.d';

const ProjectDetailPage: React.FC = () => {
  const { month } = useParams<{ month: string }>();
  const [activeSection,setActiveSection] = useState('idea');
  const navigate = useNavigate();

  const validMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (!month || !validMonths.includes(month)) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        404 - Project Not Found!
      </div>
    );
  }

  // Type guard to check if month exists in ProjectSeed
  if (!ProjectSeed[month]) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        No project data available for {month}.
      </div>
    );
  }

  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; 

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current && heroRef.current) {
      const totalOffset = headerRef.current.offsetHeight + heroRef.current.offsetHeight + 100; // Adding some padding
      setOffset(totalOffset);
    }
  }, []);

  const projectData = ProjectSeed[month].meta as ProjectMeta;
  const sections = ProjectSeed[month].content as Section[];
  
  const isIdeaContent = (content: SectionContent): content is IdeaContent => {
    return content && typeof content === 'object' && 'overview' in content && 'features' in content;
  };

  const isStackContent = (content: SectionContent): content is StackContent => {
    return content && typeof content === 'object' && 'stack' in content;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="ml-3 md:ml-20 min-h-screen pt-24 px-4 md:px-8 pb-16 text-white">
      {/* Back Button */}
      <div ref={headerRef} className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate('/12n12')}
          className="text-gray-400 hover:text-white transition-colors flex items-center group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to 12N12
        </button>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative max-w-4xl mx-auto mb-12">
        <div className='sticky top-0 z-50'>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
            <h1 className="text-3xl font-light mb-2 md:mb-0">{projectData.title}</h1>
            <a href={projectData.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors text-base flex items-center group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="ml-2 group-hover:underline">Live</span>
            </a>
          </div>
          <p className="text-gray-400 text-base mb-8">{projectData.tagline}</p>
        </div>

        {/* Placeholder for other sections (Problem, Solution, etc.) */}
        <div className="relative mx-auto mt-12 text-gray-400">
          {/* <p>More details about the project will go here...</p> */}
          {/* <ScrollProgressBar sections={sections} activeSection={activeSection} onSectionClick={scrollToSection}/> */}

          {
            sections.map((item: Section, index: number) => {
              return(
                <section 
                  key={item.id}
                  id={item.id} 
                  className={`flex items-start mx-auto mb-7`}
                  style={{minHeight: `calc(100vh - ${offset}px)`}}
                >
                  <div className="w-full">
                    <div className="">
                      <h1 className="text-3xl md:text-4xl font-extralight mb-4 leading-tight tracking-tight">
                        {item.label}
                      </h1>
                    </div>
                    
                    <div className=" ">
                      {item.id === 'idea' && item.content && isIdeaContent(item.content) ? (
                        <div className="space-y-6">
                          <p className="text-lg text-gray-400 leading-relaxed font-light">
                            {item.content.overview}
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            {item.content.features.map((feature: Feature, idx: number) => (
                              <li key={idx} className="text-gray-400">
                                <span className="font-medium text-gray-400 ">{feature.feature}</span> - {feature.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : item.id === 'stack' && item.content && isStackContent(item.content) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {item.content.stack.map((tech: string, idx: number) => (
                            <div key={idx} className="flex items-center">
                              <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                              <span className="text-gray-300">{tech}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;