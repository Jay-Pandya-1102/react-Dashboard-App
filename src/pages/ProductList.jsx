import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
    fetchProducts,
    deleteProduct,
} from '../api/api'
import ProductCard from './ProductCard'
import Loader from './Loader'
import PageContainer from './PageContainer'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const [loading, setLoading] = useState(false)

   
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 3

    const loadProducts = async () => {
        setLoading(true)
        const res = await fetchProducts()
        setProducts(res)
        setFiltered(res)
        setLoading(false)
    }

    const applyFilters = () => {
        let temp = [...products]

        if (search)
            temp = temp.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )

        if (category) temp = temp.filter((p) => p.category === category)

        if (minPrice) temp = temp.filter((p) => Number(p.price) >= Number(minPrice))
        if (maxPrice) temp = temp.filter((p) => Number(p.price) <= Number(maxPrice))

        if (sort === 'price-low-high')
            temp.sort((a, b) => Number(a.price) - Number(b.price))
        if (sort === 'price-high-low')
            temp.sort((a, b) => Number(b.price) - Number(a.price))
        if (sort === 'newest')
            temp.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )

        setFiltered(temp)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await deleteProduct(id)
            toast.success('Product deleted.')
            loadProducts()
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [search, category, sort, minPrice, maxPrice])


    
    const indexOfLast = currentPage * productsPerPage
    const indexOfFirst = indexOfLast - productsPerPage
    const currentProducts = filtered.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filtered.length / productsPerPage)

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    return (
        <PageContainer>
            <h2 className="text-2xl font-bold mb-6">Product List</h2>

            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="px-3 py-2 border rounded w-[200px]"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 border rounded"
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="furniture">Furniture</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-2 border rounded"
                >
                    <option value="">Sort by</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                </select>

                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="px-2 py-2 border rounded w-[80px]"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="px-2 py-2 border rounded w-[80px]"
                    />
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid md:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => paginate(page)}
                                    className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </PageContainer>
    )
}

export default ProductList
