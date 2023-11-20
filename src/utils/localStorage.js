// utils to work with localStorage

export const getLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}
