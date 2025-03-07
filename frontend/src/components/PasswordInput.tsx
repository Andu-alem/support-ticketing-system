import { Component, ReactNode } from "react"

interface Props {
    label: string
    type: string
    setPassword: (arg: string) => void
}

export default class PasswordInput extends Component<Props> {

    constructor(props: Props) {
      super(props)
    }

    render(): ReactNode {
        const { label, setPassword } = this.props
        return (
            <div className="flex flex-col gap-2">
                <label htmlFor={ label }>{ label }</label>
                <input 
                    className="border border-gray-400 py-2 px-3 focus:border-gray-500 rounded-lg" 
                    id={ label } 
                    type={ this.props.type }
                    onChange={ (e) => setPassword(e.target.value) }
                    autoComplete="false"
                    required />
            </div>
        )
    }
}