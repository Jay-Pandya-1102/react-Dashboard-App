import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../api/api'
import Loader from './Loader'
import PageContainer from './PageContainer'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProduct(id)
            .then(res => setProduct(res))
            .finally(() => setLoading(false))
    }, [id])

    if (loading || !product) return <Loader />

    return (
        <PageContainer>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Details</h2>
                <div>
                    <Link to="/products" className="btn bg-gray-500 text-white px-4 py-2 rounded mr-2">Back to List</Link>
                    <Link to={`/add-product/${product.id}/edit`} className="btn bg-blue-600 text-white px-4 py-2 rounded">Edit Product</Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="object-contain h-full w-full rounded" />
                    ) : (
                        <span className="text-gray-500">No Image</span>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>
                    <div className="text-xl text-green-600 font-bold mb-4">${product.price}</div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-sm text-gray-500 font-semibold">Category</div>
                            <div className="mt-1">{product.category}</div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-sm text-gray-500 font-semibold">Stock Count</div>
                            <div className="mt-1">{product.stockCount} units</div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-sm text-gray-500 font-semibold">Date Added</div>
                            <div className="mt-1">{new Date(product.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-sm text-gray-500 font-semibold">Status</div>
                            <div className="mt-1 text-green-600 font-medium">
                                {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default ProductDetail
