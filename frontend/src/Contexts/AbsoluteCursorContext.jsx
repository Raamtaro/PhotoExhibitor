import React, {createContext, useState, useEffect, useContext, useRef} from "react";
import { lerp } from "../utils/utils";

const AbsoluteCursorContext = createContext(null)

export const useCursorContext = () => useContext(AbsoluteCursorContext)

//Provider 
export const CursorContextProvider = ({children}) => {
    const [cursorDataCurrent, setCursorDataCurrent] = useState(
        {
            x: 0,
            y: 0
        }
    )
    const [cursorDataTarget, setCursorDataTarget] = useState(
        {
            x: 0,
            y: 0
        }
    )
    const cursorPos = useRef(
        {
            current: {
                x: 0.5, 
                y: 0.5
            },
            target: {
                x: 0, 
                y: 0
            },
        }
    )

    useEffect(() => {
        let cursorRaf
        const lerpCursor= () => {
            const x = lerp(cursorPos.current.current.x, cursorPos.current.target.x, 0.05)
            const y = lerp(cursorPos.current.current.y, cursorPos.current.target.y, 0.05)

            cursorPos.current.current.x = x
            cursorPos.current.current.y = y
            setCursorDataCurrent(
                {
                    x: cursorPos.current.current.x,
                    y: cursorPos.current.current.y
                }
            )

            const delta = Math.sqrt(
                ((cursorPos.current.target.x - cursorPos.current.current.x) ** 2) +
                ((cursorPos.current.target.y - cursorPos.current.current.y) ** 2)
            )

            if (delta < 0.001 && cursorRaf) {
                cancelAnimationFrame(cursorRaf)
                cursorRaf = null
                return
            }

            cursorRaf = requestAnimationFrame(lerpCursor)
        }

        const handleMouseMove = (event) => {
            cursorPos.current.target.x = (event.clientX / window.innerWidth)
            cursorPos.current.target.y = 1.0 - (event.clientY / window.innerHeight)
            setCursorDataTarget({x: cursorPos.current.target.x, y: cursorPos.current.target.y})
            if (!cursorRaf) {
                requestAnimationFrame(lerpCursor)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [

    ])

    // useEffect(() => {
    //     console.log('target:', cursorPos.current.target.x, cursorPos.current.target.y)
    //     console.log('current:', cursorPos.current.current.x, cursorPos.current.current.y)
    // }, [cursorDataTarget])

    return (
        <AbsoluteCursorContext.Provider value = {{cursorPos, cursorDataCurrent, cursorDataTarget}}>
            {children}
        </AbsoluteCursorContext.Provider>
    )
}