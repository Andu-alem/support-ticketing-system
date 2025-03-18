import { useState } from "react"

import { Navigate } from "react-router"
import LoadingModal from "./LodingModal"
import { useAppContext } from "../utils/context"

export default function LogoutHeader() {
    const { userState:{ username }, setUserState } = useAppContext()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [redirecting, setRedirecting] = useState(false)

    const logoutHandler = () => {
        localStorage.removeItem('token')
        setUserState({
            username: '',
            token: '',
            isLoggedIn: false,
            role: ''
        })
        setRedirecting(true)
        setShouldRedirect(true)
    }

    return (
        <div className="fixed top-0 sm:static w-full bg-gray-50 p-5 sm:p-0 flex justify-between sm:pb-2 mb-3 border-b border-gray-300">
            { shouldRedirect && <Navigate replace to="/login" /> }
            <LoadingModal showModal={ redirecting } />
            <span className="font-semibold capitalize">{ username }</span>
            <button 
                className="ring-2 ring-indigo-500 rounded-md px-3 h-6 text-indigo-700 font-semibold hover:bg-indigo-50 cursor-pointer"
                onClick={ logoutHandler }
            >Logout</button>
        </div>
    )
}
