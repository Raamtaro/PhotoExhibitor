import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { View } from '@react-three/drei'
import { useFrame, invalidate, render } from '@react-three/fiber'
import * as THREE from 'three'
import useScreenSize from '../../../utils/useScreenSize/useScreenSize.js'

import MaterialComponent from '../Material/MaterialComponent.jsx'




const MeshComponent = ({...props}) => {
  // const [refMesh, setRefMesh] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [texture, setTexture] = useState(null)
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [quadSize, setQuadSize] = useState([0, 0]);
  const materialRef = useRef(null)
  const ref = useRef(null)
  const meshRef = useRef(null)
  const screenSize = useScreenSize()
  // const [renderTrigger, setRenderTrigger] = useState(0)

  //Set texture based on the image url (passed in via a prop, which then needs to get passed down)
  // useEffect(()=>{
  //   new THREE.TextureLoader().loadAsync(props.url).then((data) => {
  //     setTextureSize([data.image.width, data.image.height])
  //     setTexture(data)
  //   })
  // }, [])
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
       

        // setRenderTrigger((prev)=> prev + 1)
      } catch (err) {
        console.error('Error loading texture:', err);
        setError('Failed to load texture');
        setLoading(false);
      }
    };

    loadTexture();
    
  }, [props.url]);

  useEffect(() => {
    if (materialRef.current) {
      texture.needsUpdate
    }
    
  }, [materialRef.current])

 

  useLayoutEffect(() => {
    // Ensuring the effect runs only when refs and texture are ready
      if (ref.current && meshRef.current) {
        const bounds = ref.current.getBoundingClientRect();
        console.log(bounds); // Should log during the initial render if bounds are ready
        setQuadSize([bounds.width, bounds.height]);
        meshRef?.current.scale.set(bounds.width, bounds.height, 1);

        invalidate();
      }

  
  }, [screenSize]);

  // useLayoutEffect(() => {
  //   if (meshRef.current) {
  //     let bounds = ref.current.getBoundingClientRect();
  //     setQuadSize([bounds.width, bounds.height]);
  //     meshRef?.current.scale.set(bounds.width, bounds.height, 1);
  //     // const observer = new IntersectionObserver(([entry]) => {
  //     //   setIsIntersecting(entry.isIntersecting);
  //     // });
  //     // observer.observe(ref.current);
  //   }
  // }, [meshRef]);

  useEffect(()=> {
    console.log(materialRef.current)
    console.log(meshRef.current)
    
 
  },[materialRef.current])


  // if (!materialRef.current) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }


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