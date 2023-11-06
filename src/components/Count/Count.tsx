import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'

const heavyTask = () => {
    for (let i = 0; i < 10000; i++) {
        let obj = {name: 'Alex', age: 14}
        const objString = JSON.stringify(obj)
        obj = JSON.parse(objString) 
    }
}

export default function Count() {
    const [width, setWidth] = useState<number>(0)
    const sectionRef = useRef<HTMLElement>(null)
    // const [count, setCount] = useState<number>(0)

    // const handleClick = () => {
    //     setCount((prev) => prev + 1)
    // }

    // useLayoutEffect(() => {
    //     console.log('useLayoutEffect')
    // }, [])

    useEffect(() => {
        const measure = () => setWidth(sectionRef.current?.offsetWidth || 0)
        
        heavyTask()
        measure()

        window.addEventListener('resize', measure)

        return () => {
            window.removeEventListener('resize', measure)
        }
    }, [])

    // useEffect(() => {
    //     if (count === 4) {
    //         setCount(0)
    //     }
    // }, [count])

    console.log('render')

    return (
        <div>
            <section ref={sectionRef} style={{ background: 'red' }}>
                Content
            </section>
            {width > 300 && (
                <div style={{ background: 'yellow' }}>
                    Please resize screen smaller
                </div>
            )}
        </div>
    )
}
