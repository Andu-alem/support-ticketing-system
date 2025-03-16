import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import LogoutHader from "./LogoutHeader";
import TicketForm from "./TicketForm";


export default function UserSidebar({ refetchTickets }:{ refetchTickets: () => void }) {
    const [showFixedForm, setShowFixedForm] = useState(false)
    
    return (
        <div className="">
            <div className="sticky top-12">
                <LogoutHader />
                <TicketForm className="hidden sm:block" setShowFixedForm={setShowFixedForm} refetchTickets={ refetchTickets } />
                { 
                    showFixedForm && (
                        <div className="sm:hidden w-screen h-screen bg-gray-50 fixed top-0 flex flex-col justify-center items-center">
                            <XIcon className="absolute top-10 right-12 text-indigo-700 border border-indigo-700 rounded-full cursor-pointer" onClick={ () => setShowFixedForm(false) } />
                            <TicketForm className="sm:hidden" setShowFixedForm={setShowFixedForm} refetchTickets={ refetchTickets } />
                        </div>
                    )
                }
                {
                    !showFixedForm && (
                        <div 
                            className="fixed sm:hidden bottom-5 right-5 bg-indigo-700 w-10 h-10 rounded-full flex justify-center items-center hover:opacity-95 cursor-pointer"
                            onClick={ () => setShowFixedForm(true) }
                        >
                            <PlusIcon className="text-white" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}