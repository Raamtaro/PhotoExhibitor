import React, {createContext, useState, useEffect, useContext, useRef} from "react";
import {useLenis} from 'lenis/react'

const SmoothScrollContext = createContext(null)

export const useSmoothScrollContext = () => useContext(SmoothScrollContext)

//Provider
export const SmoothScrollProvider = ({children}) => {

    const [scrollData, setScrollData] = useState({ scrollY: 0, scrollVelocity: 0 });

    const scroll = useRef({
        scrollY: 0,
        scrollVelocity: 0
    })
    
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) {
          const updateScrollData = (e) => {
            scroll.current.scrollY = window.scrollY;
            scroll.current.scrollVelocity = e.velocity;
            setScrollData({ scrollY: scroll.current.scrollY, scrollVelocity: scroll.current.scrollVelocity });
          };
    
          lenis.on('scroll', updateScrollData);
    
          // Cleanup listener on unmount
          return () => {
            lenis.off('scroll', updateScrollData);
          };
        }
    }, [lenis]);

    return (
        <SmoothScrollContext.Provider value = {{scroll, scrollData}}>
            {children}
        </SmoothScrollContext.Provider>
    )


}