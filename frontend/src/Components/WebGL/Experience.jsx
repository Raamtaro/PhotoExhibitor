import React from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Experience({children}) {
  return (
    <Canvas
        style={{ width: '100%', height: '100vh', margin: 0, padding: 0, position: "fixed", zIndex: -1}}
        gl={(canvas) => {
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.physicallyCorrectLights = true;
        return renderer;
        }}
    >
        {children}
    </Canvas>
  )
}

export default Experience