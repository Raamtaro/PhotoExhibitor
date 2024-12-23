import React, {useEffect, useState, useRef, Suspense, startTransition} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../../Contexts/UserContext'

import Experience from '../../../WebGL/Experience'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import MagicPlaneScene from '../../../WebGL/MagicPlaneScene'

import './styles/AllCollections.css'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import gsap from 'gsap'
// import { div } from 'three/webgpu'

const AllCollections = () => {
    //API States
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [myCollections , setMyCollections] = useState([])

    //Navigation
    const navigate = useNavigate()

    //Three JS scene ref
    const planeRef = useRef() //The scene renders both a camera and a plane, but it's only necessary to access the plane's ref to access the material


    /**
     * 
     *Handle Navigation
     */

    const handleCollectionNavigation = (id) => { 
        navigate(`/user/collections/${id}/edit`)

    }

    /**
     * API get collections
     */

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
        startTransition(()=>{
            getMyCollections()
        })
    }, [])

    useEffect(() => {
        if (myCollections.length > 0) {
            console.log(myCollections)
        }
    }, [myCollections])


    /**
     * Three JS Scene stuff
     * onEnter, fade the opacity in to 1 and set the texture
     * onExit, fade the opacity out to 0 and set texture to null
     * 
     */

    const urls = myCollections.map((collection) => collection.images[0].url)
    console.log(urls)

    const textures = urls.length > 0 ? useLoader(TextureLoader, urls) : []

    const handleEnter = (index) => {
        if (planeRef.current) {
            planeRef.current.material.uniforms.uTexture.value = textures[index]
            gsap.to(
                planeRef.current.material.uniforms.uAlpha, 
                {
                    value: 1.0,
                    duration: 1.0,
                    ease: 'Power4.easeOut'
                }
            )
        }

    }

    const handleExit = () => {
        if (planeRef.current) {
            gsap.to(
                planeRef.current.material.uniforms.uAlpha,
                {
                    value: 0.0,
                    duration: 1.0,
                    ease: 'Power4.easeOut',
                    
                    
                }
            )   
        }
   
    }

    // if (loading) {
    //     return (
    //         <div>
    //             loading....
    //         </div>
    //     )
    // }

    // if (error) {
    //     return (
    //       <div>Error: {error} </div>
    //     )
    // }

    return (
        <>
            <Suspense>
                <Experience>
                    <Suspense fallback={<div>Loading... </div>}>
                        <MagicPlaneScene ref={planeRef} textures={textures}/>
                    </Suspense>
                </Experience>
            </Suspense>
            <h1>
                Update a Collection
            </h1>
            <section className="viewer-section">
                {
                    myCollections.map((collection, index) => (
                        <span 
                            key={index} 
                            onClick={() => handleCollectionNavigation(collection.id)} 
                            onMouseEnter={() => handleEnter(index)}
                            onMouseLeave={handleExit}
                            href=""
                        >

                            {collection.name}

                        </span>
                    ))
                }
            </section>
        </>
    )
}

export default AllCollections