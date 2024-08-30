import React, {createContext, useState, useEffect, useContext, useRef} from "react";
import {useLenis} from 'lenis/react'

const SmoothScrollContext = createContext(null)

export const useSmoothScrollContext = () => useContext(SmoothScrollContext)

//Provider
export const SmoothScrollProvider = ({children}) => {

    const scroll = useRef({
        scrollY: 0,
        scrollVelocity: 0
    })
    
    const lenis = useLenis()

    const setUpLenis = () => {
        if (lenis) {
            lenis.on('scroll', ({ scrollY, velocity }) => {
                scroll.current.scrollY = scrollY;
                scroll.current.scrollVelocity = velocity;
            });
        }
    }


}