import {useState, useEffect} from 'react';

export const useLocalStorage = (user, key, initialValue) => {
    // Retrieve stored value or use initial value
    const storedValue = localStorage.getItem(user ? `${user}_${key}` : key)
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to store the current value
    const [value, setValue] = useState(initial);

    // Effect to update localStorage when value changes
    useEffect(() => {
        localStorage.setItem(user ? `${user}_${key}` : key, JSON.stringify(value));
    }, [user, key, value]);

    return [value, setValue];
}

