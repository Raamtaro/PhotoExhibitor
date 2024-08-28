import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { View } from '@react-three/drei'
import { useFrame, invalidate } from '@react-three/fiber'
import * as THREE from 'three'
import useScreenSize from '../../../utils/useScreenSize/useScreenSize.js'

import MaterialComponent from '../Material/MaterialComponent.jsx'




const MeshComponent = ({...props}) => {
  // const [refMesh, setRefMesh] = useState(null)
  const [texture, setTexture] = useState(null)
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [quadSize, setQuadSize] = useState([0, 0]);
  const materialRef = useRef(null)
  const ref = useRef(null)
  const meshRef = useRef(null)
  const screenSize = useScreenSize()

  //Set texture based on the image url (passed in via a prop, which then needs to get passed down)
  useEffect(()=>{
    new THREE.TextureLoader().loadAsync(props.url).then((data) => {
      setTextureSize([data.image.width, data.image.height])
      setTexture(data)
    })
  }, [])

 

  useEffect(() => {
    
    if (materialRef.current && ref.current && meshRef.current) {
      const bounds = ref.current.getBoundingClientRect();
      setQuadSize([bounds.width, bounds.height]);
      meshRef.current.scale.set(bounds.width, bounds.height, 1);
      // materialRef.current.uniforms.uTexture.value = texture
      // materialRef.current.uniforms.uTexture.value.needsUpdate = true
      invalidate()
    }
  }, [screenSize, texture, materialRef]);

  // useFrame(({clock})=>{
  //   if (materialRef.current) {
  //     materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  //     materialRef.current.uniforms.uTexture.value = texture
  //     materialRef.current.uniforms.uTexture.value.needsUpdate = true
  //   }
  // })





  return (
    <>
      <View {...props} ref={ref}>
        <mesh ref={meshRef}>
          <MaterialComponent 
            ref={materialRef}
            texture={texture}
            textureSize={textureSize}
            quadSize={quadSize}
          />
          <planeGeometry args={[1, 1]}/>
        </mesh>
      </View>
    </>
  )
}

export default MeshComponent