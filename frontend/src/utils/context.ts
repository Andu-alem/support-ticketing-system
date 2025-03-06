import { createContext, useContext } from "react"
import { ContextType } from "./types"

const AppContext = createContext<ContextType|null>(null)

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("App context must be used inside app context provider")
    }
    return context
}

export { AppContext, useAppContext }