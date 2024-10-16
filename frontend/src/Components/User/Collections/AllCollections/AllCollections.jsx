import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'

import './styles/AllCollections.css'

const AllCollections = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [myCollections , setMyCollections] = useState([])
    const navigate = useNavigate()
    const {user} = useUser()

    const handleCollectionNavigation = (id) => {
        navigate(`/user/collections/${id}/edit`)

    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const getMyCollections = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/collections/mycollections',
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
                    setMyCollections(result.allCollections)
                }
            } catch (error) {
                console.error(error);
                setError("Couldn't find your Collections!")

            } finally {
                setLoading(false)
            }   
        }
        getMyCollections()
    }, [])

    useEffect(() => {
        console.log(myCollections)
    }, [myCollections])

    if (loading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    if (error) {
        return (
          <div>Error: {error} </div>
        )
      }

    return (
        <>
            <h1>
                Update a Collection
            </h1>
            <section className="viewer-section">
                {
                    myCollections.map((collection, index) => (
                        <span key={index} onClick={() => handleCollectionNavigation(collection.id)} href="">{collection.name}</span>
                    ))
                }
            </section>
        </>
    )
}

export default AllCollections