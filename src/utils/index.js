import {useEffect, useState} from "react";

export const isFalsy = value => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
    const result = {...object}
    for (let key in result) {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    }
    return result
}

export const useMount = callback => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => cleanObject(timeout)
    }, [value, delay])

    return debounceValue;
}