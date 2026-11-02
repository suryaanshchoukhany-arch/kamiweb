import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export default function Product({ data, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)

  // Simple geometry: box for now
  const geometry = <boxGeometry args={[0.6, 0.6, 0.6]} />

  // Change material emissive on hover for subtle highlight
  const material = (
    <meshStandardMaterial
      color={data.color}
      emissive={hovered ? '#222222' : '#000000'}
      emissiveIntensity={0.2}
    />
  )

  // Ensure the mesh is interactive
  const handlePointerDown = (e) => {
    e.stopPropagation()
    const { camera } = e.eventObject?.parent?.parent?.userData || {}
    // We'll get camera from context via onSelect callback argument
    onSelect(data, e.camera)
  }

  // Optionally rotate slowly for visual interest
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={handlePointerDown}
    >
      {geometry}
      {material}
    </mesh>
  )
}
