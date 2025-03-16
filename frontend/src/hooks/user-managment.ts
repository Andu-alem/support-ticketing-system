import { useEffect, useState } from "react"
import { useAppContext } from "../utils/context"
import axios from "axios"

interface ResponseData {
    token: string
    username: string
    role: string
}

export default function useFetchUser () {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState<ResponseData|null>(null)
    const { setUserState } = useAppContext()

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (!storedToken || storedToken === '') {
            setError(true)
            setLoading(false)
            return
        } 

        const validateToken = async () => {
            try {
                const base_url = import.meta.env.VITE_BACKEND_URL
                const response = await axios.get(`${base_url}/verify_token`,{
                    headers: {
                        Authorization: `Bearer ${ storedToken }`
                    }
                })
                if (response.status === 200) {
                    setData(response.data)
                    setLoading(false)
                } else {
                    // the token is invalid make them login again
                    setError(true)
                    setLoading(false)
                }
            } catch {
                // whatever error happens make them login again
                setError(true)
                setLoading(false)
            }
        }
        validateToken()

    },[])

    useEffect(() => {
        if (data) {
            const { token, username, role } = data
            localStorage.setItem('token', token)
            setUserState({
                token,
                username,
                role,
                isLoggedIn: true
            })
        }
    },[data, setUserState])

    return {
        loading,
        error,
        data
    }
}