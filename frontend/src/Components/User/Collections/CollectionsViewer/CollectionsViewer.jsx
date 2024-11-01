import React, {useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Experience from '../../../WebGL/Experience.jsx'
import ViewerPlaneScene from '../../../WebGL/ViewerPlaneScene.jsx'

import './styles/CollectionsViewer.css'

gsap.registerPlugin(useGSAP)

const CollectionsViewer = () => {
  /**
   * Feed the states in as props into the ViewerPlaneScene
   */
  const [currentCollection, setCurrentCollection] = useState({})
  const [images, setImages] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { user } = useUser()
  const {id} = useParams()

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

  // useEffect(
  //   () => {

  //     console.log(currentCollection)
  //   }, [currentCollection]
  // )

  // useEffect( //Going to need to get the length of the images
  //   () => {
  //     if (images.length > 0) {
  //       console.log(images) //Images is an array
  //     }
  //   }, [images]
  // )


  
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
      <Experience>
        <ViewerPlaneScene images={images} />
      </Experience>
      <header className="viewer-header">
        <span className="viewer-header-line">{currentCollection?.name}</span>
        <span className="viewer-header-line line-author">{user?.name}</span>
      </header>
      {
        images.map((image, index)=>(
          <section key={index} className="collection-image">
            <p>{`Figure ${image.id}`}</p>
          </section>
        ))
      }

    </>
  )
}

export default CollectionsViewer