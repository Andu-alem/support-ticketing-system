import { Component, ReactNode } from "react"
import { AppContext } from "../utils/context"
import { ContextType } from "../utils/types"

import { Navigate } from "react-router"
import LoadingModal from "../components/LodingModal"
import axios from "axios"
import UserDashboard from "../components/UserDashboard"
import AdminDashboard from "../components/AdminDashboard"

interface State {
    loading: boolean
    shouldRedirect: boolean
    redirectTo: string
}

export default class Dashboard extends Component {
    state:State = {
        loading: true,
        shouldRedirect: false,
        redirectTo: ''
    }

    static contextType?: React.Context<ContextType|null> = AppContext
    declare context:ContextType

    componentDidMount(): void {
        const savedToken = localStorage.getItem("token")
        if (!savedToken) {
            this.setState({ shouldRedirect: true, redirectTo: '/login' })
            return
        }
        const { appState } = this.context
        if (appState.isLoggedIn) {
            this.fetchTickets(appState.token)
            this.setState({ loading: false })
        } else {
            //revalidate token and ask for a user data
            this.validateToken(savedToken)
        }
    }

    fetchTickets = async (token:string) => {
        try {
            const { setTicket } = this.context
            const base_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.get(`${base_url}/tickets`,{
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            console.log("We are here andi", response.data)
            setTicket(response.data.tickets)
        } catch {
            return
        }
    }

    validateToken = async (token:string) => {
        try {
            const response = await axios.get('http://localhost:3001/verify_token',{
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            if (response.status === 200) {
                const { token, username, role } = response.data
                const { setIsLoggedIn, setRole, setToken, setUsername } = this.context
                localStorage.setItem('token', token)
                setToken(token)
                setRole(role)
                setIsLoggedIn(true)
                setUsername(username)
                this.fetchTickets(token)
                this.setState({ loading: false })
            } else {
                // the token is invalid make them login again
                this.setState({ shouldRedirect: true, redirectTo: '/login' })
            }
        } catch {
            // whatever error happens make them login again
            this.setState({ shouldRedirect: true, redirectTo: '/login' })
        }
    }

    render(): ReactNode {
        const { loading, shouldRedirect, redirectTo } = this.state
        const { appState } = this.context
        return loading ? (
            <>
                <LoadingModal showModal={ loading } message="Loading..." />
                { shouldRedirect && <Navigate replace to={ redirectTo } /> }
            </>
        ) : (
            <div className="w-full bg-gray-50">
                {
                    appState.role === 'admin' ? (
                        <AdminDashboard />
                    ) : (
                        <UserDashboard />
                    )
                }
            </div>
        )
    }
}