export default function Loader() {
    return (
        <div className='bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 flex content-center absolute inset-0 justify-center items-center w-screen h-screen z-50'>
            <div className='flex flex-col w-auto h-auto justify-center items-center'>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 "></div>
            </div>
        </div>
    )
}