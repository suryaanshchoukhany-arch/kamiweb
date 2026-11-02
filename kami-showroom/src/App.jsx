import React, { useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/three'
import * as THREE from 'three'
import Room from './Room'
import Product from './Product'
import ProductPanel from './ProductPanel'
import './index.css'

// Sample product data (placeholder)
const products = [
  {
    id: 'p1',
    name: 'Olive Grey Vase',
    price: '$450',
    description: 'Hand‑crafted porcelain vase with subtle matte finish.',
    materials: 'Porcelain',
    position: [1, 0.5, -2],
    color: '#c2b280',
  },
  {
    id: 'p2',
    name: 'Walnut Cushion',
    price: '$320',
    description: 'Luxurious cushion upholstered in dark walnut leather.',
    materials: 'Leather, Walnut',
    position: [-2, 0.3, 1],
    color: '#4b3c31',
  },
  {
    id: 'p3',
    name: 'Travertine Tabletop',
    price: '$1,200',
    description: 'Sleek tabletop of warm travertine stone.',
    materials: 'Travertine',
    position: [0, 0.8, 2.5],
    color: '#e0d5c5',
  },
];

function CameraAnimator({targetPosition, targetLookAt, onReset}) {
  const { camera } = useThree();
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (targetPosition) {
      setAnimating(true);
      const startPos = camera.position.clone();
      const startLook = new THREE.Vector3();
      camera.getWorldDirection(startLook);
      const startTarget = startPos.clone().add(startLook);
      const duration = 800; // ms
      const start = performance.now();
      const animate = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // easeInOutQuad
        camera.position.lerpVectors(startPos, new THREE.Vector3(...targetPosition), eased);
        const look = new THREE.Vector3(...targetLookAt);
        const currentTarget = new THREE.Vector3();
        camera.getWorldDirection(currentTarget);
        const curPos = camera.position.clone();
        camera.lookAt(look);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimating(false);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [targetPosition]);

  // Reset button
  const handleReset = () => {
    onReset();
  };

  return (
    <button className="reset-btn" onClick={handleReset}>Reset View</button>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [prevCamera, setPrevCamera] = useState(null);
  const { camera } = useThree();

  const handleSelect = useCallback((product) => {
    setPrevCamera({ position: camera.position.clone(), target: new THREE.Vector3().addVectors(camera.position, new THREE.Vector3().subVectors(camera.getWorldDirection(new THREE.Vector3()), new THREE.Vector3())) });
    setSelected(product);
  }, [camera]);

  const handleClose = useCallback(() => {
    if (prevCamera) {
      camera.position.copy(prevCamera.position);
      camera.lookAt(prevCamera.target);
    }
    setSelected(null);
  }, [prevCamera, camera]);

  const resetCamera = () => {
    camera.position.set(0, 1.6, 5);
    camera.lookAt(0, 1.6, 0);
  };

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 1.6, 5], fov: 45 }} style={{ background: '#f5f5f0' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Room />
        {products.map((p) => (
          <Product key={p.id} data={p} onSelect={handleSelect} />
        ))}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
          enableDamping
          dampingFactor={0.1}
        />
        <CameraAnimator
          targetPosition={selected ? selected.position.map((v, i) => i===1 ? v+0.8 : v) : null}
          targetLookAt={selected ? selected.position : null}
          onReset={resetCamera}
        />
      </Canvas>
      {selected && (
        <ProductPanel product={selected} onClose={handleClose} />
      )}
    </div>
  );
}

  const [selected, setSelected] = useState(null);
  const [prevCamera, setPrevCamera] = useState(null);

  const handleSelect = useCallback((product, camera) => {
    // Save current camera state for return
    setPrevCamera({ position: camera.position.clone(), target: camera.target.clone() });
    setSelected(product);
  }, []);

  const handleClose = useCallback((camera) => {
    // Restore previous camera position
    if (prevCamera) {
      camera.position.copy(prevCamera.position);
      camera.lookAt(prevCamera.target);
    }
    setSelected(null);
  }, [prevCamera]);

  return (
    <div className="app-container">
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 45 }}
        style={{ background: '#f5f5f0' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Room />
        {products.map((p) => (
          <Product key={p.id} data={p} onSelect={handleSelect} />
        ))}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
      <button className="reset-btn" onClick={() => {
        // Reset camera to initial state
        // Reset handled by ResetButton component within Canvas
      }}>
        Reset View
      </button>
      {selected && (
        <ProductPanel product={selected} onClose={handleClose} />
      )}
    </div>
  );
}
