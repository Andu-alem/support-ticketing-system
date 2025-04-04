
interface Props {
    children: React.ReactNode
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function Form ({ children, onSubmit }: Props) {
    return (
        <form 
            className="border border-gray-300 shadow-lg rounded-lg p-10 space-y-3 flex flex-col items-center font-semibold text-gray-800 text-xs"
            onSubmit={ onSubmit }
            role="form"
        >
            { children }
        </form>
    )
}