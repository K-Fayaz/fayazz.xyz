declare module '*.glb' {
  const src: string;
  export default src;
}

// Provide minimal typings for GLTFLoader to satisfy TypeScript in this project
declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  import { Group, Loader } from 'three';

  export interface GLTF {
    scene: Group;
    [key: string]: any;
  }

  export class GLTFLoader extends Loader {
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: unknown) => void
    ): void;
  }
}

// If local tooling can't find 'three' types, fall back to any-typed module.
// Comment this out if your TypeScript setup already picks up three's bundled types.
declare module 'three';

declare module 'three/examples/jsm/loaders/KTX2Loader.js' {
  import { Loader, WebGLRenderer } from 'three';
  export class KTX2Loader extends Loader {
    setTranscoderPath(path: string): this;
    detectSupport(renderer: WebGLRenderer): this;
  }
}


