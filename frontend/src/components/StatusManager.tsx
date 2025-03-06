import { Component, ReactNode } from "react"

import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"
import { DotIcon } from "lucide-react"
import axios from "axios"

interface Props {
    status: string
    ticketId: string
}

export default class StatusManager extends Component<Props> {
    state = {
        showOptions: false,
        redirectTo: '',
        redirecting: false
    }

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    updateStatus = async (status: string) => {
        try {
            const { ticketId } = this.props
            const { appState:{ token } } = this.context
            const response = await axios.put(`http://localhost:3001/tickets/${ticketId}`,{
                status
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) this.updateTickets(status)
        } catch {
            //
        }
    }
    updateTickets = (status: string) => {
        const { appState:{ tickets }, setTicket } = this.context
        const { ticketId } = this.props
        this.setState({ showOptions: false })
        const updatedTickets = tickets.map(ticket => {
            if (ticket._id === ticketId) {
                return {
                    ...ticket,
                    status
                }
            }
            return ticket
        })
        setTicket(updatedTickets)
    }

    render(): ReactNode {
        const { status } = this.props
        const { showOptions } = this.state
        const color = status === 'Open' ? 'bg-green-500' : status === "Closed" ? 'bg-red-500':'bg-orange-500'
        return (
            <div className="flex gap-5 justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <p className="font-medium text-xs">{ status }</p>
                </div>
                <div className="relative">
                    <div className="-space-y-[17px] cursor-pointer text-indigo-700 hover:text-indigo-300" onClick={ () => this.setState({ showOptions: !showOptions }) }>
                        <DotIcon />
                        <DotIcon />
                        <DotIcon />
                    </div>
                    <div className={`${ showOptions ? 'absolute':'hidden' } top-5 right-2 bg-gray-50 w-32 flex flex-col gap-2 border border-gray-300 rounded-sm px-3 py-2`}>
                        <h3 className="font-semibold border-b border-gray-200 pb-1">Update Status</h3>
                        <span 
                            className="hover:bg-gray-100 p-1 cursor-pointer"
                            onClick={ () => this.updateStatus('Open') }
                        >Open</span>
                        <span 
                            className="hover:bg-gray-100 p-1 cursor-pointer"
                            onClick={ () => this.updateStatus('InProgress') }
                        >InProgress</span>
                        <span 
                            className="hover:bg-gray-100 p-1 cursor-pointer"
                            onClick={ () => this.updateStatus('Closed') }
                        >Closed</span>
                    </div>
                </div>
            </div>
        )
    }
}