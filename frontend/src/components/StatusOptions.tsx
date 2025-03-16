
interface Props {
    updateStatus: (arg: string) => void
}

export default function StatusOptions({ updateStatus }: Props) {
  return (
    <div className="absolute top-5 right-2 bg-gray-50 w-32 flex flex-col gap-2 border border-gray-300 rounded-sm px-3 py-2">
        <h3 className="font-semibold border-b border-gray-200 pb-1">Update Status</h3>
        <span 
            className="hover:bg-gray-100 p-1 cursor-pointer"
            onClick={ () => updateStatus('Open') }
        >Open</span>
        <span 
            className="hover:bg-gray-100 p-1 cursor-pointer"
            onClick={ () => updateStatus('InProgress') }
        >InProgress</span>
        <span 
            className="hover:bg-gray-100 p-1 cursor-pointer"
            onClick={ () => updateStatus('Closed') }
        >Closed</span>
    </div>
  )
}
