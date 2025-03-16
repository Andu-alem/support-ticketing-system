import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import TextArea from "./TextArea"
import useTicketMutation from "../hooks/ticket-mutation"

interface Props {
    className?: string
    setShowFixedForm: (arg:boolean) => void
    refetchTickets: () => void 
}

export default function TicketForm({ className, setShowFixedForm, refetchTickets }:Props) {
    const { sending, success, error, createTicket } = useTicketMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        if (!success) return
        refetchTickets()
        setShowFixedForm(false)
    },[success, sending, refetchTickets, setShowFixedForm])

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTicket(title, description)
    }

    return (
        <form className={`flex flex-col items-center ${className}`} onSubmit={ submitHandler }>
            <Input type="text" label="Title" setValue={ setTitle } />
            <TextArea label="Description" setValue={ setDescription } />
            <Button title="Create New" animate={ sending } />
            { error && <p className="text-xs">Oops! Please try again.</p> }
        </form>
    )
}
