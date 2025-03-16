interface Props {
    type: string
    label: string
    setValue: (arg: string) => void
}

export default function Input ({ type, label, setValue }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label}>{ label }</label>
            <input 
                className="border border-gray-400 py-2 px-3 focus:border-gray-500 rounded-lg" 
                id={ label } 
                type={ type }
                onChange={ (e) => setValue(e.target.value) }
                required />
        </div>
    )
}