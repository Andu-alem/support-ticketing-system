import React, { useEffect, useState } from "react"

import Form from "../components/Form"
import Input from "../components/Input"
import PasswordInput from "../components/PasswordInput"
import TogglePassword from "../components/TooglePassword"
import Button from "../components/Button"
import LoadingModal from "../components/LodingModal"

import { Link, Navigate } from "react-router"
import RoleSelect from "../components/RoleSelect"
import useAuth from "../hooks/auth"

enum ErrorType {
    NONE,
    SIGNUP,
    LOGIN
}

export default function Signup (){
    const {sending, error, success, signUp} = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('user')
    const [redirecting, setRedirecting] = useState(false)
    const [signupError, setSignupError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [redirectTo, setRedirectTo] = useState('')

    
    useEffect(() => {
        if (success) {
            // redirecting to the dashboard
            setRedirecting(true)
            setShouldRedirect(true)
            setRedirectTo('/')
            return
        }
    },[success])

    useEffect(() => {
        if (error === ErrorType.SIGNUP) {
            setSignupError("Error occred please try again.")
            setTimeout(() => setSignupError(''), 7000)
        }
        
        if (error === ErrorType.LOGIN) {
            setRedirecting(true)
            setShouldRedirect(true)
            setRedirectTo('/login')
            return
        }
    },[error])

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isValidated()) return

        signUp(username, email, password, role)        
    }

    const isValidated = () => {
        if (password.length < 4) {
            setPasswordError("The password must be at 4 characters!")
            return false
        }
        if (!isPasswordMatch()) {
            setPasswordError("Password didn't match!")
            return false
        }
        return true
    }

    const isPasswordMatch = () => {
        return confirmPassword === password
    }

    
    return (
        <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
            { shouldRedirect && <Navigate replace to={ redirectTo } /> }
            <Form onSubmit={ submitHandler }>
                <LoadingModal showModal={ redirecting } />
                { signupError.length > 0 && <p className="text-red-500 my-2">{ signupError }</p> }
                <RoleSelect setValue={ setRole } role={ role } />
                <Input type="text" label="Username" setValue={ setUsername } />
                <Input type="email" label="Email" setValue={ setEmail } />
                <PasswordInput 
                    label="Password" 
                    type={ showPassword ? 'text':'password' }
                    setPassword={ setPassword }
                />
                <PasswordInput 
                    label="Confirm Password" 
                    type={ showPassword ? 'text':'password' }
                    setPassword={ setConfirmPassword }
                />
                { passwordError != '' && (<p className="text-xs text-red-500">{ passwordError }</p>) }
                <TogglePassword togglePassword={ togglePassword }/>
                <Button animate={ sending } title="Signup" />
                <Link 
                    className="hover:underline cursor-pointer" 
                    to="/login" 
                    >Already have account ? Login</Link>
            </Form>
        </div>
    )   
}