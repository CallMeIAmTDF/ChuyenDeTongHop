import { useEffect, useState } from "react";


export function useDebounce( value: string, delay: number = 500) {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value)
        }, delay)
        return () => clearTimeout(handler)

    }, [value])

    return debounce
}