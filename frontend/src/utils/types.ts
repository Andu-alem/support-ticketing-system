export interface Ticket {
    _id: string
    title: string
    description: string
    status: string
    issuer: string|object
    createdAt: Date
    updatedAt: Date
}

export interface AppState {
    token: string
    username: string
    isLoggedIn: boolean
    role: string
    tickets: Ticket[]
}

export interface ContextType {
    appState: AppState
    setUsername: (arg:string) => void
    setToken: (arg:string) => void
    setIsLoggedIn: (arg:boolean) => void
    setRole: (arg:string) => void
    setTicket: (arg:Ticket[]) => void
}