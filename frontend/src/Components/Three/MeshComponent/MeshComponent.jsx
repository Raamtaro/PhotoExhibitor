import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { View } from '@react-three/drei'
import { useFrame, invalidate, render } from '@react-three/fiber'
import * as THREE from 'three'
import useScreenSize from '../../../utils/useScreenSize/useScreenSize.js'
import { useCursorContext } from '../../../Contexts/AbsoluteCursorContext.jsx'

import { lerp } from 'three/src/math/MathUtils.js'

import MaterialComponent from '../Material/MaterialComponent.jsx'




const MeshComponent = ({...props}) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [texture, setTexture] = useState(null)
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [quadSize, setQuadSize] = useState([0, 0]);
  const materialRef = useRef(null)
  const ref = useRef(null)
  const meshRef = useRef(null)
  const screenSize = useScreenSize()

  //MouseOver Stuff
  const {cursorPos, cursorDataCurrent, cursorDataTarget } = useCursorContext()
  const mouseOverPos = useRef(
    {
      current: {x: 0, y: 0},
      target: {x: 0, y: 0}
    }
  )

  //First Load Textures + Set Sizes

  useEffect(() => {
    const loadTexture = async () => {
      
      try {
        const loader = new THREE.TextureLoader();
        const texture = await new Promise((resolve, reject) => {
          loader.load(
            props.url,
            (loadedTexture) => resolve(loadedTexture),
            undefined,
            (err) => reject(err)
          );
        });

        setTextureSize([texture.image.width, texture.image.height]);
        setTexture(texture);
        setLoading(false);
       
      } catch (err) {
        console.error('Error loading texture:', err);
        setError('Failed to load texture');
        setLoading(false);
      }
    };

    loadTexture();
    
  }, [props.url]);

  useLayoutEffect(() => {
    const updateMeshScale = () => {
      if (ref.current && meshRef.current) {
        const bounds = ref.current.getBoundingClientRect();
        setQuadSize([bounds.width, bounds.height]);
        meshRef.current.scale.set(bounds.width, bounds.height, 1);
      }
    };

    if (texture && ref.current && meshRef.current) {
      requestAnimationFrame(updateMeshScale);
    } else {
      // Re-trigger the effect after a short delay if refs are not ready yet
      setTimeout(updateMeshScale, 100); //This needs to be changed - right now just a way to get things working but not good for a long-term fix.
    }
  }, [screenSize, texture]);

  //Mouse Tracking stuff - mouseOverPos --{prop}--> MaterialComponent

  /**
   * First, set up event listener stuff which will 
   */
  //Mouse Positioning
// useLayoutEffect(() => { //Refactoring this to include a timeout based Retry
// This should be considered a TEMPORARY solution (if it works), and needs to be updated to be more reliable and not use timeouts.
   
//   const handleMousePos = (event) => {
//     const bounds = ref.current.getBoundingClientRect()
//     const x = event.offsetX / bounds.width
//     const y = event.offsetY / bounds.height

//     mouseOverPos.current.target.x = x
//     mouseOverPos.current.target.y = y
//   }
//   console.log('loadingListener')
//   ref.current.addEventListener('mousemove', handleMousePos)

//   return () => ref.current.removeEventListener('mousemmove', handleMousePos)
  

//   }, [screenSize, ref])




  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }


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