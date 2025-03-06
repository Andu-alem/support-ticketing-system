import React, { Component, ReactNode } from "react"
import axios from "axios"
import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"
import { Navigate } from "react-router"

import Form from "../components/Form"
import Input from "../components/Input"
import PasswordInput from "../components/PasswordInput"
import TogglePassword from "../components/TooglePassword"
import Button from "../components/Button"
import LoadingModal from "../components/LodingModal"


export default class Login extends Component {
    state = {
        showPassword: false,
        email: '',
        password: '',
        sending: false,
        shouldRedirect: false,
        redirectTo: '',
        loginError: '',
        redirecting: false
    }
    
    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    setEmail = (email: string) => {
        this.setState({ email })
    }
    setPassword = (password: string) => {
        this.setState({ password })
    }

    submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = this.state
        if (email === '' || password === '') return
        this.setState({ sending: true })
        try {
            const base_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(`${base_url}/auth/login`,{
                email,
                password
            })
            if (response.status === 200) {
                this.setState({ sending: false, redirecting: true })
                const { token, role, username } = response.data
                const { setIsLoggedIn, setRole, setUsername, setToken } = this.context
                localStorage.setItem('token', token)
                setToken(token)
                setRole(role)
                setUsername(username)
                setIsLoggedIn(true)
                this.setState({ shouldRedirect: true, redirectTo: '/' })
            } else {
                throw new Error("Login error")
            }
        }  catch {
            this.setState({ sending: false })
            this.setState({ loginError: 'Invalid Credientials' })
            setTimeout(() => this.setState({ loginError: '' }), 7000)
        }
    }

    togglePassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    render(): ReactNode {
        const { loginError, shouldRedirect, redirectTo, redirecting, sending } = this.state
        return (
            <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
                { shouldRedirect && <Navigate replace to={ redirectTo } /> }
                <Form onSubmit={ this.submitHandler }>
                    <LoadingModal showModal={ redirecting } />
                    { loginError.length > 0 && <p className="text-red-500 my-2">{ loginError }</p> }
                    <Input type="email" label="Email" setValue={ this.setEmail } />
                    <PasswordInput 
                        label="Password" 
                        type={ this.state.showPassword ? 'text':'password' } 
                        setPassword={ this.setPassword }
                    />
                    <TogglePassword togglePassword={ this.togglePassword }/>
                    <Button title="Login" animate={ sending } />
                    <div className="hover:underline cursor-pointer" onClick={ () => this.setState({ shouldRedirect: true, redirectTo: '/signup' }) }>
                        New ? Signup
                    </div>
                </Form>
            </div>
        )
    }
}