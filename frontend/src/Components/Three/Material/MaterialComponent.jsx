import React, { forwardRef, useMemo, useEffect } from 'react';
import * as THREE from 'three'
import { extend } from '@react-three/fiber';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

const MaterialComponent = forwardRef((props, ref)=> {
  const {texture, textureSize, quadSize} = props

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial(
    {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: new THREE.Uniform(0.0),
        uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
        uCursor: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
        uScrollVelocity: new THREE.Uniform(0.0),
        uTexture: new THREE.Uniform(texture),
        uTextureSize: new THREE.Uniform(new THREE.Vector2(textureSize[0], textureSize[1])),
        uQuadSize: new THREE.Uniform(new THREE.Vector2(quadSize[0], quadSize[1])),
        uMouseEnter: new THREE.Uniform(0.0),
        uMouseOverPos: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
      }
    }
  ), [texture, textureSize, quadSize])

  return <primitive object={shaderMaterial} ref={ref} attach="material" {...props} />
})

extend({MaterialComponent})

export default MaterialComponent