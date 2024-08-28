import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { View } from '@react-three/drei'
import * as THREE from 'three'
import useScreenSize from '../../../utils/useScreenSize/useScreenSize.js'

import MaterialComponent from '../Material/MaterialComponent.jsx'




const MeshComponent = ({...props}) => {
  // const [refMesh, setRefMesh] = useState(null)
  const [texture, setTexture] = useState(null)
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [quadSize, setQuadSize] = useState([0, 0]);
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

  useLayoutEffect(() => {
    if (ref.current && meshRef.current) {
      const bounds = ref.current.getBoundingClientRect();
      setQuadSize([bounds.width, bounds.height]);
      meshRef.current.scale.set(bounds.width, bounds.height, 1);
    }
  }, [screenSize, texture]);



  return (
    <>
      <View {...props} ref={ref}>
        <mesh ref={meshRef}>
          <MaterialComponent 
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