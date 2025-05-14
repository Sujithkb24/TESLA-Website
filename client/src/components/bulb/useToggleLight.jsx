// useToggleLight.js
import { useRef, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function useToggleLight(scene) {
  const isOn = useRef(false);

  // Color constants for consistency
  const COLORS = {
    filament: 0xffdd88,
    innerGlow: 0xff9933,
    baseGlow: 0xffcc88,
    flare: 0xffbb66,
  };

  // Bright and long-reach lights
  const filamentLight = useMemo(
    () => new THREE.PointLight(COLORS.filament, 0, 150, 2),
    []
  );

  const innerGlowLight = useMemo(
    () => new THREE.PointLight(COLORS.innerGlow, 0, 6, 2),
    []
  );

  const baseGlowLight = useMemo(
    () => new THREE.PointLight(COLORS.baseGlow, 0, 4, 2),
    []
  );

  const filamentFlare = useMemo(() => {
    const flare = new THREE.SpotLight(COLORS.flare, 0, 8, Math.PI / 3, 0.4, 2);
    flare.castShadow = true;
    flare.shadow.mapSize.set(1024, 1024);
    return flare;
  }, []);

  // Attach lights to respective meshes
  useEffect(() => {
    const filament = scene.getObjectByName("filament");
    const glass = scene.getObjectByName("glassObj");

    if (!filament || !glass) {
      console.error("⛔ Meshes not found!", { filament, glass });
      return;
    }

    filamentLight.position.set(0, 0.03, 0);
    innerGlowLight.position.set(0, 0.035, 0);
    baseGlowLight.position.set(0, -0.05, 0);

    filament.add(filamentLight);
    filament.add(innerGlowLight);
    glass.add(baseGlowLight);

    const material = filament.material;
    if (material) {
      material.emissive = new THREE.Color(COLORS.flare);
      material.emissiveIntensity = 0;
    }

    return () => {
      filament.remove(filamentLight);
      filament.remove(innerGlowLight);
      glass.remove(baseGlowLight);
    };
  }, [scene, filamentLight, innerGlowLight, baseGlowLight]);

  // Toggle light function
  const handleClick = useCallback(() => {
    isOn.current = !isOn.current;
    const newState = isOn.current;

    const filament = scene.getObjectByName("filament");
    const mat = filament?.material;

    gsap.to(filamentLight, { intensity: newState ? 8 : 0, duration: 0.4 });
    gsap.to(innerGlowLight, { intensity: newState ? 10 : 0, duration: 0.4 });
    gsap.to(baseGlowLight, { intensity: newState ? 4 : 0, duration: 0.4 });

    if (mat) {
      gsap.to(mat, {
        emissiveIntensity: newState ? 3 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (newState) {
      if (filament) {
        filamentFlare.position.set(0, 0.04, 0.05);
        filament.add(filamentFlare);
        gsap.to(filamentFlare, { intensity: 500, duration: 0.6 });
      }
    } else {
      gsap.to(filamentFlare, {
        intensity: 0,
        duration: 0.5,
        onComplete: () => scene.remove(filamentFlare),
      });
    }
  }, [filamentLight, innerGlowLight, baseGlowLight, filamentFlare, scene]);

  return { handleClick, isOn };
}