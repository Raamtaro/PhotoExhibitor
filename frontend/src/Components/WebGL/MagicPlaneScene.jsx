import React, {forwardRef, useRef, useEffect} from 'react'
import PlaneShaderMaterial from './PlaneShaderMaterial/PlaneShaderMaterial'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import * as THREE from 'three'

const MagicPlaneScene = forwardRef((props, ref) => {
    const materialRef = useRef()
    const cameraRef = useRef()
    const {size} = useThree()  
    const mouse = useRef(
        {
            // current: { //I will use these in the post processing for the special FX, so just commenting for now
            //     x: 0,
            //     y: 0
            // },
            normalized: {
                x: 0,
                y: 0
            },
            normalizedTrail: {
                x: 0,
                y: 0
            },
            // trail: {
            //     x: 0,
            //     y: 0
            // },
            previous: {
                x: 0,
                y: 0
            },
            velocity: 0,
            targetVelocity: 0,
            ease: 0.045
        }
    )

    const calculateMouseSpeed = () => {
        mouse.current.velocity = Math.sqrt( (mouse.current.previous.x - mouse.current.normalized.x)**2 + (mouse.current.previous.y - mouse.current.normalized.y)**2)

        mouse.current.targetVelocity -= mouse.current.ease * (mouse.current.targetVelocity - mouse.current.velocity) //This should pretty much be the same between normalized and 0 to 1

        // //0 -> 1 trail - I will use this in the RGB shift mouse post processing special FX, and so I'm saving this for now. For RGB shift, I'll need to replace the velocity and previous calculations with current.current rather than current.normalized
        // mouse.current.trail.x -= mouse.current.ease * (mouse.current.trail.x - mouse.current./current.x)
        // mouse.current.trail.y -= mouse.current.ease * (mouse.current.trail.y - mouse.current./current.y)

        //Normalized Trail
        mouse.current.normalizedTrail.x -= mouse.current.ease * (mouse.current.normalizedTrail.x - mouse.current.normalized.x)
        mouse.current.normalizedTrail.y -= mouse.current.ease * (mouse.current.normalizedTrail.y - mouse.current.normalized.y)

        mouse.current.previous.x = mouse.current.normalized.x
        mouse.current.previous.y = mouse.current.normalized.y
    }

    const remapMouse = () => {
        //https://tympanus.net/codrops/2019/10/21/how-to-create-motion-hover-effects-with-image-distortions-using-three-js/#:~:text=Updating%20the%20plane%20position
        //I re-adapted the approach from the above article

        //Remapping the mouse coordinates fit the view size of the scene (2D --> 3D)
        const mouseVector = new THREE.Vector3(
            mouse.current.normalizedTrail.x,
            mouse.current.normalizedTrail.y,
            0.5 // adjustable
        );

        mouseVector.unproject(cameraRef.current);
        const dir = mouseVector.sub(cameraRef.current.position).normalize();
        const distance = 5;
        const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));

        if (ref.current) {
            ref.current.position.x = pos.x;
            ref.current.position.y = pos.y;
            ref.current.position.z = pos.z;
    
            //Update ref's uniforms as it depends on the dir variable
            ref.current.material.uniforms.uOffset.value.x = mouse.current.targetVelocity * dir.x * 3.0
            ref.current.material.uniforms.uOffset.value.y = mouse.current.targetVelocity * dir.y * 3.0
        }

        // ref.current.position.x = pos.x;
        // ref.current.position.y = pos.y;
        // ref.current.position.z = pos.z;

        // //Update ref's uniforms as it depends on the dir variable
        // ref.current.material.uniforms.uOffset.value.x = mouse.current.targetVelocity * dir.x * 3.0
        // ref.current.material.uniforms.uOffset.value.y = mouse.current.targetVelocity * dir.y * 3.0
    }



    /**
     * Set up event Listeners for mouse tracking + onEnter/onExit effects
     */

    useEffect(()=> { //Mouse Event Listener
        const handleMouseMove = (event) => {

            // //0 -> 1 coordinates - I'll use these for RGB Shift and so will delete after setting up the special FX in the other scene.
            // mouse.current.current.x = event.clientX / size.width
            // mouse.current.current.y = event.clientY / size.height // -1 * -1 to convert to event.clientY / size.height      

            //Normalized Coordinates - -1 to 1 
            mouse.current.normalized.x = (event.clientX / size.width) * 2 - 1
            mouse.current.normalized.y = -(event.clientY / size.height) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [])

    useFrame((state, delta) => {
        calculateMouseSpeed()
        remapMouse()
    })

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault              // Makes mouse.current camera the default camera
                position={[0, 0, 6]}     // Set camera position
                fov={35}                 // Field of View
                near={0.1}
                far={100}
            />
            <mesh ref={ref} {...props}>
                <planeGeometry args={[1.25, 1.75, 32, 32]}/>   
                <PlaneShaderMaterial ref={materialRef}/>           
            </mesh>
        </>
    )
})

export default MagicPlaneScene