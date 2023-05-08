import pageNotFoundSvg from '../../asset/pageNotFound.svg'

const PageNotFound = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center">
                <img width={330} src={pageNotFoundSvg} alt="" />
                <small className='mt-6 text-base text-cyan-900 font-semibold font-mono'>Requested page not found.</small>
            </div>
        </div>
    )
}

export default PageNotFound