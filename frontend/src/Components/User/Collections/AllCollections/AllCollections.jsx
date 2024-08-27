import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'

const AllCollections = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [myCollections , setMyCollections] = useState([])
    const navigate = useNavigate()
    const {user} = useUser()

    const handleCollectionNavigation = (id, type) => {
        navigate(`/user/collections/${id}/${type}`)

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

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            <div className="my-collections-main">
                <button onClick={() => handleCollectionNavigation(myCollections[0].id, "edit")}>Go to the First post</button>
            </div>
        </>
    )
}

export default AllCollections