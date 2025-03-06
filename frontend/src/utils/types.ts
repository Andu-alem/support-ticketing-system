interface User {
    _id: string
    username: string
    email: string
    role: string
    createdAt:string
    updatedAt: string
}
type Issuer = User&string
export interface Ticket {
    _id: string
    title: string
    description: string
    status: string
    issuer: Issuer
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