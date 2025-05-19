import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } from '../services/api';
import Toast from './Toast';

function AdminPanel({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '', image: '', rating: '', showInSlider: false });
  const [catName, setCatName] = useState('');
  const [toast, setToast] = useState('');
  const [sliderEnabled, setSliderEnabled] = useState(() => localStorage.getItem('sliderEnabled') !== 'false');

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('sliderEnabled', sliderEnabled);
  }, [sliderEnabled]);

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(await getProducts());
    setToast('Product deleted');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProduct(editing, form);
      setToast('Product updated');
    } else {
      await addProduct(form);
      setToast('Product added');
    }
    setProducts(await getProducts());
    setEditing(null);
    setForm({ title: '', price: '', description: '', category: '', image: '', rating: '', showInSlider: false });
  };

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    await addCategory({ name: catName });
    setCategories(await getCategories());
    setCatName('');
    setToast('Category added');
  };

  const handleCategoryDelete = async (id) => {
    await deleteCategory(id);
    setCategories(await getCategories());
    setToast('Category deleted');
  };

  const handleSliderToggle = () => setSliderEnabled(v => !v);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Toast message={toast} onClose={() => setToast('')} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={onLogout} className="text-red-600">Logout</button>
      </div>
      <form onSubmit={handleSubmit} className="mb-6 grid gap-2">
        <input required placeholder="Title" className="border px-2 py-1 rounded" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <input required placeholder="Price" type="number" className="border px-2 py-1 rounded" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
        <input required placeholder="Rating (1-5)" type="number" min="1" max="5" step="0.1" className="border px-2 py-1 rounded" value={form.rating ?? ''} onChange={e => setForm(f => ({ ...f, rating: e.target.value ? parseFloat(e.target.value) : '' }))} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.showInSlider} onChange={e => setForm(f => ({ ...f, showInSlider: e.target.checked }))} />
          Show in slider
        </label>
        <textarea required placeholder="Description" className="border px-2 py-1 rounded" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <select required className="border px-2 py-1 rounded" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
          <option value="">Select category</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <input required placeholder="Image URL" className="border px-2 py-1 rounded" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
        <button className="bg-blue-600 text-white py-2 rounded">{editing ? 'Update' : 'Add'} Product</button>
        {editing && <button type="button" className="text-gray-500" onClick={() => { setEditing(null); setForm({ title: '', price: '', description: '', category: '', image: '', rating: '', showInSlider: false }); }}>Cancel</button>}
      </form>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <form onSubmit={handleCategoryAdd} className="flex gap-2 mb-2">
          <input required placeholder="New category" className="border px-2 py-1 rounded" value={catName} onChange={e => setCatName(e.target.value)} />
          <button className="bg-green-600 text-white px-3 rounded">Add</button>
        </form>
        <ul className="flex flex-wrap gap-2">
          {categories.map(c => (
            <li key={c.id} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
              {c.name}
              <button className="text-red-500 ml-1" onClick={() => handleCategoryDelete(c.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <input type="checkbox" id="sliderEnabled" checked={sliderEnabled} onChange={handleSliderToggle} />
        <label htmlFor="sliderEnabled" className="select-none cursor-pointer">Enable slider on main page</label>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Products</h3>
        <ul className="grid gap-2">
          {products.map(p => (
            <li key={p.id} className="bg-white rounded shadow p-2 flex justify-between items-center">
              <div>
                <div className="font-semibold flex items-center gap-2">{p.title} <span className="text-xs text-yellow-500">★ {p.rating?.toFixed(1) ?? '—'}</span>
                  <input type="checkbox" checked={!!p.showInSlider} readOnly className="ml-2" title="Show in slider" />
                </div>
                <div className="text-xs text-gray-500">{p.category}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600" onClick={() => handleEdit(p)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel; 