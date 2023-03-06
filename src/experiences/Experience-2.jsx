import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";


/*
Chat GPT Did this.
*/
function Star({ position }) {
  return (
    <mesh position={position}>
      <sphereBufferGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color='#ffffff' />
    </mesh>
  );
}

function StarField({ count }) {
  const stars = [];

  // Generate a field of stars
  for (let i = 0; i < count; i++) {
    const position = [
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
    ];
    stars.push(<Star key={i} position={position} />);
  }

  return <>{stars}</>;
}

function ShootingStar({ index }) {
  const [visible, setVisible] = useState(false);
  const meshRef = useRef();

  const startX = (Math.random() - 0.5) * 500;
  const startY = (Math.random() - 0.5) * 500;
  const startZ = (Math.random() - 0.5) * 500;
  const endX = (Math.random() - 0.5) * 500;
  const endY = (Math.random() - 0.5) * 500;
  const endZ = (Math.random() - 0.5) * 500;
  const delay = index * 5;

  useFrame(({ clock }) => {
    const progress = Math.min((clock.elapsedTime - delay) / 2, 1);
    if (progress >= 1) {
      setVisible(false);
      meshRef.current.position.set(startX, startY, startZ);
    } else {
      setVisible(true);
      meshRef.current.position.set(
        startX + (endX - startX) * progress,
        startY + (endY - startY) * progress,
        startZ + (endZ - startZ) * progress
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      {visible && <boxBufferGeometry args={[5, 0.1, 0.1]} />}
      <meshStandardMaterial color='#ffffff' />
    </mesh>
  );
}

function ShootingStarField({ count }) {
  const shootingStars = [];

  // Generate a field of shooting stars
  for (let i = 0; i < count; i++) {
    shootingStars.push(<ShootingStar key={i} index={i} />);
  }

  return <>{shootingStars}</>;
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 200] }} colorManagement color='black'>
      <Stars
        radius={100}
        depth={50}
        count={10000}
        factor={4}
        saturation={0}
        fade
      />
      <color args={["black"]} attach='background' />
      <StarField count={1000} />
      <ambientLight intensity={0.5} />
      <directionalLight color='#ffffff' position={[1, 1, 1]} intensity={0.5} />
      <ShootingStarField count={100} />
    </Canvas>
  );
}

export default App;


