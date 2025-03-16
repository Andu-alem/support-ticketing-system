import { useEffect, useState } from "react"
import { Ticket } from "../utils/types"

import LogoutHader from "./LogoutHeader"
import FixedFilterOptions from "./FixedFilterOptions"
import FilterOptions from "./FilterOptions"
import AdminFloatingButton from "./AdminFloatingButton"
import AdminTicketCard from "./AdminTicketCard"
import useFetchTicket from "../hooks/ticket-query"
import { Navigate } from "react-router"
import LoadingModal from "./LodingModal"


export default function AdminDashboard() {
    const { loading, error, tickets, refetchTickets } = useFetchTicket()
    const [filterValue, setFilterValue] = useState('')
    const [showFixedFilter, setShowFixedFilter] = useState(false)
    const [filterdTickets, setFilterdTickets] = useState<Ticket[]>([])

    useEffect(() => {
        let filterdTickets:Ticket[]
        if (filterValue === '') {
            filterdTickets = tickets
        } else {
            filterdTickets = tickets.filter(ticket => ticket.status === filterValue)
        }
        setFilterdTickets(filterdTickets)
    },[tickets, filterValue])

    const toggleFixedFilter = () => {
        setShowFixedFilter(!showFixedFilter)
    }

    if (error) {
        return (<Navigate replace to='/login' />)
    }

    if (loading) {
        return (<LoadingModal showModal={ loading } message="Loading..." />)
    }

    return (
        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto py-7 min-h-screen flex flex-col sm:flex-row gap-4 text-sm">
            <div className="w-[30%]">
                <div className="sticky top-12">
                    <LogoutHader />
                    <FilterOptions setFilterValue={ setFilterValue } />
                    { showFixedFilter && (<FixedFilterOptions setFilterValue={ setFilterValue } />)}
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-5">
                {
                    filterdTickets.map((ticket, index) => (
                        <AdminTicketCard ticket={ ticket } key={ index } refetchTickets={ refetchTickets } />
                    ))
                }
            </div>
            <AdminFloatingButton toggleFixedFilter={ toggleFixedFilter } />
        </div>
    )
}
