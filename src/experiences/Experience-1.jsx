import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";

/*
Rewrote https://github.com/Qianqianye/Everyday/blob/master/Day01/rotating_geometry.js in r3f.
Added fade in opacity.
Added Debug controls.
*/

const DEBUG_DEFAULT_CONTROLS = {
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
  hasEntropy: { value: false, label: "has entropy" },
};

const Experience = () => {
  const octahedronRef = useRef();
  const octahedronInitialPositionRef = useRef();
  const initialOpacity = useFadeInOpacity();
  const { radius, opacity, wireframe, hasEntropy } = useControls({
    ...DEBUG_DEFAULT_CONTROLS,
    resetVertexPositions: button(() => {
      const { geometry } = octahedronRef.current;
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(octahedronInitialPositionRef.current), 3)
      );
    }, {
      label: "reset vertex positions",
    }),
  });
  useEffect(() => {
    const { geometry } = octahedronRef.current;
    const vertices = geometry.attributes.position.array;
    octahedronInitialPositionRef.current = [...vertices];
  }, []);
  useFrame(() => {
    octahedronRef.current.rotation.x = Date.now() * 0.0005;
    octahedronRef.current.rotation.y = Date.now() * 0.0002;
    octahedronRef.current.rotation.z = Date.now() * 0.001;
    const { geometry } = octahedronRef.current;
    const vertices = geometry.attributes.position.array;
    if (hasEntropy) {
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        vertices[i * 3 + 0] += 0 - Math.sin(Date.now()) * 7;
        vertices[i * 3 + 1] += 0 - Math.sin(Date.now()) * 7;
        vertices[i * 3 + 2] += 0 - Math.cos(Date.now()) * 7;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });
  return (
    <>
      <OrbitControls makeDefault />
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

/*
Unnecessary but just wanted to fade in mesh.
*/
const useFadeInOpacity = () => {
  const timeoutRef = useRef();
  const [initialOpacity, setInitialOpacity] = useState(0);
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
  return initialOpacity;
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
