import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import MoonGlb from '../assets/moon.glb';
import StarField from './StarField';
import song from '../assets/Co2.mp3';

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

const NotFoundPage: React.FC = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if we've already played the song this session
    const sessionKey = '404-song-played';
    const hasPlayed = sessionStorage.getItem(sessionKey) === 'true';
    
    if (hasPlayed) {
      setHasPlayedThisSession(true);
      return;
    }

    // Set up the 45-second timer
    timeoutRef.current = setTimeout(() => {
      setShowAudioPlayer(true);
    }, 25000); // 45 seconds

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    // Mark as played for this session
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
    
    // Stop the audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    setShowAudioPlayer(false);
    // Mark as played for this session
    sessionStorage.setItem('404-song-played', 'true');
    setHasPlayedThisSession(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <StarField is404Effect={true} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-[10rem] font-bold relative -mr-[40px]">4</span>
          <Moon3D />
          <span className="text-[10rem] font-bold relative -ml-[40px]">4</span>
        </div>
        <span className="mt-8 text-4xl">Page Not Found!</span>
        
        {/* Audio Player */}
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
                onPlay={handleSongStart}
                onEnded={handleAudioEnded}
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

export default NotFoundPage; 