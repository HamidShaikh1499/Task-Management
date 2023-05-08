
export default function ConfirmDialog({ onConfirm, onCancel, headerText, message, cancelText = 'NO', confirmText = 'YES' }) {
    return (
        <div className='bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 flex content-center absolute inset-0 justify-center items-center w-screen h-screen z-50'>
            <div className='flex flex-col bg-white md:w-96 w-80 px-3 py-2 rounded-md shadow'>
                <div className='flex flex-row items-center mt-1 justify-between'>
                    <small className='text-cyan-600 font-semibold text-base font-newsreader'>{headerText}</small>
                    <svg onClick={() => onCancel()} className="w-6 h-6 cursor-pointer text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <small className="text-black font-newsreader mt-4 font-normal text-base">{message}</small>

                <div className="flex flex-row space-x-2 mt-6">
                    <small onClick={() => onCancel()} className={'text-xs px-2 py-2 w-full text-center cursor-pointer font-newsreader font-normal border rounded text-red-400 hover:bg-stone-50 active:bg-white'}>{cancelText}</small>
                    <small onClick={() => onConfirm()} className={'text-xs px-2 py-2 w-full text-center cursor-pointer font-newsreader font-normal border rounded text-cyan-600 hover:bg-stone-50 active:bg-white'}>{confirmText}</small>
                </div>
            </div>
        </div>
    )
}