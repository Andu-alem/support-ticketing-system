export interface User {
    _id: string
    username: string
    email: string
    role: string
    createdAt:string
    updatedAt: string
}
export type Issuer = User&string

export interface Ticket {
    _id: string
    title: string
    description: string
    status: string
    issuer: Issuer
    createdAt: Date
    updatedAt: Date
}

export interface UserState {
    token: string
    username: string
    isLoggedIn: boolean
    role: string
}

export interface ContextType {
    userState: UserState
    setUserState: (arg:UserState) => void
}