import React, { useEffect, useState } from "react"
import { Link, Navigate } from "react-router"

import Form from "../components/Form"
import Input from "../components/Input"
import PasswordInput from "../components/PasswordInput"
import TogglePassword from "../components/TooglePassword"
import Button from "../components/Button"
import LoadingModal from "../components/LodingModal"
import useAuth from "../hooks/auth"

enum ErrorType {
    NONE,
    SIGNUP,
    LOGIN
}

export default function Login () {
    const { sending, success, error, login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirecting, setRedirecting] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)


    useEffect(() => {
        if (!success) return
        setRedirecting(true)
        setShouldRedirect(true)
    },[success])

    useEffect(() => {
        if (error === ErrorType.LOGIN) {
            setLoginError('Invalid Credientials')
            setTimeout(() => setLoginError(''), 7000)
        }
    },[error])

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email === '' || password === '') return
        login(email, password)
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
            { shouldRedirect && <Navigate replace to="/" /> }
            <Form onSubmit={ submitHandler }>
                <LoadingModal showModal={ redirecting } message="Logging in..." />
                { loginError.length > 0 && <p className="text-red-500 my-2">{ loginError }</p> }
                <Input type="email" label="Email" setValue={ setEmail } />
                <PasswordInput 
                    label="Password" 
                    type={ showPassword ? 'text':'password' } 
                    setPassword={ setPassword }
                />
                <TogglePassword togglePassword={ togglePassword }/>
                <Button title="Login" animate={ sending } />
                <Link
                    className="hover:underline cursor-pointer"
                    to="/signup" >New ? Signup</Link>
            </Form>
        </div>
    )
}