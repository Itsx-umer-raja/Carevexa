"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * WebGL ripple background — adapted from the provided RippleDisplacementSlider.
 * Full-bleed, auto-cycling, text-free. Sits behind hero content as a living backdrop.
 */

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform float uWaveFreq;
uniform float uWavePow;
uniform float uWaveWidth;
uniform float uFalloff;
uniform float uBoostStrength;
uniform float uCrossfadeWidth;
varying vec2 vUv;

vec2 coverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
  float screenAspect = screenRes.x / screenRes.y;
  float imgAspect = imgRes.x / imgRes.y;
  vec2 scale = vec2(1.0);
  if (screenAspect > imgAspect) { scale.y = imgAspect / screenAspect; }
  else { scale.x = screenAspect / imgAspect; }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  float aspectRatio = uResolution.y / uResolution.x;
  vec2 coord = vec2(vUv.x, vUv.y * aspectRatio);
  vec2 center = vec2(0.5, 0.5 * aspectRatio);

  float dist = distance(coord, center);
  float time = uProgress;
  vec2 displaced = coord;
  float brightness = 0.0;
  float blend = 0.0;

  if (time > 0.001) {
    float trailing = dist - time;
    if (trailing < uWaveWidth && trailing < 0.0) {
      float age = -trailing;
      float decay = exp(-age * uFalloff);
      float wave = sin(age * uWaveFreq) * decay;
      vec2 direction = normalize(coord - center);
      displaced += direction * wave * uWavePow;
      brightness = abs(wave) * uBoostStrength * decay;
    }
    blend = smoothstep(0.0, uCrossfadeWidth, -trailing);
  }

  vec2 finalUv = vec2(displaced.x, displaced.y / aspectRatio);
  vec2 imageUv = coverUv(finalUv, uResolution, uImageRes);

  vec4 currentColor = texture2D(uTexCurrent, imageUv);
  vec4 nextColor = texture2D(uTexNext, imageUv);
  vec4 color = mix(currentColor, nextColor, blend);
  color.rgb += color.rgb * brightness;
  gl_FragColor = color;
}
`;

const cfg = {
  waveFreq: 22.0,
  wavePow: 0.03,
  waveWidth: 0.5,
  falloff: 9.0,
  boostStrength: 0.4,
  crossfadeWidth: 0.06,
  duration: 1.6,
  ease: "power2.inOut",
};

const DEFAULT_IMAGES = ["/img/bg-1.png", "/img/bg-2.png", "/img/bg-3.png"];

export function RippleBackground({
  className,
  images = DEFAULT_IMAGES,
  interval = 6000,
}: {
  className?: string;
  images?: string[];
  interval?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x04100f, 1);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const textures = images.map((src) => {
      const t = loader.load(src);
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      return t;
    });

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexCurrent: { value: textures[0] },
        uTexNext: { value: textures[1 % textures.length] },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(w, h) },
        uImageRes: { value: new THREE.Vector2(1920, 1080) },
        uWaveFreq: { value: cfg.waveFreq },
        uWavePow: { value: cfg.wavePow },
        uWaveWidth: { value: cfg.waveWidth },
        uFalloff: { value: cfg.falloff },
        uBoostStrength: { value: cfg.boostStrength },
        uCrossfadeWidth: { value: cfg.crossfadeWidth },
      },
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(mesh);

    let endValue = 1.2;
    const resize = () => {
      const cw = container.clientWidth || window.innerWidth;
      const ch = container.clientHeight || window.innerHeight;
      renderer.setSize(cw, ch, false);
      material.uniforms.uResolution.value.set(cw, ch);
      const ratio = ch / cw;
      const maxDist = Math.sqrt(0.25 + 0.25 * ratio * ratio);
      endValue = maxDist + cfg.waveWidth;
    };
    resize();
    window.addEventListener("resize", resize);

    const renderTick = () => renderer.render(scene, camera);
    gsap.ticker.add(renderTick);

    let index = 0;
    let transitioning = false;
    const advance = () => {
      if (transitioning || reduced) return;
      transitioning = true;
      const next = (index + 1) % textures.length;
      material.uniforms.uTexNext.value = textures[next];
      gsap.to(material.uniforms.uProgress, {
        value: endValue,
        duration: cfg.duration,
        ease: cfg.ease,
        onComplete: () => {
          material.uniforms.uTexCurrent.value = textures[next];
          material.uniforms.uProgress.value = 0;
          index = next;
          transitioning = false;
        },
      });
    };

    const timer = window.setInterval(advance, interval);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(renderTick);
      renderer.dispose();
      mesh.geometry.dispose();
      material.dispose();
      textures.forEach((t) => t.dispose());
    };
  }, [images, interval]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 h-full w-full", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default RippleBackground;
