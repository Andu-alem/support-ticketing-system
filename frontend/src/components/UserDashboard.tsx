import UserSidebar from "./UserSidebar"
import useFetchTicket from "../hooks/ticket-query"
import { Navigate } from "react-router"
import LoadingModal from "./LodingModal"

export default function UserDashboard () {
    const { loading, error, tickets, refetchTickets } = useFetchTicket()

    if (error) {
        return (<Navigate replace to='/login' />)
    }

    if (loading) {
        return (<LoadingModal showModal={ loading } message="Loading..." />)
    }

    return (
        <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto py-7 min-h-screen flex flex-col sm:flex-row gap-4 text-sm">
            <UserSidebar refetchTickets={ refetchTickets } />
            <div className="flex flex-col gap-4 mt-5">
                { tickets.length < 1 && (<div>No ticket found please create new</div>) }
                {
                    tickets.map((ticket, index) => (
                        <div className="shadow-md p-2 sm:p-5 rounded-md border border-gray-300" key={index}>
                            <h3 className="font-semibold capitalize">{ ticket.title }</h3>
                            <p className="font-light">{ ticket.description }</p>
                            <div className="flex justify-between">
                                <p>{ (new Date(ticket.createdAt)).toDateString() }</p>
                                <p>Status : { ticket.status }</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}