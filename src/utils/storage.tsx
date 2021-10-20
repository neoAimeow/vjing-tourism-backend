export function setStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || "");
}

export function removeStorage(key: string) {
    localStorage.removeItem(key);
}
