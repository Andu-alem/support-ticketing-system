import React, { Component, ReactNode } from "react"
import axios from "axios"

import Form from "../components/Form"
import Input from "../components/Input"
import PasswordInput from "../components/PasswordInput"
import TogglePassword from "../components/TooglePassword"
import Button from "../components/Button"
import LoadingModal from "../components/LodingModal"

import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"
import { Navigate } from "react-router"
import RoleSelect from "../components/RoleSelect"


export default class Login extends Component {
    state = {
        showPassword: false,
        username: '',
        email: '',
        password: '',
        role: 'user',
        confirmPassword: '',
        passwordError: '',
        signupError: '',
        sending: false,
        redirecting: false,
        shouldRedirect: false,
        redirectTo: ''
    }
    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    constructor(props:object) {
        super(props)
    }
    
    setEmail = (email: string) => {
        this.setState({ email })
    }
    setUsername = (username: string) => {
        this.setState({ username })
    }
    setRole = (role: string) => {
        this.setState({ role })
    }
    setPassword = (password: string) => {
        this.setState({ password })
    }
    setConfirmPassword = (confirmPassword: string) => {
        this.setState({ confirmPassword, passwordError: '' })
    }
    
    togglePassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!this.isValidated()) return
        this.setState({ sending: true })
        const { username, email, password, role } = this.state
        
        try {
            const base_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(`${base_url}/auth/signup`, {
                username,
                email,
                password,
                role
            })

            if (response.status === 201) {
                this.setState({ sending: false })
                this.setState({ redirecting: true })
                const base_url = import.meta.env.VITE_BACKEND_URL
                const loginResponse = await axios.post(`${base_url}/auth/login`, {
                    email,
                    password
                })
                if (loginResponse.status === 200) {
                    const { token, role } = loginResponse.data
                    const { setToken, setIsLoggedIn, setUsername, setRole } = this.context
                    localStorage.setItem('token', token)//storing token for persistence
                    // setting the app state with neccessary data
                    setToken(token)
                    setIsLoggedIn(true)
                    setUsername(this.state.username)
                    setRole(role)
                    // redirecting to the dashboard
                    this.setState({ shouldRedirect: true, redirectTo: '/' })
                } else {
                    // if auto loging in did not work redirect user to login page
                    this.setState({ shouldRedirect: true, redirectTo: '/login' })
                }  
            } else {
                throw new Error("Error response")
            }
        } catch {
            this.setState({ sending: false })
            this.setState({ signupError: "Error occred please try again." })
            setTimeout(() => this.setState({ signupError: '' }), 7000)
        }
        
    }

    isValidated = () => {
        const { password } = this.state
        if (password.length < 4) {
            this.setState({ passwordError: "The password must be at 4 characters!" })
            return false
        }
        if (!this.isPasswordMatch()) {
            this.setState({ passwordError: "Password didn't match!" })
            return false
        }
        return true
    }

    isPasswordMatch = () => {
        const { confirmPassword, password } = this.state
        return confirmPassword === password
    }

    render(): ReactNode {
        const { passwordError, signupError, redirecting, shouldRedirect, redirectTo, role } = this.state
        return (
            <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
                { shouldRedirect && <Navigate replace to={ redirectTo } /> }
                <Form onSubmit={ this.submitHandler }>
                    <LoadingModal showModal={ redirecting } />
                    { signupError.length > 0 && <p className="text-red-500 my-2">{ signupError }</p> }
                    <RoleSelect setValue={ this.setRole } role={ role } />
                    <Input type="text" label="Username" setValue={ this.setUsername } />
                    <Input type="email" label="Email" setValue={ this.setEmail } />
                    <PasswordInput 
                        label="Password" 
                        type={ this.state.showPassword ? 'text':'password' }
                        setPassword={ this.setPassword }
                    />
                    <PasswordInput 
                        label="Confirm Password" 
                        type={ this.state.showPassword ? 'text':'password' }
                        setPassword={ this.setConfirmPassword }
                    />
                    { passwordError != '' && (<p className="text-xs text-red-500">{ passwordError }</p>) }
                    <TogglePassword togglePassword={ this.togglePassword }/>
                    <Button animate={ this.state.sending } title="Signup" />
                    <div className="hover:underline cursor-pointer" onClick={ () => this.setState({ shouldRedirect: true, redirectTo: '/login' }) }>
                        Have an account ? Login
                    </div>
                </Form>
            </div>
        )
    }
}