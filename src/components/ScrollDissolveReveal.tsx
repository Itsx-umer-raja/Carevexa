"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll-driven dissolve reveal — adapted from the provided ScrollDissolveReveal. */

const coverVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coverFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;
  mat3 sobelX = mat3(-1.0,0.0,1.0,-2.0,0.0,2.0,-1.0,0.0,1.0);
  mat3 sobelY = mat3(-1.0,-2.0,-1.0,0.0,0.0,0.0,1.0,2.0,1.0);
  float lum(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }
  float sobel(sampler2D tex, vec2 uv, vec2 texel){
    float gx=0.0; float gy=0.0;
    for(int i=-1;i<=1;i++){ for(int j=-1;j<=1;j++){
      vec2 o=vec2(float(i),float(j))*texel;
      float l=lum(texture2D(tex,uv+o).rgb);
      gx+=l*sobelX[i+1][j+1]; gy+=l*sobelY[i+1][j+1];
    }}
    return sqrt(gx*gx+gy*gy);
  }
  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
    float a=hash(i); float b=hash(i+vec2(1.0,0.0));
    float c=hash(i+vec2(0.0,1.0)); float d=hash(i+vec2(1.0,1.0));
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }
  float fbm(vec2 p){
    float v=0.0; float a=0.5; float fq=1.0;
    for(int i=0;i<5;i++){ v+=a*noise(p*fq); a*=0.5; fq*=2.0; }
    return v;
  }
  void main(){
    vec2 ratio=vec2(
      min((uResolution.x/uResolution.y)/(uImageResolution.x/uImageResolution.y),1.0),
      min((uResolution.y/uResolution.x)/(uImageResolution.y/uImageResolution.x),1.0)
    );
    vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
    vec4 texColor=texture2D(uTexture,uv);
    float g=lum(texColor.rgb);
    texColor.rgb=mix(texColor.rgb, vec3(g), uGrayscale);
    vec2 cUv=vUv-uCenter; float aspect=uResolution.x/uResolution.y; cUv.x*=aspect;
    float dist=length(cUv); float angle=atan(cUv.y,cUv.x);
    float ns=6.0;
    vec2 pUv=floor(vUv*uResolution/ns)*ns/uResolution;
    float blockNoise=fbm(pUv*100.0)*0.15;
    float angularNoise=fbm(vec2(angle*5.0,0.0))*0.15;
    float noisyDist=dist+blockNoise+angularNoise;
    float maxDist=length(vec2(aspect*0.5,0.5));
    float nd=noisyDist/maxDist;
    float threshold=uDissolve*1.5;
    vec2 texel=1.0/uResolution;
    float edge=clamp(pow(sobel(uTexture,uv,texel),0.7)*2.0,0.0,1.0);
    float dissolveMask=smoothstep(threshold-0.03,threshold,nd);
    vec3 edgeColor=vec3(1.0);
    vec3 baseColor=mix(texColor.rgb,vec3(0.0),uGrayscale);
    vec3 finalColor=baseColor;
    float edgeGlow=edge*uEdgeIntensity*2.0*(1.0+uGrayscale*3.0);
    finalColor+=edgeColor*edgeGlow*uEdgeBrightness;
    float ez=0.15*(1.0-uDissolve)+0.02;
    float edgeZone=smoothstep(threshold-ez,threshold-ez+0.04,nd)*smoothstep(threshold+0.02,threshold-0.02,nd);
    float sparkle=hash(floor(vUv*uResolution/4.0))*edgeZone;
    float eb=(1.0-uDissolve)*uEdgeBrightness*(1.0+uGrayscale*2.0);
    finalColor+=vec3(sparkle*3.0*eb);
    gl_FragColor=vec4(finalColor, dissolveMask*texColor.a);
  }
