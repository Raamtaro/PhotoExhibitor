import React, {useEffect, useState, useRef} from 'react'
import { useFrame, addEffect } from '@react-three/fiber'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'
import './styles/CollectionsViewer.css'
import MeshImageWrapper from './MeshImageWrapper/MeshImageWrapper'


import gsap from 'gsap'
import { useGSAP } from '@gsap/react'





gsap.registerPlugin(useGSAP)

const CollectionsViewer = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {id} = useParams()
  const [currentCollection, setCurrentCollection] = useState({})
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <> 
          <header className="viewer-header">
            <span className="viewer-header-line">{currentCollection?.name}</span>
            <span className="viewer-header-line line-author">{user?.name}</span>
          </header>
          <section className="collections-viewer-main">
            <div className="collections-grid">
              {
                images.map((image, index) => (
                  <MeshImageWrapper key={index} image={image} index={index}/>
                ))
              }
            </div>
          </section>
    </>
  )
}

export default CollectionsViewer