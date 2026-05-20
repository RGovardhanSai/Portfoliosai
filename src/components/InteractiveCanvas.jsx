import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// Drifting Floating Particles Component (Nebula Star Field)
const FloatingStars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(900), { radius: 2 }));

  useFrame((state, delta) => {
    // Slowly rotate the particle cloud
    ref.current.rotation.x -= delta / 25;
    ref.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// 3D Neural Network Plexus Component
const NeuralNetwork = ({ count = 60, linkDistance = 0.8 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize nodes and buffers
  const [particles, positions, linePositions, lineColors] = useMemo(() => {
    const temp = [];
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread them out in space
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4 - 1; // slightly back
      
      temp.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.002,
        ox: x, oy: y, oz: z // original coordinates to anchor around
      });
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    const maxLines = count * count;
    const linePos = new Float32Array(maxLines * 6);
    const lineCol = new Float32Array(maxLines * 6);

    return [temp, pos, linePos, lineCol];
  }, [count]);

  useFrame((state) => {
    const mouseX = state.pointer.x * 3.5;
    const mouseY = state.pointer.y * 3.5;

    // Update nodes
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Update drift position
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Bounce on boundaries
      if (Math.abs(p.x) > 4) p.vx *= -1;
      if (Math.abs(p.y) > 4) p.vy *= -1;
      if (p.z < -4 || p.z > 2) p.vz *= -1;

      // Attract/Repel effect from mouse pointer
      const dxMouse = p.x - mouseX;
      const dyMouse = p.y - mouseY;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 1.2) {
        const force = (1.2 - distMouse) * 0.03;
        // Gently push away from mouse
        p.x += dxMouse * force;
        p.y += dyMouse * force;
      }

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connections/lines
    let lineIdx = 0;
    const color = new THREE.Color('#38bdf8'); // cyan

    for (let i = 0; i < count; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < linkDistance) {
          const alpha = 1 - dist / linkDistance;
          
          linePositions[lineIdx * 6] = p1.x;
          linePositions[lineIdx * 6 + 1] = p1.y;
          linePositions[lineIdx * 6 + 2] = p1.z;
          linePositions[lineIdx * 6 + 3] = p2.x;
          linePositions[lineIdx * 6 + 4] = p2.y;
          linePositions[lineIdx * 6 + 5] = p2.z;

          // Fade colors near connections
          const r = color.r * alpha * 0.4;
          const g = color.g * alpha * 0.4;
          const b = color.b * alpha * 0.4;

          lineColors[lineIdx * 6] = r;
          lineColors[lineIdx * 6 + 1] = g;
          lineColors[lineIdx * 6 + 2] = b;
          lineColors[lineIdx * 6 + 3] = r;
          lineColors[lineIdx * 6 + 4] = g;
          lineColors[lineIdx * 6 + 5] = b;

          lineIdx++;
        }
      }
    }

    // Reset remainder elements in BufferAttribute
    const maxLines = count * count;
    for (let i = lineIdx; i < maxLines; i++) {
      linePositions[i * 6] = 0;
      linePositions[i * 6 + 1] = 0;
      linePositions[i * 6 + 2] = 0;
      linePositions[i * 6 + 3] = 0;
      linePositions[i * 6 + 4] = 0;
      linePositions[i * 6 + 5] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#0ea5e9"
          size={0.06}
          sizeAttenuation={true}
          transparent
          opacity={0.8}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
};

// Holographic Central Core Sphere
const DistortedSphere = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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
    const speed = hovered ? 1.2 : 0.3;
    meshRef.current.rotation.x += 0.002 * speed;
    meshRef.current.rotation.y += 0.003 * speed;

    // Follow mouse coordinates gently (creates 3D parallax depth effect)
    meshRef.current.position.x += (mouse.x * 0.5 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (mouse.y * 0.5 - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 0.75 : 0.65}
      position={[1.5, 0, -1.2]} // Offset to the right side of the screen
    >
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial
        color={hovered ? '#ec4899' : '#a855f7'} // Pink glow on hover, purple default (cyberpunk scheme)
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        wireframe={true}
      />
    </mesh>
  );
};

const InteractiveCanvas = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);

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
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 2]} intensity={1.0} />
        <pointLight position={[-3, -3, -2]} intensity={0.3} />
        
        {/* Cinematic hologram particles */}
        <FloatingStars />

        {/* Neural Network plexus lines */}
        <NeuralNetwork count={55} linkDistance={0.7} />

        {/* Distorted glowing cyber core */}
        <DistortedSphere />
      </Canvas>
    </div>
  );
};

export default InteractiveCanvas;
