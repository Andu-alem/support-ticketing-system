import { useMemo } from "react"

interface Props {
    status: string
}

export default function StatusDisplay({ status }: Props) {
    const color = useMemo(() => {
        return (status === 'Open' ? 'bg-green-500' : status === "Closed" ? 'bg-red-500':'bg-orange-500')
    }, [status])

    return (
        <div className="flex justify-center items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <p className="font-medium text-xs">{ status }</p>
        </div>
    )
}
