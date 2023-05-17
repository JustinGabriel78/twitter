import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null) ;
    const { dispatch } = useAuthContext()

    const login =  async(email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post('http://localhost:4000/api/user/login', {email, password });
        
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data.token))
            //update the auth context
            dispatch({type:'LOGIN', payload:response.data})
            setIsLoading(false)
          } catch (error) {
            console.error("eror",error.response.data); // log error details
            setIsLoading(false)
            setError(error.response.data.message)
          }
        



        
    }
    return { login, isLoading, error }
}
