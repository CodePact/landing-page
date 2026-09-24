"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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

    const geometry = new THREE.SphereGeometry(1, 128, 128);

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
        varying float vRidge;

        uniform float uTime;

        float hash(vec3 point) {
          return fract(sin(dot(point, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
        }

        float noise(vec3 point) {
          vec3 cell = floor(point);
          vec3 local = fract(point);
          vec3 smoothLocal = local * local * (3.0 - 2.0 * local);

          return mix(
            mix(
              mix(hash(cell), hash(cell + vec3(1.0, 0.0, 0.0)), smoothLocal.x),
              mix(hash(cell + vec3(0.0, 1.0, 0.0)), hash(cell + vec3(1.0, 1.0, 0.0)), smoothLocal.x),
              smoothLocal.y
            ),
            mix(
              mix(hash(cell + vec3(0.0, 0.0, 1.0)), hash(cell + vec3(1.0, 0.0, 1.0)), smoothLocal.x),
              mix(hash(cell + vec3(0.0, 1.0, 1.0)), hash(cell + vec3(1.0, 1.0, 1.0)), smoothLocal.x),
              smoothLocal.y
            ),
            smoothLocal.z
          );
        }

        float fbm(vec3 point) {
          float value = 0.0;
          float amplitude = 0.5;

          for (int octave = 0; octave < 3; octave++) {
            value += noise(point) * amplitude;
            point = point * 2.03 + vec3(17.1, 31.7, 11.9);
            amplitude *= 0.5;
          }

          return value;
        }

        void main() {
          vec3 direction = normalize(position);
          vec3 drift = vec3(uTime * 0.045, -uTime * 0.03, uTime * 0.025);
          float macroShape = fbm(position * 1.8 + drift) - 0.45;
          float broadRidge = 1.0 - abs(fbm(position * 5.2 - drift) * 2.0 - 1.0);
          float fineRidge = 1.0 - abs(fbm(position * 10.0 + drift * 1.6) * 2.0 - 1.0);
          float ridgeMask = broadRidge * 0.72 + fineRidge * 0.28;
          float displacement =
            macroShape * 0.095 + broadRidge * 0.062 + fineRidge * 0.024 - 0.053;
          vec3 displacedPosition = position + direction * displacement;

          vObjectNormal = normalize(normal + direction * ridgeMask * 0.14);
          vSurfacePosition = displacedPosition;
          vRidge = ridgeMask;

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
        varying float vRidge;

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
            sin(vSurfacePosition.y * 5.0 + vSurfacePosition.z * 2.0 + uTime * 0.62) * 0.012,
            sin(vSurfacePosition.x * 4.0 - vSurfacePosition.z * 3.0 - uTime * 0.48) * 0.012
          );

          textureUV += textureDistortion;

          vec4 color =
            texture2D(
              uTexture,
              textureUV
            );

          float backLight =
            normal.z * 0.15 + 0.85;

          float ridgeLight = mix(0.64, 1.22, vRidge);

          color.rgb *= backLight * ridgeLight;

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

    const cometGeometry = new THREE.SphereGeometry(0.026, 12, 12);
    const cometConfigurations = [
      { radius: 1.08, speed: 0.48, phase: 2.0, tiltX: 0.05, tiltZ: 0.2 },
      { radius: 1.1, speed: 0.46, phase: 3.8, tiltX: 0.18, tiltZ: 0.75 },
      { radius: 1.06, speed: -0.58, phase: 1.9, tiltX: -0.6, tiltZ: -0.35 },
    ];

    const comets = cometConfigurations.map((configuration, index) => {
      const orbit = new THREE.Group();
      orbit.rotation.set(configuration.tiltX, 0, configuration.tiltZ);

      const cometMaterial = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0x6ee7ff : 0xb3d4ff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendEquation: THREE.AddEquation,
        depthWrite: false,
      });
      const comet = new THREE.Mesh(cometGeometry, cometMaterial);

      const trailPositions = new Float32Array(32 * 3);
      const trailGeometry = new THREE.BufferGeometry();
      const trailAttribute = new THREE.BufferAttribute(trailPositions, 3);
      trailGeometry.setAttribute("position", trailAttribute);

      const trailMaterial = new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? 0x42bfff : 0x8db7ff,
        transparent: true,
        opacity: 0.075,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendEquation: THREE.AddEquation,
        depthWrite: false,
      });
      const trail = new THREE.Line(trailGeometry, trailMaterial);

      orbit.add(trail, comet);
      scene.add(orbit);

      return {
        ...configuration,
        orbit,
        comet,
        cometMaterial,
        trail,
        trailGeometry,
        trailMaterial,
        trailAttribute,
      };
    });

    let animationFrameId: number;
    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      timer.update();

      material.uniforms.uTime.value = timer.getElapsed();

      const elapsed = timer.getElapsed();

      comets.forEach((comet) => {
        for (
          let segment = 0;
          segment < comet.trailAttribute.count;
          segment += 1
        ) {
          const angle =
            elapsed * comet.speed +
            comet.phase -
            segment * 0.095 * Math.sign(comet.speed);
          const offset = segment * 3;

          comet.trailAttribute.array[offset] = Math.cos(angle) * comet.radius;
          comet.trailAttribute.array[offset + 1] =
            Math.sin(angle) * comet.radius * 0.42;
          comet.trailAttribute.array[offset + 2] =
            Math.sin(angle) * comet.radius;
        }

        comet.trailAttribute.needsUpdate = true;
        comet.comet.position.set(
          comet.trailAttribute.array[0],
          comet.trailAttribute.array[1],
          comet.trailAttribute.array[2],
        );
      });

      sphere.rotation.y += 0.0015;
      sphere.rotation.x += 0.0003;

      glow.rotation.copy(sphere.rotation);

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

      geometry.dispose();
      material.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      cometGeometry.dispose();
      comets.forEach((comet) => {
        comet.cometMaterial.dispose();
        comet.trailGeometry.dispose();
        comet.trailMaterial.dispose();
      });

      texture.dispose();

      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="interactive-orb" />;
}
