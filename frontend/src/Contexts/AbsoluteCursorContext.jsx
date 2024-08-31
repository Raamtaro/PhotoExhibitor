import React, {createContext, useState, useEffect, useContext, useRef} from "react";
import { lerp } from "../utils/utils";

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
        let cursorRaf
        const lerpCursor= () => {
            const x = lerp(cursorPos.current.current.x, cursorPos.current.target.x, 0.05)
            const y = lerp(cursorPos.current.current.y, cursorPos.current.target.y, 0.05)

            cursorPos.current.x = x
            cursorPos.current.y = y

            const delta = Math.sqrt(
                ((cursorPos.target.x - cursorPos.current.x) ** 2) +
                ((cursorPos.target.y - cursorPos.current.y) ** 2)
            )

            if (delta < 0.001 && cursorRaf) {
                cancelAnimationFrame(cursorRaf)
                cursorRaf = null
                return
            }

            cursorRaf = requestAnimationFrame(lerpCursor)
        }
        window.addEventListener('mousemove', (event) => {
            cursorPos.current.target.x = (event.clientX / window.innerWidth)
            cursorPos.current.target.x = 1.0 - (event.clientY / window.innerHeight)
        })

        return () => {
            window.removeEventListener('mousemove', )
        }
    }, [

    ])

    return (
        <AbsoluteCursorContext.Provider value = {cursorPos}>
            {children}
        </AbsoluteCursorContext.Provider>
    )
}