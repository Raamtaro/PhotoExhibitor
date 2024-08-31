import React, {useEffect, useState, useRef} from 'react'
import { useFrame, addEffect } from '@react-three/fiber'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'
import './styles/CollectionsViewer.css'
import MeshImageWrapper from './MeshImageWrapper/MeshImageWrapper'

import { useSmoothScrollContext } from '../../../../Contexts/SmoothScrollContext'

import Lenis from 'lenis'
import {ReactLenis, useLenis} from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'

import { calcFov, debounce, lerp } from '../../../../utils/utils'

import Scene from '../../../Three/Scene'

import { CursorContextProvider } from '../../../../Contexts/AbsoluteCursorContext'

gsap.registerPlugin(useGSAP)

const CollectionsViewer = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {id} = useParams()
  const [currentCollection, setCurrentCollection] = useState({})
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const {scroll, scrollData} = useSmoothScrollContext()

  const cursorPos = useRef(
    {
      current: {x: 0, y: 0},
      target: {x: 0, y: 0},
    }
  ) //Need to handle window cursorPositioning in this component, send to => MeshComponent

  useEffect(() => {
    console.log(scroll.current.scrollY, scroll.current.scrollVelocity);
  }, [scrollData]);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    
    const getCollectionInfo = async () => {
      try {
        const response = await fetch (
          `http://localhost:3000/collections/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            
          }
        )
        if (response.ok) {
          const result = await response.json()
          setCurrentCollection(result.collection)
          setImages(result.collection.images)
          
        }

      } catch (error) {
        console.error(error)
        setError("Couldn't retrieve the collection")
      } finally {
        setLoading(false)
      }
    }
    getCollectionInfo()
  }, [id])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      
      <CursorContextProvider>
        
          <header className="viewer-header">
            <div className="viewer-header-line">This is the {currentCollection?.name} collection.</div>
            <div className="viewer-header-line line-author">{user?.name}</div>
          </header>
          <Scene />
          <ReactLenis root>
            <div className="collections-viewer-main">
              <div className="collections-grid">
                {
                  images.map((image, index) => (
                    <MeshImageWrapper key={index} image={image} index={index}/>
                  ))
                }
              </div>
            </div>
          </ReactLenis>
        
      </CursorContextProvider>
    </>
  )
}

export default CollectionsViewer