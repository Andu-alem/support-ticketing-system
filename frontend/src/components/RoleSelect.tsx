import { Component, ReactNode } from "react"

interface Props {
    role: string
    setValue: (arg: string) => void
}

export default class RoleSelect extends Component<Props> {

    constructor(props: Props) {
      super(props)
    }

    render(): ReactNode {
        const { setValue, role } = this.props
        return (
            <div className="w-full flex justify-between items-center">
                <label htmlFor="role">Choose Role</label>
                <select 
                    className="border border-gray-400 rounded-md px-3 py-1" 
                    name="role" 
                    id="role"
                    value={ role }
                    onChange={ (e) => setValue(e.target.value) }
                >
                    <option className="" value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
        )
    }
}