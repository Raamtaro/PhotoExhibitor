import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'


const  CollectionsEditor = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {id} = useParams()
  const [currentCollection, setCurrentCollection] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  const handleNavigateToViewer = () => {
    navigate(`/user/collections/${id}/view`)
  }

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
          console.log(result)
          setCurrentCollection(result.collection)
        }

      } catch (error) {
        console.error(error)
        setError("Couldn't retrieve the collection")
      } finally {
        setLoading(false)
      }
    }
    getCollectionInfo()
  }, [])

  if (loading) {
    return (
      <div>loading...</div>
    )
  }
  
  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <div className="collections-editor-main">
        <h1>Viewing {currentCollection?.name}</h1>
        <h2>Upload your work</h2>
        <h3>File Upload Section incoming....</h3>

      </div>
    </>
  )
}

export default CollectionsEditor