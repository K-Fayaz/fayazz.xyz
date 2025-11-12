import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBar';
import ProjectSeed from "../seed/ProjectSeed.js";
import type { Section, SectionContent, IdeaContent, StackContent, ProjectMeta, Feature } from '../seed/ProjectSeed.d';
import MoonImage from '../assets/moon.png';
import StarField from './StarField';
import song from '../assets/Co2.mp3';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import MoonGlb from '../assets/moon.glb';

// Simple 3D Moon component rendered with Three.js
class KHRMaterialsPBRSpecularGlossinessExtension {
  private parser: any;
  private readonly name = 'KHR_materials_pbrSpecularGlossiness';

  constructor(parser: any) {
    this.parser = parser;
  }

  getMaterialType(materialIndex: number) {
    const materialDef = this.parser.json.materials?.[materialIndex];
    if (!materialDef || !materialDef.extensions || !materialDef.extensions[this.name]) {
      return null;
    }
    return THREE.MeshPhongMaterial;
  }

  extendMaterialParams(materialIndex: number, materialParams: any) {
    const materialDef = this.parser.json.materials?.[materialIndex];
    if (!materialDef || !materialDef.extensions) {
      return Promise.resolve();
    }

    const extension = materialDef.extensions[this.name];
    if (!extension) {
      return Promise.resolve();
    }

    const pending: Promise<unknown>[] = [];

    const diffuseFactor = extension.diffuseFactor ?? [1, 1, 1, 1];
    materialParams.color = new THREE.Color(diffuseFactor[0], diffuseFactor[1], diffuseFactor[2]);
    materialParams.opacity = diffuseFactor[3];
    materialParams.transparent = materialParams.opacity < 0.999;

    const specularFactor = extension.specularFactor ?? [1, 1, 1];
    materialParams.specular = new THREE.Color(specularFactor[0], specularFactor[1], specularFactor[2]);

    const glossinessFactor = extension.glossinessFactor ?? 1;
    materialParams.shininess = glossinessFactor * 100;

    if (extension.diffuseTexture) {
      pending.push(this.parser.assignTexture(materialParams, 'map', extension.diffuseTexture));
    }

    if (extension.specularGlossinessTexture) {
      // Reuse texture for specular; glossiness map is approximated via specular map
      pending.push(
        this.parser.assignTexture(materialParams, 'specularMap', extension.specularGlossinessTexture)
      );
    }

    return Promise.all(pending);
  }
}

const Moon3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>();
  const sceneRef = useRef<any>();
  const cameraRef = useRef<any>();
  const moonRef = useRef<any>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(5, 3, 5);
    scene.add(directional);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Ensure correct color space for GLTF textures
    // @ts-ignore three types may vary across versions
    renderer.outputColorSpace = (THREE as any).SRGBColorSpace ?? (THREE as any).sRGBEncoding;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load GLB
    const loader = new GLTFLoader();
    loader.register((parser: any) => new KHRMaterialsPBRSpecularGlossinessExtension(parser));
    // Support KTX2 compressed textures if present in the GLB
    try {
      const ktx2 = new KTX2Loader()
        .setTranscoderPath('https://unpkg.com/three@0.181.0/examples/jsm/libs/basis/')
        .detectSupport(renderer);
      loader.setKTX2Loader(ktx2);
    } catch {
      // If KTX2 loader setup fails, continue without it
    }
    loader.load(
      MoonGlb,
      (gltf: GLTF) => {
        const root = gltf.scene;
        // Normalize and scale to fit nicely
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.3; // slight increase while avoiding clipping
        const scale = targetSize / maxAxis;
        root.scale.setScalar(scale);
        // Center it
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center.multiplyScalar(scale));
        scene.add(root);
        moonRef.current = root;
      },
      undefined,
      () => {
        // On error we render nothing; keep failure silent on 404 page
      }
    );

    // Animate
    const animate = () => {
      if (moonRef.current) {
        moonRef.current.rotation.y += 0.0025;
        moonRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.05;
      }
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentElement) {
          rendererRef.current.domElement.parentElement.removeChild(rendererRef.current.domElement);
        }
      }
      // Dispose scene resources
      scene.traverse((obj: any) => {
        const mesh = obj as any;
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m: any) => m && m.dispose());
        } else if ((mesh as any).material) {
          ((mesh as any).material as any).dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-4 drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]"
      style={{ width: 420, height: 420 }}
      aria-label="3D Moon"
    />
  );
};

