const API = 'http://localhost:4000';

export async function getProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API}/products/${id}`);
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product, rating: product.rating ?? 4.5, showInSlider: product.showInSlider ?? false }),
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product, rating: product.rating ?? 4.5, showInSlider: product.showInSlider ?? false }),
  });
  return res.json();
}

export async function deleteProduct(id) {
  await fetch(`${API}/products/${id}`, { method: 'DELETE' });
}

export async function getCategories() {
  const res = await fetch(`${API}/categories`);
  return res.json();
}

export async function addCategory(category) {
  const res = await fetch(`${API}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  return res.json();
}

export async function deleteCategory(id) {
  await fetch(`${API}/categories/${id}`, { method: 'DELETE' });
} 