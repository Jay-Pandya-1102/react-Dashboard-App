import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { fetchProducts, fetchCategories } from '../api/api'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchparam, setSearchParam] = useSearchParams();
    const selectedCategory = searchparam.get('category') || '';

    useEffect(() => {
        async function load() {
            const prods = await fetchProducts();
            const cats = await fetchCategories();
            if (selectedCategory) {
                setProducts(prods.filter(p => p.category === selectedCategory));
            } else {
                setProducts(prods);
            }
            setCategories(cats)
        }
        load()
    }, [selectedCategory])

    const catChange = (e) => {
        const cat = e.target.value;
        setSearchParam(cat ? { category: cat } : {})
    }

    return (
        <>
            <Header />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product List</h2>

                <div className="flex flex-wrap gap-4 mb-4">
                    {/* <input
                        type="text"
                        placeholder="Search by name"
                        className="border px-2 py-1 rounded"
                    /> */}
                    <select onChange={catChange}>
                        <option value="">All Categories</option>
                        {categories.map((cat) => {
                            return <option key={cat.id} value={cat.name}>{cat.name}</option>
                        })}
                    </select>
                    <Link
                        to="/add-product"
                        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Product
                    </Link>
                </div>
                <table className="w-full border rounded shadow-sm text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Stock</th>
                            <th className="p-2 border">category</th>
                            <th className="p-2 border">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => {
                                return (
                                    <tr key={product.id} className="hover:bg-grey-50">
                                        <td className="p-2 border">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-2 border">{product.name}</td>
                                        <td className="p-2 border">{product.price}</td>
                                        <td className="p-2 border">{product.stockCount}</td>
                                        <td className="p-2 border">{product.category}</td>
                                        <td className="p-2 border space-x-2">
                                            <Link to={`/products/${product.id}`}  >View</Link>
                                            <Link to={`/add-product/${product.id}/edit`}  >Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default ProductList
