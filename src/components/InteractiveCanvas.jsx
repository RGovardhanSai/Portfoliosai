import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Drifting Floating Particles Component
const FloatingStars = (props) => {
  const ref = useRef();
  // Generate 500 random points inside a sphere of radius 1.2
  const [sphere] = useState(() => random.inSphere(new Float32Array(1500), { radius: 1.5 }));

  useFrame((state, delta) => {
    // Slowly rotate the particle cloud
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Interactive 3D Mesh that distorts on mouse hover and movement
const DistortedSphere = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Monitor mouse movements in window to translate coords to WebGL
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Speed up rotation when hovered
    const speed = hovered ? 1.5 : 0.4;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;

    // Smoothly interpolate position towards mouse coordinates for depth reaction
    meshRef.current.position.x += (mouse.x * 0.4 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (mouse.y * 0.4 - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.25 : 1.05}
      className="transition-all duration-500 ease-out"
    >
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={hovered ? '#38bdf8' : '#0369a1'}
        attach="material"
        distort={hovered ? 0.45 : 0.25}
        speed={hovered ? 3 : 1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </mesh>
  );
};

const InteractiveCanvas = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check for WebGL compatibility on initialization
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebGLSupported(supported);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    // Elegant CSS backdrop fallback
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 dark:bg-primary-950/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 2]} intensity={1.2} />
        <pointLight position={[-5, -5, -2]} intensity={0.5} />
        
        {/* Floating background particles */}
        <FloatingStars />

        {/* Dynamic interactive distorted sphere */}
        <DistortedSphere />
      </Canvas>
    </div>
  );
};

export default InteractiveCanvas;
