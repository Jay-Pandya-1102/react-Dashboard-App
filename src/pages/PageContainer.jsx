
const PageContainer = ({ children }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow p-6">{children}</div>
        </div>
    )
}

export default PageContainer
