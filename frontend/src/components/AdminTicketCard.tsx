import { Ticket } from "../utils/types"
import StatusManager from "./StatusManager"

interface Props {
    ticket: Ticket
    refetchTickets: () => void
}

export default function AdminTicketCard({ ticket, refetchTickets }:Props) {
    return (
        <div className="shadow-md p-2 sm:p-5 rounded-md border border-gray-300">
            <div className="flex justify-between border-b border-gray-200 p-2">
                <h3 className="font-semibold capitalize">{ ticket.title }</h3>
                <StatusManager 
                    status={ ticket.status } 
                    ticketId={ ticket._id }
                    refetchTickets={ refetchTickets } />
            </div>
            <p className="mb-2 p-3 capitalize">{ ticket.description }</p>
            <div className="flex justify-between font-medium text-xs p-2 border-t border-zinc-300">
                <p>Issued at : { (new Date(ticket.createdAt)).toDateString() }</p>
                <p className="capitalize">Issued by : { ticket.issuer.username }</p>
            </div>
        </div>
    )
}
