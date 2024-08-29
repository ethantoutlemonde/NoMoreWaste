import useSWR from 'swr'
import { Navigate } from "react-router-dom";
import axiosClient from "../axios-client";

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {


  
    const {data: user, error, mutate} = useSWR('/api/userAdmin', () =>
        axiosClient
        .get('/api/userAdmin')
        .then(res => res.data)
        .catch(error => {
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
        register,
        login,
        logout
    };
};