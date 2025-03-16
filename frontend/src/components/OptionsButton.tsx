import { DotIcon } from "lucide-react"

interface Props {
    openOptions: () => void
}

export default function OptionsButton({ openOptions }: Props) {
  return (
    <div className="-space-y-[17px] cursor-pointer text-indigo-700 hover:text-indigo-300" onClick={ openOptions }>
        <DotIcon />
        <DotIcon />
        <DotIcon />
    </div>
  )
}
