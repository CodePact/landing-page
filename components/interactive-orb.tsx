"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function InteractiveOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
      "/texture.png",
      () => {
        texture.needsUpdate = true;
      },
      undefined,
      (error: unknown) => {
        console.error("Failed to load orb texture", error);
      },
    );

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const geometry = new THREE.SphereGeometry(1.4, 128, 128);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture,
        },
        uTime: {
          value: 0,
        },
      },

      vertexShader: `
        varying vec3 vObjectNormal;
        varying vec3 vSurfacePosition;

        uniform float uTime;

        void main() {
          vec3 direction = normalize(position);
          float waveA = sin(position.x * 3.7 + uTime * 0.72);
          float waveB = sin(position.y * 5.1 - uTime * 0.58);
          float waveC = sin(position.z * 4.3 + uTime * 0.91);
          float waveD = sin((position.x + position.z) * 6.0 - uTime * 0.43);
          float displacement =
            (waveA * waveB * 0.55 + waveC * 0.3 + waveD * 0.15) * 0.018;
          vec3 displacedPosition = position + direction * displacement;

          vObjectNormal = normalize(normal + direction * displacement * 0.45);
          vSurfacePosition = displacedPosition;

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(displacedPosition, 1.0);
        }
      `,

      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;

        varying vec3 vObjectNormal;
        varying vec3 vSurfacePosition;

        void main() {
          vec3 normal = normalize(vObjectNormal);

          vec2 sphereUV =
            normal.xy * 0.5 + 0.5;

          vec2 cropMin =
            vec2(
              138.0 / 1024.0,
              1.0 - (887.0 / 1024.0)
            );

          vec2 cropMax =
            vec2(
              885.0 / 1024.0,
              1.0 - (134.0 / 1024.0)
            );

          vec2 textureUV =
            mix(
              cropMin,
              cropMax,
              sphereUV
            );

          vec2 textureDistortion = vec2(
            sin(vSurfacePosition.y * 5.0 + vSurfacePosition.z * 2.0 + uTime * 0.62) * 0.006,
            sin(vSurfacePosition.x * 4.0 - vSurfacePosition.z * 3.0 - uTime * 0.48) * 0.006
          );

          textureUV += textureDistortion;

          vec4 color =
            texture2D(
              uTexture,
              textureUV
            );

          float backLight =
            normal.z * 0.15 + 0.85;

          color.rgb *= backLight;

          gl_FragColor = color;
        }
      `,
      transparent: true,
    });

    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    const glowGeometry = new THREE.SphereGeometry(1.54, 64, 64);

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: {
          value: new THREE.Color(0x1976ff),
        },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDirection;

        void main() {
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

          vNormal = normalize(normalMatrix * normal);
          vViewDirection = normalize(-modelViewPosition.xyz);

          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;

        varying vec3 vNormal;
        varying vec3 vViewDirection;

        void main() {
          float rim = 1.0 - abs(dot(vNormal, vViewDirection));
          float softGlow = pow(clamp(rim, 0.0, 1.0), 3.8);
          float outerRim = pow(clamp(rim, 0.0, 1.0), 1.0);
          float intensity = softGlow * 0.01 + outerRim * 0.02;

          gl_FragColor = vec4(glowColor, intensity * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);

    scene.add(glow);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    controls.enablePan = false;

    controls.minDistance = 5;
    controls.maxDistance = 6;

    controls.enableZoom = false;

    let animationFrameId: number;
    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      timer.update();

      material.uniforms.uTime.value = timer.getElapsed();

      sphere.rotation.y += 0.0015;
      sphere.rotation.x += 0.0003;

      glow.rotation.copy(sphere.rotation);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;

      const height = container.clientHeight;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);

      resizeObserver.disconnect();

      controls.dispose();

      geometry.dispose();
      material.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      texture.dispose();

      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="interactive-orb" />;
}
