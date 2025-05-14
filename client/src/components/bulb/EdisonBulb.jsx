



import React, { useRef, useEffect, useState, useMemo, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useToggleLight } from "./useToggleLight";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const EdisonBulb = forwardRef(({ textRef, ...props }, externalRef) => {
  const { scene } = useGLTF("/models/edison_light_bulb_4.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.cursor = "pointer";
        child.onPointerEnter = handlePointerEnter;
        child.onPointerLeave = handlePointerLeave;
      }
    });
  }, [scene]);

  const bulbRef = useRef();
  const [initialAnimationPlayed, setInitialAnimationPlayed] = useState(false);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const bulbBoundingBox = useMemo(() => new THREE.Box3().setFromObject(scene), [scene]);
  const bulbHeight = bulbBoundingBox.max.y - bulbBoundingBox.min.y;

  const { handleClick: toggleLight, isOn } = useToggleLight(scene, bulbHeight);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (externalRef) {
      externalRef.current = bulbRef.current;
    }
  }, [externalRef]);

  useEffect(() => {
    if (!bulbRef.current || initialAnimationPlayed) return;

    const bulb = bulbRef.current;
    bulb.position.set(0, 0, -400);
    bulb.rotation.set(0, 0, 0);

    gsap.to(bulb.position, {
      x: 0,
      y: 0,
      z: 0.4,
      duration: 2.5,
      ease: "power2.out",
    });

    gsap.to(bulb.rotation, {
      x: Math.PI / 2,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        setInitialAnimationPlayed(true);
      },
    });
  }, [initialAnimationPlayed]);

  useEffect(() => {
    if (!initialAnimationPlayed || !bulbRef.current) return;

    const bulb = bulbRef.current;
    let timeline;
    let rafId;

    const waitForZPosition = () => {
      const threshold = 0.4;
      const epsilon = 0.01;

      if (Math.abs(bulb.position.z - threshold) < epsilon) {
        const currentRot = {
          x: bulb.rotation.x,
          y: bulb.rotation.y,
          z: bulb.rotation.z,
        };

        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            markers: false,
          },
        });

        timeline.to(bulb.position, {
          x: 2.1,
          y: -1.3,
          z: 0.8,
          duration: 1,
          ease: "power2.out",
        });

        timeline.to(
          bulb.rotation,
          {
            x: 0.1,
            y: currentRot.y,
            z: currentRot.z,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );

        if (textRef && textRef.current) {
          timeline.fromTo(
            textRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
            "<0.2"
          );
        }

        ScrollTrigger.refresh();
      } else {
        rafId = requestAnimationFrame(waitForZPosition);
      }
    };

    rafId = requestAnimationFrame(waitForZPosition);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeline) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      }
    };
  }, [initialAnimationPlayed]);

  const handleBulbClick = () => {
    toggleLight();
  };

  const handlePointerEnter = () => {
    isHovered.current = true;
    if (bulbRef.current) {
      gsap.to(bulbRef.current.scale, {
        x: 0.33,
        y: 0.33,
        z: 0.33,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    if (bulbRef.current) {
      gsap.to(bulbRef.current.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  useFrame(() => {
    if (initialAnimationPlayed && bulbRef.current && !isHovered.current && !isDragging.current) {
      bulbRef.current.rotation.y += 0.035;
    }
  });

  useFrame(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.name === "filament") {
          child.material.emissive = new THREE.Color(isOn.current ? "yellow" : "black");
          child.material.emissiveIntensity = isOn.current ? 500 : 0;
        }
        if (child.material.name === "glass") {
          Object.assign(child.material, {
            transparent: true,
            transmission: 0.98,
            opacity: 0.5,
            roughness: 0.05,
            metalness: 0.7,
            clearcoat: 1,
            thickness: 0.05,
            side: THREE.DoubleSide,
            depthWrite: true,
            depthTest: true,
          });
        }
        if (child.material.name === "glass_thicker") {
          Object.assign(child.material, {
            transparent: true,
            depthWrite: true,
            depthTest: true,
            side: THREE.FrontSide,
            opacity: 0.9,
            renderOrder: 1,
          });
        }
      }
    });
  });

  return (
    <group
      ref={bulbRef}
      {...props}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={0.3}
      onClick={handleBulbClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <primitive object={scene} />
    </group>
  );
});

export default React.memo(EdisonBulb);
