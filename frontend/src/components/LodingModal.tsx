
interface Props {
    showModal: boolean
    message?: string
}

export default function LoadingModal ({ showModal, message }: Props) {
    return (
        <div className={`${showModal ? 'flex':'hidden'} fixed top-0 w-screen h-screen bg-gray-100/75 justify-center items-center`}>
            <div className=" flex flex-col items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-indigo-500 to-indigo-700 rounded-full animate-bounce"></div>
                <p>{ message }</p>
            </div>
        </div>
    )
}