import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'

const CollectionsViewer = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {id} = useParams()
  const [currentCollection, setCurrentCollection] = useState({})
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  //Objective of this is to:
  //1. Initially set the images in certain positions on the screen based on styling rules
  //2. Secondarily set up the Three js scene to map the meshes to the correct position canvas <> viewport

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

  useEffect(
    ()=> 
      {
        console.log(currentCollection)
        console.log(images)
      }, 
    [
      currentCollection,
      images
    ]
  )

  return (
    <>
      <div className="collections-viewer-main">
        <div className="collections-header">This is {currentCollection?.name}.</div>
      </div>
    </>
  )
}

export default CollectionsViewer