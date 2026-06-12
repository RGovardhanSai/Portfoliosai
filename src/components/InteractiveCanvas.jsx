import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const BokehBubbles = ({ isDarkMode }) => {
  const count = 400; // Increased count to balance the smaller sizes
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate bubble data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const isTiny = Math.random() < 0.2; // 20% are tiny glowing dots
      const scale = isTiny 
        ? Math.random() * 0.03 + 0.01 // Very tiny dots
        : Math.random() * 0.35 + 0.05; // Much smaller soft bubbles

      // Choose theme-appropriate colors
      let color;
      if (isTiny) {
        color = new THREE.Color(isDarkMode ? '#f8fafc' : '#3b82f6'); // White in dark, Blue in light
      } else {
        const rand = Math.random();
        if (isDarkMode) {
          // Dark Mode Palette: Slate background bubbles, some Deep Blue, some Cyan
          if (rand < 0.5) color = new THREE.Color('#1e293b'); // Very dark slate/blue
          else if (rand < 0.8) color = new THREE.Color('#0369a1'); // Deep Blue
          else color = new THREE.Color('#0ea5e9'); // Bright Cyan
        } else {
          // Light Mode Palette: Soft light blues and grays
          if (rand < 0.5) color = new THREE.Color('#e2e8f0'); // Soft slate-200
          else if (rand < 0.8) color = new THREE.Color('#bfdbfe'); // Soft blue
          else color = new THREE.Color('#60a5fa'); // Primary blue
        }
      }

      temp.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 15 - 4, // Depth range from -11.5 to 3.5
        vy: (Math.random() * 0.015) + 0.005, // Upward floating speed
        offset: Math.random() * Math.PI * 2, // For horizontal drift
        scale: scale,
        color: color
      });
    }
    return temp;
  }, [count, isDarkMode]);

  // Extract colors for the instanced mesh
  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      arr[i * 3] = p.color.r;
      arr[i * 3 + 1] = p.color.g;
      arr[i * 3 + 2] = p.color.b;
    });
    return arr;
  }, [particles, count]);

  useEffect(() => {
    meshRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3));
  }, [colorArray]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update individual bubble positions to make them float up and drift
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Float upwards
      p.y += p.vy;
      
      // Gentle horizontal drift
      p.x += Math.sin(time * 0.5 + p.offset) * 0.005;
      
      // Wrap around when they float too high
      if (p.y > 15) {
        p.y = -15;
        p.x = (Math.random() - 0.5) * 40; // randomize X on respawn
      }

      // Apply subtle global parallax based on mouse
      const mouseX = state.pointer.x * 2;
      const mouseY = state.pointer.y * 2;
      
      dummy.position.set(
        p.x + mouseX * (p.z + 10) * 0.01, 
        p.y + mouseY * (p.z + 10) * 0.01, 
        p.z
      );
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* 
        Using MeshBasicMaterial creates the flat, translucent "bokeh" circle look 
        without any 3D shadows or specular highlights, matching the reference.
      */}
      <meshBasicMaterial 
        vertexColors={true} 
        transparent={true} 
        opacity={isDarkMode ? 0.35 : 0.5} 
        depthWrite={false}
      />
    </instancedMesh>
  );
};

// 3D Neural Network Plexus Component (For Light Mode)
const NeuralNetwork = ({ isDarkMode, count = 80, linkDistance = 1.0 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize nodes and buffers
  const [particles, positions, linePositions, lineColors] = useMemo(() => {
    const temp = [];
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread them out in space
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5 - 1; // slightly back
      
      temp.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.003,
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
    const mouseX = state.pointer.x * 5.0;
    const mouseY = state.pointer.y * 5.0;

    // Update nodes
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Update drift position
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Bounce on boundaries
      if (Math.abs(p.x) > 6) p.vx *= -1;
      if (Math.abs(p.y) > 6) p.vy *= -1;
      if (p.z < -4 || p.z > 2) p.vz *= -1;

      // Attract/Repel effect from mouse pointer
      const dxMouse = p.x - mouseX;
      const dyMouse = p.y - mouseY;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 2.0) {
        const force = (2.0 - distMouse) * 0.02;
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
    const color = new THREE.Color('#3b82f6'); // Clean blue

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
          const multiplier = 0.4;
          const r = color.r * alpha * multiplier;
          const g = color.g * alpha * multiplier;
          const b = color.b * alpha * multiplier;

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
          color="#1d4ed8"
          size={0.08}
          sizeAttenuation={true}
          transparent
          opacity={0.7}
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
          blending={THREE.NormalBlending}
          depthWrite={false}
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
};

const InteractiveCanvas = () => {
  const { isDarkMode } = useTheme();
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-[120px] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      >
        {/* Cinematic lighting strictly matching the white and blue theme. Dimmer in dark mode. */}
        <ambientLight intensity={isDarkMode ? 0.05 : 0.4} />
        <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 0.8 : 1.5} color={isDarkMode ? "#7dd3fc" : "#ffffff"} />
        <directionalLight position={[-10, -10, -5]} intensity={isDarkMode ? 0.4 : 1.5} color={isDarkMode ? "#0284c7" : "#1e40af"} />
        <pointLight position={[5, 0, -2]} intensity={isDarkMode ? 0.6 : 1.0} color={isDarkMode ? "#38bdf8" : "#0284c7"} distance={20} />
        
        {/* Render Neural Network in Light Mode, Bokeh Bubbles in Dark Mode */}
        {isDarkMode ? (
          <>
            <fog attach="fog" args={['#020617', 5, 18]} />
            <BokehBubbles isDarkMode={isDarkMode} />
          </>
        ) : (
          <NeuralNetwork isDarkMode={isDarkMode} />
        )}
      </Canvas>
    </div>
  );
};

export default InteractiveCanvas;
