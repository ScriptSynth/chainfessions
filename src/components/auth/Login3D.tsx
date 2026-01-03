
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2.5, 0]} />
                <meshStandardMaterial
                    color="#4f46e5"
                    wireframe={true}
                    emissive="#4338ca"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <mesh scale={1.05}>
                <icosahedronGeometry args={[2.5, 0]} />
                <meshStandardMaterial color="#818cf8" transparent opacity={0.1} side={THREE.BackSide} />
            </mesh>
        </Float>
    );
}

export default function Login3D() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={1} />
                <FloatingShape />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
