import useSWR from 'swr'
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useState } from 'react';

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
    // const [error, setError] = useState("coucou");
    const [otherError, setOtherError] = useState("");
  
    const {data: user, error , mutate} = useSWR('/api/user', () =>
        axiosClient
        .get('/api/user')
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 405) {
            setOtherError(error.response.data.error);
            console.log('error hook :',error.response.data);
          }
          
          
          
          if (error.response.status !== 409) throw error
  
          mutate('/verify-email')
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false
    }
    )
  
    const csrf = () => axiosClient.get('/sanctum/csrf-cookie')
  
    const register = async ({setErrors, ...props}) => {
      await csrf()
      setErrors([])
      axiosClient
        .post('/register', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error
          setErrors(Object.values(error.response.data.errors).flat())
        })
    }
  
    const login = async ({setErrors, setStatus, ...props}) => {
    //   await csrf()
      setErrors([])
      setStatus(null)
      axiosClient
        .post('/api/login', props)
        .then(() => mutate())
        .catch(error => {
          
          if (error.response.status !== 422) throw error
          setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    const logout = async () => {
        if (!error) {
          await axiosClient.post('/api/logout')
          mutate()
        }
        window.location.reload();
      }
  

    return {
        user,
        error,
        otherError,
        register,
        login,
        logout
    };
};