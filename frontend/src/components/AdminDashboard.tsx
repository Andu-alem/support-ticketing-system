import { Component, ReactNode } from "react"

import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"
import StatusManager from "./StatusManager"
import LogoutHader from "./LogoutHeader"
import { PlusIcon } from "lucide-react"

interface State {
    filterValue: string
    showFixedFilter: boolean
}

export default class AdminDashboard extends Component {
    state:State = {
        filterValue: '',
        showFixedFilter: false
    }

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    componentDidMount(): void {
        const { appState } = this.context
        this.setState({ tickets: appState.tickets })
    }

    filterTickets = () => {
        const { appState:{ tickets } } = this.context
        const { filterValue } = this.state
        if (filterValue === '') {
            return tickets
        } else {
            const newTickets = tickets.filter(ticket => ticket.status === filterValue)
            return newTickets
        }
    }


    render(): ReactNode {
        const tickets = this.filterTickets()
        const { showFixedFilter } = this.state
        
        return (
            <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto py-7 min-h-screen flex flex-col sm:flex-row gap-4 text-sm">
                <div className="w-[30%]">
                    <div className="sticky top-12">
                        <LogoutHader />
                        <div className={`${ showFixedFilter ? 'fixed bottom-14 right-4 border border-gray-300 shadow rounded-sm p-4':'hidden' } bg-gray-50 sm:block`}>
                            <h3 className="font-semibold">Filter by status</h3>
                            <div className="flex flex-col gap-2 py-2">
                                <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => this.setState({ filterValue: ''}) }>All</span>
                                <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => this.setState({ filterValue: 'Open'}) }>Open</span>
                                <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => this.setState({ filterValue: 'InProgress'}) }>InProgress</span>
                                <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => this.setState({ filterValue: 'Closed'}) }>Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    {
                        tickets.map((ticket, index) => (
                            <div className="shadow-md p-2 sm:p-5 rounded-md border border-gray-300" key={index}>
                                <div className="flex justify-between border-b border-gray-200">
                                    <h3 className="font-semibold capitalize">{ ticket.title }</h3>
                                    <StatusManager status={ ticket.status } ticketId={ ticket._id } />
                                </div>
                                <p className="font-light mb-2 pr-3">{ ticket.description }</p>
                                <div className="flex justify-between text-xs">
                                    <p>Issued at : { (new Date(ticket.createdAt)).toDateString() }</p>
                                    <p>Issued by : { ticket.issuer.username }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div 
                    className={`fixed sm:hidden bottom-4 right-5 bg-indigo-700 w-10 h-10 rounded-full flex justify-center items-center hover:opacity-95 cursor-pointer`}
                    onClick={ () => this.setState({ showFixedFilter: !showFixedFilter }) }
                >
                    <PlusIcon className="text-white" />
                </div>
            </div>
        )
    }
}