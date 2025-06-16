import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, fetchProduct, updateProduct } from "../api/api";


function ProductForm() {
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        stockCount: ''
    })
    const isEdit = Boolean(id);

    useEffect(() => {
        async function load() {
            const prods = await fetchProduct(id);
            setProduct(prods);
        }
        load()
    }, [id])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.price || !product.category || !product.stockCount) {
            toast.error("All fileds are required!");
            return;
        }

        if (isEdit) {
            const data = updateProduct(id, product);
            if (data) {
                navigate('/products')
            } else {
                console.error('Failed to add product!');
            }
        } else {
            try {
                const res = await createProduct(product);
                if (res) {
                    toast.success('Product has been added!');
                    navigate('/products')
                } else {
                    toast.error('Failed to add product!');

                }
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong!")
            }
        }
    }

    const handleChange = (e) => {
        setProduct({
            ...product, [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
                <h2 className="text-xl font-bold md-4">Add New Product</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Product Price"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Product Category"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="stockCount"
                        value={product.stockCount}
                        onChange={handleChange}
                        placeholder="Product Stock"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                        {isEdit ? `Update Product` : `Add Product`}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ProductForm
