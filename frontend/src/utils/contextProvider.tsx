import { Component, ReactNode } from "react"
import { AppContext } from "./context"
import { Ticket, AppState } from "./types"


interface Props {
    children: ReactNode
}

export default class AppContextProvider extends Component<Props> {
    state:AppState = {
        username: '',
        token: '',
        isLoggedIn: false,
        role: '',
        tickets: []
    }
    constructor(props:Props) {
      super(props)
    }
    
    setUsername = (username: string) => {
        this.setState({ username })
    }
    setToken = (token: string) => {
        this.setState({ token })
    }
    setIsLoggedIn = (isLoggedIn: boolean) => {
        this.setState({ isLoggedIn })
    }
    setRole = (role: string) => {
        this.setState({ role })
    }
    setTicket = (tickets:Ticket[]) => {
        this.setState({ tickets })
    }

    render(): ReactNode {
        const value = {
            appState: this.state,
            setUsername: this.setUsername,
            setToken: this.setToken,
            setIsLoggedIn: this.setIsLoggedIn,
            setRole: this.setRole,
            setTicket: this.setTicket
        }
        return (
            <AppContext.Provider value={value}>
                { this.props.children }
            </AppContext.Provider>
        )
    }
}