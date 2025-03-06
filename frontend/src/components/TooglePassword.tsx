import { Component } from "react"

interface Props {
    togglePassword: () => void
}

export default class TogglePassword extends Component<Props> {
    
    constructor(props: Props) {
      super(props)
    }

    render() {
        const { togglePassword } = this.props
        return (
            <div className="flex items-center gap-2 w-full">
                <input 
                    className="h-4 w-4" 
                    id="showpassword" 
                    type="checkbox"
                    onChange={ togglePassword } name="Checkbold"/>
                <label htmlFor="showpassword">Show Password</label>
            </div>
        )
    }
}