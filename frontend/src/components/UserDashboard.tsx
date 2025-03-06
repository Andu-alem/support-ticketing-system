import { Component, ReactNode } from "react"

import TicketForm from "./TicketForm";
import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"


export default class UserDashboard extends Component {

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType


    render(): ReactNode {
        const { appState:{ tickets } } = this.context
        return (
            <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto py-7 min-h-screen flex flex-col sm:flex-row gap-4 text-sm">
                <TicketForm />
                <div className="flex flex-col gap-4 mt-5">
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
}