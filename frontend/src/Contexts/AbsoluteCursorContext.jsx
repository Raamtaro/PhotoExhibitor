import React, {createContext, useState, useEffect, useContext, useRef} from "react";

const AbsoluteCursorContext = createContext(null)

export const useCursorContext = () => useContext(AbsoluteCursorContext)

//Provider 
export const CursorContextProvider = ({children}) => {

    const cursorPos = useRef(
        {
          current: {x: 0, y: 0},
          target: {x: 0, y: 0},
        }
    )

    useEffect(() => {
      const handleMouseMove = (event) => {
        // /**
        //  * Test
        //  */
        console.log(event.clientX / window.innerWidth, 1.0 - (event.clientY / window.innerHeight))
        return  
      }
      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, [

    ])

    return (
        <AbsoluteCursorContext.Provider value = {cursorPos}>
            {children}
        </AbsoluteCursorContext.Provider>
    )
}