const ProjectNotFound: React.FC<{ message: string }> = ({ message }) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const sessionKey = '404-song-played';
    const hasPlayed = sessionStorage.getItem(sessionKey) === 'true';
    if (hasPlayed) {
      setHasPlayedThisSession(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setShowAudioPlayer(true);
    }, 25000); // Reverted to 45 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showAudioPlayer && audioRef.current && !hasPlayedThisSession) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented by the browser:", error);
        });
      }
    }
  }, [showAudioPlayer, hasPlayedThisSession]);

  const handleDismissAudio = () => {
    setShowAudioPlayer(false);
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    setShowAudioPlayer(false);
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
  };
  
  // Function that runs when song starts playing
  const handleSongStart = async () => {
    const ENV = "PRODUCTION";
    const now = new Date();
    const readableDate = now.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    let formId = 'mqabvkqr';
    try {
      await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'media_load',
          env: ENV,
          status: 'ok',
          message: `Analytics beacon sent [${readableDate}] - ${ENV}`,
          timestamp: readableDate
        })
      });
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <StarField is404Effect={true} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-[10rem] font-bold relative -mr-[40px]">4</span>
          {/* <img src={MoonImage} alt="Moon" className="w-70 h-70 mx-4 drop-shadow-[0_0_80px_rgba(255,255,255,0.7)]" /> */}
          <Moon3D />
          <span className="text-[10rem] font-bold relative -ml-[40px]">4</span>
        </div>
        <span className="mt-8 text-4xl">{message}</span>
        
        {showAudioPlayer && !hasPlayedThisSession && (
          <div className="fixed bottom-10 left-10 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 animate-fade-in w-64 shadow-lg">
            <button
              onClick={handleDismissAudio}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-center">
                🎵 You've been here for a while... <br />
                Here's a song for you! 🎵
              </p>
              <audio 
                ref={audioRef}
                controls
                onEnded={handleAudioEnded}
                onPlay={handleSongStart}
                className="w-full"
              >
                <source src={song} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectDetailPage: React.FC = () => {
  const { month } = useParams<{ month: string }>();
  const [activeSection,setActiveSection] = useState('idea');
  const navigate = useNavigate();

  const validMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (!month || !validMonths.includes(month)) {
    return <ProjectNotFound message="Project Not Found!" />;
  }

  if (!ProjectSeed[month]) {
    return <ProjectNotFound message={`No project data available for ${month}.`} />;
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
            {
              projectData.link ? <a href={projectData.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors text-base flex items-center group">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="ml-2 group-hover:underline">Live</span>
                </a> : 
                <div className=''>
                  <div>
                    <p rel="noopener noreferrer" className="text-orange-400 transition-colors text-base flex items-center group">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    <span className="ml-2">In Development</span>
                  </p>
                  </div>
                  {
                    projectData.prototypeLink && (
                      <div className='text-right'>
                        <a href={projectData.prototypeLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors text-base inline-block px-3 py-1 rounded group">
                          <span className="group-hover:underline">Prototype</span>
                        </a>
                      </div>
                    )
                  }
                </div>
            }
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
                      {((item.id === 'idea' || item.id === 'problem') && item.content && 'overview' in item.content) ? (
                        <div className="space-y-6">
                          <p className="text-lg text-gray-400 leading-relaxed font-light">
                            {item.content.overview}
                          </p>
                          {'features' in item.content && Array.isArray(item.content.features) && item.content.features.length > 0 && (
                            <ul className="list-disc pl-5 space-y-2">
                              {item.content.features.map((feature: Feature, idx: number) => (
                                <li key={idx} className="text-gray-400">
                                  <span className="font-medium text-gray-400 ">{feature.feature}</span> - {feature.text}
                                </li>
                              ))}
                            </ul>
                          )}
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