`;

const coverFragmentShaderReverse = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uEdgeIntensity;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;
  mat3 sobelX = mat3(-1.0,0.0,1.0,-2.0,0.0,2.0,-1.0,0.0,1.0);
  mat3 sobelY = mat3(-1.0,-2.0,-1.0,0.0,0.0,0.0,1.0,2.0,1.0);
  float lum(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }
  float sobel(sampler2D tex, vec2 uv, vec2 texel){
    float gx=0.0; float gy=0.0;
    for(int i=-1;i<=1;i++){ for(int j=-1;j<=1;j++){
      vec2 o=vec2(float(i),float(j))*texel;
      float l=lum(texture2D(tex,uv+o).rgb);
      gx+=l*sobelX[i+1][j+1]; gy+=l*sobelY[i+1][j+1];
    }}
    return sqrt(gx*gx+gy*gy);
  }
  void main(){
    vec2 ratio=vec2(
      min((uResolution.x/uResolution.y)/(uImageResolution.x/uImageResolution.y),1.0),
      min((uResolution.y/uResolution.x)/(uImageResolution.y/uImageResolution.x),1.0)
    );
    vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
    vec4 texColor=texture2D(uTexture,uv);
    float g=lum(texColor.rgb);
    texColor.rgb=mix(texColor.rgb, vec3(g), uGrayscale);
    vec2 texel=1.0/uResolution;
    float edge=clamp(pow(sobel(uTexture,uv,texel),0.7)*2.0,0.0,1.0);
    vec3 baseColor=mix(texColor.rgb, vec3(0.0), uDarkness);
    baseColor+=vec3(1.0)*edge*uEdgeIntensity*2.0;
    gl_FragColor=vec4(clamp(baseColor,0.0,1.0), texColor.a);
  }
`;

interface SceneProps {
  imageFront: string;
  imageBack: string;
  scrollYProgress: { get: () => number };
}

const Scene = ({ imageFront, imageBack, scrollYProgress }: SceneProps) => {
  const [texture1, texture2] = useTexture([imageFront, imageBack]);
  const m1 = useRef<THREE.ShaderMaterial>(null);
  const m2 = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms1 = useMemo(
    () => ({
      uTexture: { value: texture1 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2((texture1.image as HTMLImageElement).width, (texture1.image as HTMLImageElement).height),
      },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uGrayscale: { value: 0.0 },
      uEdgeIntensity: { value: 0.0 },
      uEdgeBrightness: { value: 1.0 },
    }),
    [texture1, size]
  );

  const uniforms2 = useMemo(
    () => ({
      uTexture: { value: texture2 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2((texture2.image as HTMLImageElement).width, (texture2.image as HTMLImageElement).height),
      },
      uEdgeIntensity: { value: 0.6 },
      uDarkness: { value: 1.0 },
      uGrayscale: { value: 1.0 },
    }),
    [texture2, size]
  );

  useFrame(() => {
    const progress = scrollYProgress.get();
    if (m1.current) {
      m1.current.uniforms.uResolution.value.set(size.width, size.height);
      m1.current.uniforms.uDissolve.value = progress;
      m1.current.uniforms.uGrayscale.value = Math.min(1.0, progress / 0.4);
      m1.current.uniforms.uEdgeIntensity.value = progress * 0.5;
      m1.current.uniforms.uEdgeBrightness.value = 1.0 - progress;
    }
    if (m2.current) {
      m2.current.uniforms.uResolution.value.set(size.width, size.height);
      const acc = Math.min(1.0, progress * 1.1);
      m2.current.uniforms.uEdgeIntensity.value = 0.6 * (1.0 - acc);
      m2.current.uniforms.uDarkness.value = 1.0 - acc;
      m2.current.uniforms.uGrayscale.value = 1.0 - acc;
    }
  });

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={m2} vertexShader={coverVertexShader} fragmentShader={coverFragmentShaderReverse} uniforms={uniforms2} transparent />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={m1} vertexShader={coverVertexShader} fragmentShader={coverFragmentShader} uniforms={uniforms1} transparent />
      </mesh>
    </>
  );
};

export interface ScrollDissolveRevealProps {
  imageFront?: string;
  imageBack?: string;
  className?: string;
  containerClassName?: string;
}

export function ScrollDissolveReveal({
  imageFront = "/img/dissolve-front.png",
  imageBack = "/img/dissolve-back.png",
  className,
  containerClassName,
}: ScrollDissolveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={cn("relative h-[300vh] w-full", containerClassName)}>
      <div className={cn("sticky top-0 h-screen w-full", className)}>
        <Canvas>
          <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={0.1} far={10} position={[0, 0, 1]} />
          <React.Suspense fallback={null}>
            <Scene imageFront={imageFront} imageBack={imageBack} scrollYProgress={scrollYProgress} />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default ScrollDissolveReveal;
