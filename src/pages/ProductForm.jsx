import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createProduct, fetchProduct, updateProduct } from '../api/api'
import Loader from './Loader'
import PageContainer from './PageContainer'

const ProductForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stockCount: '',
    })

    console.log(id)

    const isEdit = (id != undefined) ? true : false;

    useEffect(() => {
        const load = async () => {
            if (id) {
                setLoading(true)
                try {
                    const res = await fetchProduct(id)
                    setProduct(res)
                } catch (err) {
                    alert('Product not found or error loading it.')
                } finally {
                    setLoading(false)
                }
            }
        }
        load()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEdit) {
                await updateProduct(id, product)
                toast.success('Product updated successfully!')
            } else {
                await createProduct({ ...product, createdAt: new Date().toISOString() })
                toast.success('Product added successfully!')
            }
            navigate('/products')
        } catch {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    console.log(isEdit)

    return (
        <PageContainer>
            <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows={4} />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required className="w-full p-2 border rounded" />
                <input type="number" name="stockCount" value={product.stockCount} onChange={handleChange} placeholder="Stock Count" required className="w-full p-2 border rounded" />
                <input type="url" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">{isEdit ? 'Update' : 'Add'} Product</button>
            </form>
        </PageContainer>
    )
}

export default ProductForm
