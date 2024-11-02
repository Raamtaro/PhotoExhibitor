import React, {useState, useEffect, useRef} from 'react'
import { PerspectiveCamera } from '@react-three/drei'

import { useThree, useFrame } from '@react-three/fiber'

import { useLenis } from 'lenis/react'

import PlaneImage from './PlaneImage/PlaneImage.jsx'

function ViewerPlaneScene(props) {
    const {size, camera, gl, viewport} = useThree()
    const cameraRef = useRef() 
    const scrollRef = useRef({
      value: 0,
      velocity: 0
    })

    const [scrollVelocity, setScrollVelocity] = useState(null)

    const planeRefs = useRef([])

    const {images} = props

    // console.log(images)

    useLenis((lenis)=> {
        // scrollRef.current.velocity = lenis.velocity
        setScrollVelocity(lenis.velocity) //This is not the most optimal solution, this causes too many re-renders and makes the animation very choppy. Need to return to utilize refs or memos (preferably refs)
        scrollRef.current.value = lenis.scroll
    })

    useEffect(()=> {
        planeRefs.current = images.map((_, index)=> planeRefs.current[index] || React.createRef())
    }, [images])

    // useEffect(()=> {

    //     console.log(planeRefs.current[0])
    // }, [planeRefs])

    // useEffect(()=> { 
    //     const handleScroll = () => {
    //         scrollRef.current.value = window.scrollY
            
    //     }
    //     window.addEventListener('scroll', handleScroll), {passive: true}

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, [])

    useFrame(()=> {
        
        cameraRef.current.position.y = - scrollRef.current.value / size.height * (images.length)
        
    })
    return (
        <>
            <PerspectiveCamera 
                makeDefault
                ref={cameraRef}
                position={[0, 0, 6]}
                fov={35}
                near={0.1}
                far={1000}
            />
            {
            images.map((image, index) => (
                <PlaneImage 
                    ref={planeRefs.current[index]}
                    key={index} 
                    texture={image.url} 
                    positioning={[index%2===0 ? 1 : -1, -(images.length) * index, 0]}
                    velocity={scrollVelocity * 0.0023}
                />
            ))
            }
        </>
    )
}

export default ViewerPlaneScene