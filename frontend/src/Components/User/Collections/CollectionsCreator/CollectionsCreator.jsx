import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/CollectionsCreator.css'

const  CollectionsCreator = () => {


    const [collectionName, setCollectionName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [successMessage, setSucessMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!collectionName || !description) {
            setError('Please provide both a collection name and a description')
            return
        }

        const token = localStorage.getItem('token')

        const data = {
            name: `${collectionName}`,
            description: `${description}`
        }


        try {

            const response = await fetch('http://localhost:3000/collections/collection', 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                }
            )

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                setSucessMessage('Collection Created Succesfully!, Rerouting...')
                setError('')
                setDescription('')
                setCollectionName('')

                navigate(`/user/collections/${result.collection.id}/edit`)

            }
            


        } catch (error) {
            console.error(error)
            setError('Failed to create the collection')
        } finally {

        }
    }
    return (
        <>
            <div className="collection-create-main">
            <h2>Create a New Collection</h2>
            

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="collection-form">
                    <div className="form-group">
                        <label htmlFor="collectionName">Collection Name</label>
                        <input
                            type="text"
                            id="collectionName"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            placeholder="Enter collection name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a brief description"
                            required
                            maxLength={1000} // You can limit the character count
                        />
                    </div>

                    <button type="submit" className="submit-button">Create Collection</button>
            </form>
            </div>
        </>
    )
}

export default CollectionsCreator