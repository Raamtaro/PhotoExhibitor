import React, {useEffect} from 'react'
import { Canvas } from '@react-three/fiber'
import { View, OrthographicCamera, Preload } from '@react-three/drei'

const Scene = () => {
  useEffect(()=> {
    console.log("Scene Component Loaded")
  }, [])
  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          
        }}
        eventSource={document.body}
      >
        <View.Port />
        <OrthographicCamera makeDefault position={[0, 0, 300]} zoom={1}/>
        <Preload all />
      </Canvas>
    </>

  )
}

export default Scene