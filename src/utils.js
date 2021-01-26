export function getLocalStorageItem(name) {
    return localStorage.getItem(name)? localStorage.getItem(name) : null;
}
export function setLocalStorageItem(name, value) {
    return localStorage.setItem(name, value);
}