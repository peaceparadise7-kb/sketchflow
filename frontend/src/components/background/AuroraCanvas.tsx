import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AuroraCanvasProps {
  subdued?: boolean;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uSubdued;

  varying vec2 vUv;

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    mat2 rot = rotate2D(0.5);

    for (int i = 0; i < 5; i++) {
      total += amplitude * noise(p);
      p = rot * p * 2.02 + vec2(0.15);
      amplitude *= 0.5;
    }
    return total;
  }

  // Domain-Warped Organic Aurora Curtain Shader (Nimitz/IQ algorithm)
  float auroraCurtain(vec2 uv, float time) {
    // Domain Warp Layer 1
    vec2 q = vec2(
      fbm(uv + vec2(0.0, time * 0.03)),
      fbm(uv + vec2(5.2, 1.3 - time * 0.02))
    );

    // Domain Warp Layer 2 (creates curved organic folds & silk ribbon loops)
    vec2 r = vec2(
      fbm(uv + 3.5 * q + vec2(1.7, 9.2) + time * 0.015),
      fbm(uv + 3.5 * q + vec2(8.3, 2.8) - time * 0.02)
    );

    float f = fbm(uv + 4.0 * r);
    float curtain = pow(clamp(f * 1.6 - 0.2, 0.0, 1.0), 3.0);
    return curtain;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    st.x += uMouse.x * 0.003;
    st.y += uMouse.y * 0.003;

    vec2 uv = st * 1.8;
    uv.y -= 0.2; // Move aurora into upper sky

    float time = uTime * 0.025;

    // Deep night sky background (almost black with slight arctic blue gradient)
    vec3 skyBg = mix(vec3(0.008, 0.015, 0.035), vec3(0.018, 0.028, 0.06), st.y + 0.5);

    // Upper sky curtain envelope
    float curtainEnvelope = smoothstep(-0.8, -0.1, st.y) * smoothstep(0.9, 0.2, st.y);

    vec3 auroraAccum = vec3(0.0);

    // 4 Translucent Depth Layers of Volumetric Ribbons
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float depthScale = 1.0 + fi * 0.35;
      vec2 layerUv = uv * depthScale + vec2(fi * 1.3, -fi * 0.4);

      float density = auroraCurtain(layerUv, time + fi * 0.7);

      // Vertical silk striations
      float striation = sin(layerUv.x * 25.0 + density * 6.0) * 0.5 + 0.5;
      striation = pow(striation, 2.0);
      density *= (0.6 + 0.4 * striation);

      float layerIntensity = density * curtainEnvelope * (0.35 / (fi * 0.6 + 1.0));

      // Physically-Inspired Palette: Emerald Green, Northern Green, Cyan/Teal, Deep Blue, Violet top scatter
      vec3 emeraldGreen  = vec3(0.015, 0.74, 0.45);
      vec3 northernGreen = vec3(0.02, 0.82, 0.52);
      vec3 cyanTeal      = vec3(0.02, 0.60, 0.68);
      vec3 deepBlue      = vec3(0.08, 0.16, 0.55);
      vec3 violetScatter = vec3(0.44, 0.18, 0.82);

      vec3 curtainColor = mix(emeraldGreen, northernGreen, density);
      curtainColor = mix(curtainColor, cyanTeal, smoothstep(0.3, 0.8, density));
      curtainColor = mix(curtainColor, deepBlue, (1.0 - density) * 0.4);

      float violetEdge = smoothstep(0.4, 0.8, st.y + density * 0.2);
      curtainColor = mix(curtainColor, violetScatter, violetEdge * 0.35);

      auroraAccum += curtainColor * layerIntensity;
    }

    float brightnessScale = uSubdued > 0.5 ? 0.35 : 0.80;
    auroraAccum *= brightnessScale;

    vec3 finalColor = skyBg + auroraAccum;
    finalColor = clamp(finalColor, vec3(0.008), vec3(0.85));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const AuroraCanvas: React.FC<AuroraCanvasProps> = ({ subdued = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    const startTime = Date.now();

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance',
        precision: 'mediump',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to CSS background:', e);
      setWebglError(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSubdued: { value: subdued ? 1.0 : 0.0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      uniforms.uMouse.value.set(x, y);
    };

    const handleResize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      setWebglError(true);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('webglcontextlost', handleContextLost, false);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      if (!isTabActive || !renderer) return;

      const elapsedTime = (Date.now() - startTime) / 1000;
      uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (domElement) {
        domElement.removeEventListener('webglcontextlost', handleContextLost);
      }

      geometry.dispose();
      material.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [subdued]);

  if (webglError) {
    return (
      <div className="fixed inset-0 bg-slate-950 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-emerald-950/20 via-indigo-950/15 to-transparent blur-[120px]" />
      </div>
    );
  }

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default AuroraCanvas;
