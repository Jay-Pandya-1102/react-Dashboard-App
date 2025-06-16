const API = 'http://localhost:3001';

export async function fetchProducts() {
    const res = await fetch(`${API}/products`);
    return res.json();
}

export async function fetchProduct(id) {
    const res = await fetch(`${API}/products/${id}`);
    return res.json();
}

export async function fetchCategories() {
    const res = await fetch(`${API}/categories`);
    return res.json();
}

export async function createProduct(product) {
    const res = await fetch(`${API}/products`, {
        method: 'post',
        header: { 'context-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return res.json();
}

export async function updateProduct(id, product) {
    const res = await fetch(`${API}/products/${id}`, {
        method: 'put',
        header: { 'context-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${API}/products/${id}`, {
        method: 'DELETE'
    });
    return res.json();
}