
interface Props {
    label: string
    type: string
    setPassword: (arg: string) => void
}

export default function PasswordInput({ label, type, setPassword }: Props) {
  return (
    <div className="flex flex-col gap-2">
        <label htmlFor={ label }>{ label }</label>
        <input 
            className="border border-gray-400 py-2 px-3 focus:border-gray-500 rounded-lg" 
            id={ label } 
            type={ type }
            onChange={ (e) => setPassword(e.target.value) }
            autoComplete="false"
            required />
    </div>
  )
}