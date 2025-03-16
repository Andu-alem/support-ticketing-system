import { PlusIcon } from "lucide-react"

interface Props {
    toggleFixedFilter: () => void
}

export default function AdminFloatingButton ({ toggleFixedFilter }:Props) {
  return (
    <div 
        className={`fixed sm:hidden bottom-4 right-5 bg-indigo-700 w-10 h-10 rounded-full flex justify-center items-center hover:opacity-95 cursor-pointer`}
        onClick={ toggleFixedFilter }
    >
        <PlusIcon className="text-white" />
    </div>
  )
}
