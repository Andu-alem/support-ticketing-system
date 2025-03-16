import { useEffect, useState } from "react"

import OptionsButton from "./OptionsButton"
import StatusOptions from "./StatusOptions"
import StatusDisplay from "./StatusDisplay"
import useTicketMutation from "../hooks/ticket-mutation"

interface Props {
    status: string
    ticketId: string,
    refetchTickets: () => void
}

export default function StatusManager({ status, ticketId, refetchTickets }: Props) {
    const { sending, success, updateTicketStatus } = useTicketMutation()
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        if (!success) return
        setShowOptions(false)
        refetchTickets()
    },[success, refetchTickets, sending])

    const updateStatus = async (status: string) => {
        await updateTicketStatus(status, ticketId)
    }  

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }

    return (
        <div className="flex gap-5 justify-center items-center">
            <StatusDisplay status={ status } />
            <div className="relative">
                <OptionsButton openOptions={ toggleOptions } />
                { showOptions && <StatusOptions updateStatus={ updateStatus } /> }
            </div>
        </div>
    )
}