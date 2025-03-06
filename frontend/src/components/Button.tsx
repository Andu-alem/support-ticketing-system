import { Component, ReactNode } from "react"

interface Props {
    title: string
    className?: string
    animate?: boolean
}

export default class Button extends Component<Props> {

    constructor(props: Props) {
      super(props);
    }

    render(): ReactNode {
        const { title, className, animate } = this.props
        return (
            <button className={`bg-indigo-700 text-gray-50 w-32 h-8 rounded-lg mt-4 hover:opacity-95 cursor-pointer ${ className } ${ animate ? 'animate-pulse':'animate-none' }`}>
                { title }
            </button>
        )
    }
}
