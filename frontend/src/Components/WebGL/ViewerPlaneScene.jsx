import React, {useState, useEffect, useRef} from 'react'
import { PerspectiveCamera } from '@react-three/drei'

import { useThree, useFrame } from '@react-three/fiber'

import PlaneImage from './PlaneImage/PlaneImage.jsx'

function ViewerPlaneScene(props) {
    const {size, camera, gl, viewport} = useThree()
    const cameraRef = useRef() 
    const scrollRef = useRef({
      value: 0,
      velocity: 0
    })

    const {images} = props

    console.log(images)

    useEffect(()=> { //Scroll Event Listener
        const handleScroll = () => {
            scrollRef.current.value = window.scrollY
            // console.log(scrollRef.current.value)
        }
        window.addEventListener('scroll', handleScroll), {passive: true}

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useFrame(()=> {
        cameraRef.current.position.y = - scrollY / size.height * (images.length + 1)
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
                <PlaneImage key={index} texture={image.url} positioning={[index%2===0 ? 1 : -1, -(images.length + 1) * index, 0]}/>
            ))
            }
        </>
    )
}

export default ViewerPlaneScene