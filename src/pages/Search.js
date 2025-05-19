import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import Card from '../components/Card';

function Search() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container mx-auto px-2 py-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <input
        className="w-full mb-4 px-3 py-2 border rounded"
        placeholder="Search games..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Search; 