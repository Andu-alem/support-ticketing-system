import { useState } from "react"
import axios from "axios"

enum ErrorType {
    NONE,
    SIGNUP,
    LOGIN
}

export default function useAuth() {
    const [sending, setSending] = useState(false)
    const [error, setError] = useState<ErrorType>(ErrorType.NONE)
    const [success, setSuccess] = useState(false)

    const signUp = async (username:string, email:string, password:string, role:string) => {
        try {
            setSending(true)
            const base_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(`${base_url}/auth/signup`, {
                username,
                email,
                password,
                role
            })

            if (response.status === 201) {
                login(email, password)
                 
            } else {
                throw new Error("Error response")
            }
        } catch {
            setSending(false)
            setError(ErrorType.SIGNUP)
        }
    }

    const login = async (email:string, password:string) => {
        setSending(true)
        try {
            const base_url = import.meta.env.VITE_BACKEND_URL
            const loginResponse = await axios.post(`${base_url}/auth/login`, {
                email,
                password
            })
            if (loginResponse.status === 200) {
                const { token } = loginResponse.data
                localStorage.setItem('token', token)//storing token for persistence
                // setting the app state with neccessary data
                setSending(false)
                setSuccess(true)

            }
        } catch {
            // if auto loging in did not work redirect user to login page
            setSending(false)
            setError(ErrorType.LOGIN)  
        }
    }

    return {
        sending,
        error,
        success,
        signUp,
        login
    }
}