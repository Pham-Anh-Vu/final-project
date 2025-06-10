import React, { useEffect, useRef, useState } from 'react';

function useOnScreen(option:any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const callbackFunction = (entries:any) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(callbackFunction, option)
        if (containerRef.current) observer.observe(containerRef.current)
        
        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef, option])

    return [containerRef, isVisible] as const;
}

export default useOnScreen;