import { Component, ReactNode } from "react"

interface Props {
    label: string
    setValue: (arg: string) => void
}

export default class TextArea extends Component<Props> {

    constructor(props: Props) {
      super(props)
    }

    render(): ReactNode {
        const { label, setValue } = this.props
        return (
            <div className="flex flex-col gap-2">
                <label htmlFor={label}>{ label }</label>
                <textarea
                    className="border border-gray-400 py-2 px-3 focus:border-gray-500 rounded-lg resize-none"
                    name="description" 
                    id={ label } 
                    cols={ 23 } 
                    rows={ 5 }
                    onChange={ (e) => setValue(e.target.value) }
                    required />
            </div>
        )
    }
}