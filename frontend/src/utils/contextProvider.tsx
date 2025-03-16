import { ReactNode, useState } from "react"
import { AppContext } from "./context"

interface Props {
    children: ReactNode
}

export default function AppContextProvider({ children }:Props) {
    const [userState, setUserState] = useState({
        username: '',
        role: '',
        token: '',
        isLoggedIn: false
    })

    return (
        <AppContext.Provider value={{ userState, setUserState }}>
            { children }
        </AppContext.Provider>
    )
}