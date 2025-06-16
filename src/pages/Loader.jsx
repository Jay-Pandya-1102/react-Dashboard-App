const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow text-center">
                <div className="loader mb-2 animate-spin border-t-4 border-blue-500 border-solid rounded-full h-10 w-10 mx-auto"></div>
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loader
