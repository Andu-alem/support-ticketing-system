import { useState, useEffect, useCallback } from "react"
import { useAppContext } from "../utils/context"
import axios from "axios"
import { Ticket } from "../utils/types"

export default function useFetchTicket () {
    const { userState:{ token } } = useAppContext()
    const [loading, setLoading] = useState(true)
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [error, setError] = useState(false)

    const fetchTickets = useCallback( async () => {
            try {
                if (token == '') return
                const base_url = import.meta.env.VITE_BACKEND_URL
                const response = await axios.get(`${base_url}/tickets`,{
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                setTickets(response.data.tickets)
                setLoading(false)
            } catch {
                setLoading(false)
                setError(true)
            }
    },[token])

    useEffect(() => {
        fetchTickets()
    },[fetchTickets])

    

    return {
        loading,
        error,
        tickets,
        refetchTickets: fetchTickets
    }
}