import { Component, ReactNode } from "react"

import { Navigate } from "react-router"
import LoadingModal from "./LodingModal"
import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"

export default class LogoutHader extends Component {
    state = {
        shouldRedirect: false,
        redirectTo: '',
        redirecting: false
    }

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    logoutHandler = () => {
        const { setToken, setIsLoggedIn } = this.context
        localStorage.removeItem('token')
        setToken('')
        setIsLoggedIn(false)
        this.setState({ redirecting: true, shouldRedirect: true, redirectTo: '/login' })
    }

    render(): ReactNode {
        const { shouldRedirect, redirectTo, redirecting } = this.state
        return (
            <div className="fixed top-0 sm:static w-full bg-gray-50 p-5 sm:p-0 flex justify-between sm:pb-2 mb-3 border-b border-gray-300">
                { shouldRedirect && <Navigate replace to={ redirectTo } /> }
                <LoadingModal showModal={ redirecting } />
                <span className="font-semibold capitalize">{ this.context.appState.username }</span>
                <button 
                    className="ring-2 ring-indigo-500 rounded-md px-3 h-6 text-indigo-700 font-semibold hover:bg-indigo-50 cursor-pointer"
                    onClick={ this.logoutHandler }
                >Logout</button>
            </div>
        )
    }
}