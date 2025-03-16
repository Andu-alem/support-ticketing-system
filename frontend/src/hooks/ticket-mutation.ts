import { useState } from "react"
import axios from "axios"
import { useAppContext } from "../utils/context"

export default function useTicketMutation () {
    const { userState:{ token } } = useAppContext()
    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const createTicket = async (title:string, description:string) => {
        try {
            setSending(true)
            const base_url = import.meta.env.VITE_BACKEND_URL
            await axios.post(`${base_url}/tickets`,{
                title,
                description
            },{
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setSending(false)
            setSuccess(true)
        } catch {
            setSending(false)
            setError(true)
            return
        }
    }

    const updateTicketStatus = async (status:string, ticketId:string) => {
        try {
            setSending(true)
            const base_url = import.meta.env.VITE_BACKEND_URL
            await axios.put(`${base_url}/tickets/${ticketId}`,{
                status
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSending(false)
            setSuccess(true)
        } catch {
            setError(true)
            setSending(false)
        }
    }

    return {
        sending,
        error,
        success,
        createTicket,
        updateTicketStatus
    }
}