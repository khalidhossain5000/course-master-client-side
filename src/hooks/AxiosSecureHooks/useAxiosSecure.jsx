// import axios from 'axios';
// import React from 'react';

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:5000',
//     withCredentials: true
// })

// const useAxiosSecure = () => {
    
//     return axiosSecure;
// };

// export default useAxiosSecure;

'use client'
import axios from 'axios';
import React from 'react';

import useAuth from '../AuthHooks/useAuth';
import { useRouter } from 'next/navigation';
const axiosSecure = axios.create({
    // baseURL:`https://assignment-12-server-lac-one.vercel.app`
    baseURL:`http://localhost:5000`,
     withCredentials: true
})
const useAxiosSecure = () => {
    const { user,logout,token } = useAuth();
   const router=useRouter()
    // console.log(token,'in axios secure token is here');

    if(!token) return <p>loadinggggggggggg</p>
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error?.response?.status;
        if (status === 403) {
            router.push('/');
        }
        else if (status === 401) {
            logout()
                .then(() => {
                    router.push('/auth/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;