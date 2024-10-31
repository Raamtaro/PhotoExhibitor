import React, {forwardRef, useMemo, } from 'react'
import * as THREE from 'three'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'



const PlaneImage = forwardRef((props, ref) => {

    const {texture, positioning} = props
    const loadedTexture = texture ? useLoader(TextureLoader, texture) : null

    // console.log(loadedTexture) //Loading

    const planeShaderMaterial = useMemo( () => {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uTexture: {value: loadedTexture},
                    uOffset: {value: new THREE.Vector2(0.0, 0.0)}
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        )
    })

    return (
        <mesh ref={ref} material={planeShaderMaterial} position={positioning ? positioning : [0, 0, 0]}>
            <planeGeometry args={[2.0, 2.5, 32, 32]}/>
        </mesh>
    )
})

export default PlaneImage