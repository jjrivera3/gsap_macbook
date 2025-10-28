import React, { useRef } from "react";
import { PresentationControls } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";

gsap.registerPlugin(useGSAP);

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const setMeshesOpacity = (group, opacity) => {
  if (!group) return;
  group.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.transparent = true;
      gsap.set(child.material, { opacity });
    }
  });
};

const fadeMeshes = (group, opacity) => {
  if (!group) return;
  group.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group, x, immediate = false) => {
  if (!group) return;
  if (immediate) {
    gsap.set(group.position, { x });
  } else {
    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
  }
};

const ModelSwitcher = ({ rawScale, displayScale, isMobile }) => {
  const smallRef = useRef();
  const largeRef = useRef();
  const didInit = useRef(false);

  // Treat >= 0.095 as 16", otherwise 14"
  const showLargeMacbook = rawScale >= 0.095;

  // Always start on the 14" small model
  useGSAP(() => {
    moveGroup(smallRef.current, 0, true);
    moveGroup(largeRef.current, -OFFSET_DISTANCE, true);
    setMeshesOpacity(smallRef.current, 1);
    setMeshesOpacity(largeRef.current, 0);
    didInit.current = true;
  }, []);

  // Animate when selection changes
  useGSAP(
    () => {
      if (!didInit.current) return;

      if (showLargeMacbook) {
        moveGroup(smallRef.current, -OFFSET_DISTANCE);
        moveGroup(largeRef.current, 0);
        fadeMeshes(smallRef.current, 0);
        fadeMeshes(largeRef.current, 1);
      } else {
        moveGroup(smallRef.current, 0);
        moveGroup(largeRef.current, OFFSET_DISTANCE);
        fadeMeshes(smallRef.current, 1);
        fadeMeshes(largeRef.current, 0);
      }
    },
    { dependencies: [showLargeMacbook] }
  );

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <PresentationControls {...controlsConfig}>
      <group>
        <group ref={largeRef}>
          <MacbookModel16
            scale={isMobile ? displayScale - 0.02 : displayScale}
          />
        </group>
        <group ref={smallRef}>
          <MacbookModel14
            scale={isMobile ? displayScale - 0.05 : displayScale - 0.02}
          />
        </group>
      </group>
    </PresentationControls>
  );
};

export default ModelSwitcher;
