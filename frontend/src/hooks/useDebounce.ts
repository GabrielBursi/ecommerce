import { useCallback, useRef } from 'react'

export function useDebounce(delay = 1000, delayInFirstLoad = false) {

    const debouncing = useRef<NodeJS.Timeout>()
    const isFirstLoad = useRef<boolean>(delayInFirstLoad)

    const debounce = useCallback((func: () => void) => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            func()
        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current)
            }
            debouncing.current = setTimeout(() => func(), delay)
        }

    }, [delay])

    return { debounce }
}
