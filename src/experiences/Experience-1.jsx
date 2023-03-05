import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const Experience = () => {
  const octahedronRef = useRef();
  const timeoutRef = useRef();
  const [initialOpacity, setInitialOpacity] = useState(0);
  const { radius, opacity, wireframe } = useControls({
    radius: {
      value: 150,
      step: 10,
      min: 50,
      max: 500,
    },
    opacity: {
      value: 1,
      min: 0,
      max: 1,
    },
    wireframe: true,
  });
  useFrame(() => {
    octahedronRef.current.rotation.x = Date.now() * 0.0005;
    octahedronRef.current.rotation.y = Date.now() * 0.0002;
    octahedronRef.current.rotation.z = Date.now() * 0.001;
  });
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (initialOpacity >= 1) {
        clearTimeout(timeoutRef.current);
        return;
      }
      setInitialOpacity(initialOpacity + 0.01);
    }, 100);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [initialOpacity]);

  return (
    <>
      <mesh ref={octahedronRef}>
        <octahedronGeometry args={[radius, 0]} />
        <meshNormalMaterial
          transparent
          wireframe={wireframe}
          shading={THREE.FlatShading}
          opacity={initialOpacity >= 1 ? opacity : initialOpacity}
        />
      </mesh>
    </>
  );
};

const ExperienceCanvas = () => (
  <Canvas
    camera={{
      fov: 50,
      near: 1,
      far: 10000,
      position: [0, 0, 500],
    }}
  >
    <Experience />
  </Canvas>
);

export default ExperienceCanvas;
