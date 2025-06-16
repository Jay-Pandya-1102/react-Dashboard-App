
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { fetchProducts, fetchCategories } from '../api/api'


function Dashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function load() {
            const prods = await fetchProducts();
            const cats = await fetchCategories();
            setProducts(prods);
            setCategories(cats)
        }
        load()
    }, [])

    return (
        <>
            <Header />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Dashboard</h1>
                <p>Total Products : {products.length}</p>
                <p>Categories : {categories.length}</p>
                <h2 className="text-lg mt-4">Latest Products</h2>
                <ul>
                    {
                        products.slice(-5).reverse().map((p) => {
                           return <li key={p.id}>{p.name} - {p.category}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Dashboard
