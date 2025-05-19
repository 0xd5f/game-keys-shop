import React, { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../services/api';
import Card from '../components/Card';
import Loader from '../components/Loader';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const filtered = selected ? products.filter(p => p.category === selected) : products;

  return (
    <div className="container mx-auto px-2 py-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button
              className={`px-3 py-1 rounded ${selected === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelected('')}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                className={`px-3 py-1 rounded ${selected === c.name ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelected(c.name)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Categories; 