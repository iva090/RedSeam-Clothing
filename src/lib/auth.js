import { browser } from '$app/environment';
import { writable } from 'svelte/store'
import {api} from '$lib/axios/axios.js'

let initialIsLoggedIn = false;
let initialUserAvatar = null;

const storedData = browser ? localStorage.getItem('userData') : null;

if (storedData) {
    try{
        const userData = JSON.parse(storedData)
        initialIsLoggedIn = !!userData.token
        initialUserAvatar = userData.avatar || null;
    } catch (error) {
        console.error(error)
        localStorage.removeItem('userData')
    }
}

export const isLoggedIn = writable(initialIsLoggedIn);
export const userAvatar = writable(initialUserAvatar);