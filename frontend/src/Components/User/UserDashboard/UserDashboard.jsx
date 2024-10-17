import React, {useEffect, useState} from 'react'
import { useUser } from '../../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

import './styles/UserDashboard.css'

function UserDashboard() {
  const {user, logout, userLoading} = useUser()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
 

  const [publishedCollections, setPublishedCollections] = useState([])
  const [myPublishedCollections, setMyPublishedCollections] = useState([])

  const navigate = useNavigate()

  const handleNavigate = (id) => {
    navigate(`/user/collections/${id}/view`)
  }

  const cleanUpResults = (allCollections) => { 

    let newResults = []

    allCollections.forEach((collection)=>{
      if(collection.published) newResults.push(collection)
    })

    setPublishedCollections(newResults)

  }

  useEffect(()=> {
    const token = localStorage.getItem('token')
    const getAllPublishedCollections = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/collections',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            if (response.ok) {
                const result = await response.json()
                
                cleanUpResults(result.allCollections)
            }
        } catch (error) {
            console.error(error);
            setError("Couldn't retrieve Collections")

        } finally {
            setLoading(false)
        }   
      }
    getAllPublishedCollections()
  }, [])

  useEffect(()=> { //Debug 
    if (publishedCollections.length > 0) {
      console.log(publishedCollections)
    }
    
  }, [publishedCollections])


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
        <section className="user-home-section">
          <h2>Welcome, {`${user?.name}`}</h2>

          {/**Section for published collections */}
          <div className="all-collections">
            <h4>Get inspiration from other works:</h4>
            <ul className="all-collections-list">
              {
                publishedCollections.map((collection, index)=> (
                  <li key={index} className="all-collections-list-item" onClick={()=> handleNavigate(collection.id)}>
                    <figure>
                      <img src={collection.images[0].url} alt="Collection Cover Photo" />
                      <figcaption>{collection.name}</figcaption>
                    </figure>
                  </li>
                ))
              }
            </ul>
          </div>
        </section> 
    </>
    
  )
}

export default UserDashboard