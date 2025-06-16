import { Link } from 'react-router-dom'

const ProductCard = ({ product, onDelete }) => {
    return (
        <div className="border rounded shadow hover:shadow-lg transition p-4 bg-white flex flex-col justify-between h-full">
            
            <div className="h-48 w-full flex items-center justify-center bg-gray-100 rounded mb-4 overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-contain h-full w-full"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                )}
            </div>

            
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-green-600 font-bold">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stockCount}</p>
                </div>

                
                <div className="flex gap-2 mt-4">
                    <Link to={`/products/${product.id}`} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">View</Link>
                    <Link to={`/add-product/${product.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Edit</Link>
                    <button onClick={() => onDelete(product.id)} className="bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
