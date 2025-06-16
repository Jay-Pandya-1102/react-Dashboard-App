import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/api'
import Loader from './Loader'
import PageContainer from './PageContainer'

const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const res = await fetchProducts();
                setProducts(res)
            } catch (err) {
                console.error('Failed to load products', err)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])


    const getCategoryCount = (category) =>
        products.filter(p => p.category === category).length

    return (
        <PageContainer>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-blue-500 text-white p-6 rounded shadow">
                            <h3 className="text-3xl">{products?.length}</h3>
                            <p>Total Products</p>
                        </div>
                        <div className="bg-green-500 text-white p-6 rounded shadow">
                            <h3 className="text-3xl">{getCategoryCount('electronics')}</h3>
                            <p>Electronics</p>
                        </div>
                        <div className="bg-orange-500 text-white p-6 rounded shadow">
                            <h3 className="text-3xl">{getCategoryCount('clothing')}</h3>
                            <p>Clothing</p>
                        </div>
                        <div className="bg-purple-500 text-white p-6 rounded shadow">
                            <h3 className="text-3xl">{getCategoryCount('furniture')}</h3>
                            <p>Furniture</p>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Recent Products</h3>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Category</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...products]
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, 5)
                                    .map((product) => (
                                        <tr key={product.id} className="border-t">
                                            <td className="p-2">{product.name}</td>
                                            <td className="p-2 capitalize">{product.category}</td>
                                            <td className="p-2">${product.price}</td>
                                            <td className="p-2">{product.stockCount}</td>
                                            <td className="p-2">{new Date(product.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </PageContainer>
    )
}

export default Dashboard
