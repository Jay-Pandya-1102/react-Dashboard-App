import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { fetchProduct } from '../api/api'

function ProductDetail() {
    const { id } = useParams()
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function load() {
            const prods = await fetchProduct(id);
            setProducts(prods);
        }
        load()
    }, [id])

    return (
        <>
            <Header />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                <div className="border rounded-lg p-4 shadow-md">
                    <img src={products.imageUrl} className="h-48 object-cover mb-4 w-48" />
                    <p><strong>Name:</strong> {products.name}</p>
                    <p><strong>Description:</strong> {products.description}</p>
                    <p><strong>Price:</strong> {products.price}</p>
                    <p><strong>Category:</strong> {products.category}</p>
                    <p><strong>Stock:</strong> {products.stockCount}</p>

                    <button
                        className="p-1 mt-4 bg-yellow-500"
                        onClick={() => navigate(`/products/edit/${products.id}`)}
                    >
                        Edit Product
                    </button><br/>
                    <button
                        className="p-1 mt-4 bg-yellow-500"
                        onClick={() => navigate(`/products`)}
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
