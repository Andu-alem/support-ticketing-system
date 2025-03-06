import { Component, ReactNode } from "react"

interface Props {
    children: React.ReactNode
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default class Form extends Component<Props> {
    propData: Props

    constructor(props: Props) {
        super(props)
        this.propData = props
    }

    render(): ReactNode {
        const { children, onSubmit } = this.props
        return (
            <form 
                className="border border-gray-300 shadow-lg rounded-lg p-10 space-y-3 flex flex-col items-center font-semibold text-gray-800 text-xs"
                onSubmit={ onSubmit }
            >
                { children }
            </form>
        )
    }
}