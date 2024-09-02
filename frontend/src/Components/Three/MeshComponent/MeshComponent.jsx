import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import { View } from '@react-three/drei'
import * as THREE from 'three'
import useScreenSize from '../../../utils/useScreenSize/useScreenSize.js'
import { useCursorContext } from '../../../Contexts/AbsoluteCursorContext.jsx'
import MaterialComponent from '../Material/MaterialComponent.jsx'

import CustomEase from 'gsap/CustomEase'
import gsap from 'gsap'

gsap.registerPlugin(CustomEase)

const MeshComponent = ({...props}) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [texture, setTexture] = useState(null)
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [quadSize, setQuadSize] = useState([0, 0]);
  const materialRef = useRef(null)
  const ref = useRef(null)
  const meshRef = useRef(null)
  const mouseEnter = useRef({value: 0})
  const [mouseEnterData, setMouseEnterData] = useState(0)
  
  const screenSize = useScreenSize()

  //MouseOver Stuff
  const {cursorPos, cursorDataCurrent, cursorDataTarget } = useCursorContext()
  const [mouseOverTargetData, setMouseOverTargetData] = useState(
    {
      x: 0,
      y: 0
    }
  )
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
  useLayoutEffect(() => {
    let timeoutId;

    const attachListener = () => {
      if (ref.current) {
        const handleMousePos = (event) => {
          const bounds = ref.current.getBoundingClientRect();
          const x = event.offsetX / bounds.width;
          const y = event.offsetY / bounds.height;

          mouseOverPos.current.target.x = x;
          mouseOverPos.current.target.y = 1.0 - y;

          setMouseOverTargetData({
            x: mouseOverPos.current.target.x,
            y: mouseOverPos.current.target.y
          })
        };

        console.log('loadingListener');
        ref.current.addEventListener('mousemove', handleMousePos);

        return () => {
          ref.current.removeEventListener('mousemove', handleMousePos);
        };
      } else {
        // Retry after a short delay if ref.current is not ready yet
        //THIS IS STRICTLY A TEMPORARY FIX - SHOULD BE INSPECTED UPON CLOSELY TO MAKE MORE RELIABLE.
        timeoutId = setTimeout(attachListener, 100);
      }
    };

    attachListener();

    // return () => { //Removed this because it caused bugs on dismount. The logic in the attachListener() function suffices (for now)
    //   if (timeoutId) {
    //     clearTimeout(timeoutId);
    //   }
    //   if (ref.current) {
    //     ref.current.removeEventListener('mousemove', handleMousePos);
    //   }
    // };
  }, [ref]);


  /**
   * Next Up for mouse stuff is mouseExit/Enter
   */

  useLayoutEffect(()=> { //Mouse Enter
    let timeoutId
    const attachListener = () => {
      if (ref.current) {
        
        const handleMouseEnter = () => {
          gsap.to(
            mouseEnter.current, {
              value: 1, duration: 0.6, ease: CustomEase.create('custom', '0.4, 0, 0.2, 1')
            }
          )
          setMouseEnterData(mouseEnter.current.value)
        }
        setMouseEnterData(mouseEnter.current.value)
        ref.current.addEventListener('mouseenter', handleMouseEnter)
        return () => {
          ref.current.removeEventListener('mouseenter', handleMouseEnter)
        }
      } else {
        timeoutId = setTimeout(attachListener, 100)
      }
    }

    attachListener()
  }, [
    ref,
    
  ])


  useLayoutEffect(()=> { //Mouse Exit
    let timeoutId
    const attachListener = () => {
      if (ref.current) {
        
        const handleMouseLeave = () => {
          gsap.to(
            mouseEnter.current, {
              value: 0, duration: 0.6, ease: CustomEase.create('custom', '0.4, 0, 0.2, 1')
            }
          )
          // setMouseEnterData(mouseEnter.current.value)
          setMouseEnterData(mouseEnter.current.value)
        }
        // setMouseEnterData(mouseEnter.current.value)
        ref.current.addEventListener('mouseleave', handleMouseLeave)
        return () => {
          ref.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      } else {
        timeoutId = setTimeout(attachListener, 100)
      }
    }

    attachListener()
  }, [
    ref,
    
  ])

  useEffect(()=> { //Test
    if (mouseEnter.current) {
      console.log(mouseEnter.current.value, mouseEnterData)
    }
  }, [
    mouseEnterData
  ])





  // useEffect(()=> {
  //   if (mouseOverPos.current) {
  //     console.log(mouseOverPos.current.target.x, mouseOverPos.current.target.y)
  //   }
  // },[
  //   mouseOverTargetData
  // ])




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
            mouseOverPos={mouseOverPos}
            mouseEnter = {mouseEnter}
          />
          <planeGeometry args={[1, 1]}/>
        </mesh>
      </View>
    </>
  )
}

export default MeshComponent