
interface Props {
    setFilterValue: (arg: string) => void
}

export default function FixedFilterOptions({ setFilterValue }:Props) {
  return (
    <div className="fixed bottom-14 right-4 border border-gray-300 shadow rounded-sm p-4 bg-gray-50 sm:hidden">
        <h3 className="font-semibold">Filter by status</h3>
        <div className="flex flex-col gap-2 py-2">
            <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => setFilterValue('') }>All</span>
            <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => setFilterValue('Open') }>Open</span>
            <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => setFilterValue('InProgress') }>InProgress</span>
            <span className="hover:bg-gray-100 px-3 cursor-pointer" onClick={ () => setFilterValue('Closed') }>Closed</span>
        </div>
    </div>
  )
}
