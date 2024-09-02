import React, { forwardRef, useMemo, useEffect } from 'react';
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import { useCursorContext } from '../../../Contexts/AbsoluteCursorContext';
import { useSmoothScrollContext } from '../../../Contexts/SmoothScrollContext';

import { lerp } from '../../../utils/utils';

const MaterialComponent = forwardRef((props, ref)=> {
  const {texture, textureSize, quadSize, mouseOverPos, mouseEnter} = props
  const {cursorPos} = useCursorContext()
  const {scroll} = useSmoothScrollContext()

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial(
    {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: new THREE.Uniform(0.0),
        uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
        uCursor: new THREE.Uniform(new THREE.Vector2(0.0, 0.0)),
        uScrollVelocity: new THREE.Uniform(0.0),
        uTexture: new THREE.Uniform(texture),
        uTextureSize: new THREE.Uniform(new THREE.Vector2(textureSize[0], textureSize[1])),
        uQuadSize: new THREE.Uniform(new THREE.Vector2(quadSize[0], quadSize[1])),
        uMouseEnter: new THREE.Uniform(0.0),
        uMouseOverPos: new THREE.Uniform(new THREE.Vector2(0.0, 0.0)),
      }
    }
  ), [texture, textureSize, quadSize])

  useFrame (({ clock }) => {

    ref.current.uniforms.uTime.value = clock.getElapsedTime()


    // ref.current.uniforms.uTexture.value = texture
    // ref.current.uniforms.uTexture.value.needsUpdate = true;
    // ref.current.uniforms.uTextureSize.value.x = textureSize[0],
    // ref.current.uniforms.uTextureSize.value.y = textureSize[1],
    // ref.current.uniforms.uQuadSize.value.x = quadSize[0],
    // ref.current.uniforms.uQuadSize.value.y = quadSize[1],
    ref.current.uniforms.uCursor.value.x = cursorPos.current.current.x
    ref.current.uniforms.uCursor.value.y = cursorPos.current.current.y
    ref.current.uniforms.uMouseOverPos.value.x = mouseOverPos.current.current.x
    ref.current.uniforms.uMouseOverPos.value.y = mouseOverPos.current.current.y
    ref.current.uniforms.uMouseEnter.value = mouseEnter.current.value
    ref.current.uniforms.uScrollVelocity.value = scroll.current.scrollVelocity
    
  })


  return <primitive object={shaderMaterial} ref={ref} attach="material" {...props} />
})

extend({MaterialComponent})

export default MaterialComponent