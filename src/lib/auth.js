import { browser } from '$app/environment';
import { writable } from 'svelte/store'

let initialIsLoggedIn = false;
let initialUserAvatar = null;
let initialEmail = '';

const storedData = browser ? localStorage.getItem('userData') : null;

if (storedData) {
    try{
        const userData = JSON.parse(storedData)
        initialIsLoggedIn = !!userData.token
        initialUserAvatar = userData.avatar || null;
        initialEmail = userData.email || '';
    } catch (error) {
        console.error(error)
        localStorage.removeItem('userData')
    }
}

export const isLoggedIn = writable(initialIsLoggedIn);
export const userAvatar = writable(initialUserAvatar);
export const userEmail = writable(initialEmail)