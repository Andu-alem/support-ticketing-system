import { Component, ReactNode } from "react";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import axios from "axios";
import { PlusIcon, XIcon } from "lucide-react";

import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"
import LogoutHader from "./LogoutHeader";

export default class TicketForm extends Component {
    state = {
        title: '',
        description: '',
        showFixedForm: false
    }

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    setTitle = (title:string) => {
        this.setState({ title })
    }
    setDescription = (description:string) => {
        this.setState({ description })
    }
    updateTickets = async (token:string) => {
        try {
            const { setTicket } = this.context
            const response = await axios.get('http://localhost:3001/tickets',{
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setTicket(response.data.tickets)
        } catch {
            return
        }
    }

    submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { title, description } = this.state
            const { appState } = this.context
            const base_url = import.meta.env.VITE_BACKEND_URL
            await axios.post(`${base_url}/tickets`,{
                title,
                description
            },{
                headers: {
                    Authorization: `Bearer ${ appState.token }`
                }
            })
            this.updateTickets(appState.token)
            this.setState({ showFixedForm: false })
        } catch {
            return
        }
    }

    render(): ReactNode {
        const { showFixedForm } = this.state
        return (
            <div className="">
                <div className="sticky top-12">
                    <LogoutHader />
                    <form className="hidden sm:flex flex-col items-center" onSubmit={ this.submitHandler }>
                        <Input type="text" label="Title" setValue={ this.setTitle } />
                        <TextArea label="Description" setValue={ this.setDescription } />
                        <Button title="Create New" />
                    </form>
                    <div className={`${ showFixedForm ? 'block':'hidden' } sm:hidden w-screen h-screen bg-gray-50 fixed top-0 flex flex-col justify-center items-center`}>
                        <div className="absolute top-10 right-12">
                            <XIcon className="text-indigo-700 border border-indigo-700 rounded-full cursor-pointer" onClick={ () => this.setState({ showFixedForm: false }) } />
                        </div>
                        <form className="flex flex-col items-center" onSubmit={ this.submitHandler }>
                            <Input type="text" label="Title" setValue={ this.setTitle } />
                            <TextArea label="Description" setValue={ this.setDescription } />
                            <Button title="Create New" />
                        </form>
                    </div>
                    <div 
                        className={`${ showFixedForm ? 'hidden':'fixed' } sm:hidden bottom-5 right-5 bg-indigo-700 w-10 h-10 rounded-full flex justify-center items-center hover:opacity-95 cursor-pointer`}
                        onClick={ () => this.setState({ showFixedForm: true }) }
                    >
                        <PlusIcon className="text-white" />
                    </div>
                </div>
            </div>
        ) 
    }
}