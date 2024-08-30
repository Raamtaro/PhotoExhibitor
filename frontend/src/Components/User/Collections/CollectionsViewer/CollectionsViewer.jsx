import React, {useEffect, useState, useRef} from 'react'
import { useFrame, addEffect } from '@react-three/fiber'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'
import './styles/CollectionsViewer.css'
import MeshImageWrapper from './MeshImageWrapper/MeshImageWrapper'

import Lenis from 'lenis'
import {ReactLenis, useLenis} from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'

import { calcFov, debounce, lerp } from '../../../../utils/utils'

import Scene from '../../../Three/Scene'
import MeshComponent from '../../../Three/MeshComponent/MeshComponent'

gsap.registerPlugin(useGSAP)

const CollectionsViewer = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {id} = useParams()
  const [currentCollection, setCurrentCollection] = useState({})
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrollData, setScrollData] = useState({ scrollY: 0, scrollVelocity: 0 });
  const [error, setError] = useState('')

  const scrollPos = useRef({
    scrollY: 0,
    scrollVelocity: 0
  })
  // const lenis = useLenis()
  const lenis = useLenis()

  const cursorPos = useRef(
    {
      current: {x: 0, y: 0},
      target: {x: 0, y: 0},
    }
  ) //Need to handle window cursorPositioning in this component, send to => MeshComponent

  // useEffect(() => {
  //   // Listen to Lenis scroll events
  //   if (lenis) {
  //     lenis.on('scroll', (e) => {
  //       scrollPos.current.scrollY = window.scrollY;
  //       scrollPos.current.scrollVelocity = e.velocity;
  //     });
  //   }

  // }, [lenis]);
  useEffect(() => {
    if (lenis) {
      const updateScrollData = (e) => {
        scrollPos.current.scrollY = window.scrollY;
        scrollPos.current.scrollVelocity = e.velocity;
        setScrollData({ scrollY: scrollPos.current.scrollY, scrollVelocity: scrollPos.current.scrollVelocity });
      };

      lenis.on('scroll', updateScrollData);

      // Cleanup listener on unmount
      return () => {
        lenis.off('scroll', updateScrollData);
      };
    }
  }, [lenis]);

  // addEffect((t)=> lenis.raf(t))

  useEffect(() => {
    console.log(scrollData.scrollY, scrollData.scrollVelocity);
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

  useEffect(() => {
    const handleMouseMove = (event) => {
      // /**
      //  * Test
      //  */
      // console.log(event.clientX / window.innerWidth, 1.0 - (event.clientY / window.innerHeight))
      // return

      
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [

  ])



  //debug statements
  // useEffect(
  //   ()=> 
  //     {
  //       console.log(currentCollection)
  //       console.log(images)
  //     }, 
  //   [
  //     currentCollection,
  //     images
  //   ]
  // )

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      
      <header className="viewer-header">
        <div className="viewer-header-line">This is the {currentCollection?.name} collection.</div>
        <div className="viewer-header-line line-author">{user?.name}</div>
      </header>
      <Scene />
      <ReactLenis root autoRaf>
        <div className="collections-viewer-main">
          <div className="collections-grid">
            {
              images.map((image, index) => (
                //Gonna need to make a ThreeImage.jsx component using the View tool
                // <figure className={`img-wrap img-wrap-${index + 1}`} key={index} >
                //   <img className="img" src={image.url} alt={`Blur Exhibit ${index + 1}`} />
                //   <figcaption><strong>BE{`${image.id < 10 ? '0' : ''}${image.id}`}</strong></figcaption>
                // </figure>
                <MeshImageWrapper key={index} image={image} index={index}/>
              ))
            }
          </div>
        </div>
      </ReactLenis>
    </>
  )
}

export default CollectionsViewer