import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import Loader from '../components/Loader';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyAnim, setBuyAnim] = useState(false);

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="p-4">Not found</div>;

  const image = product.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-pink-100 pb-0 relative animate-fade-in">
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover object-center rounded-b-3xl shadow-xl transition-transform duration-500 animate-fade-in"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'; }}
        />
        <button
          className="absolute left-4 top-4 px-3 py-1 bg-white/80 rounded-full shadow text-blue-600 font-semibold hover:bg-blue-100 active:bg-blue-200 transition-colors z-10 animate-fade-in backdrop-blur"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
      <div className="relative z-10 max-w-md mx-auto -mt-12 sm:-mt-20 flex flex-col min-h-[300px] pb-32">
        <div className="flex-1 flex flex-col w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 items-center border border-gray-100 animate-fade-in-up glass-card">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-200 to-pink-200 shadow mb-2 animate-fade-in-up delay-100">
            <Squares2X2Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900 tracking-tight animate-fade-in-up delay-200 drop-shadow">{product.title}</h2>
          <div className="flex items-center justify-center mb-2 animate-fade-in-up delay-250">
            {[1,2,3,4,5].map(i => (
              <svg
                key={i}
                className={`w-5 h-5 ${product.rating >= i ? 'text-yellow-400' : product.rating >= i - 0.5 ? 'text-yellow-300' : 'text-gray-300'}`}
                fill={product.rating >= i ? 'currentColor' : product.rating >= i - 0.5 ? 'url(#half)' : 'none'}
                stroke="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="currentColor"/>
                    <stop offset="50%" stopColor="white"/>
                  </linearGradient>
                </defs>
                <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">{product.rating?.toFixed(1) ?? '—'}</span>
          </div>
          <div className="flex items-center gap-2 mb-2 animate-fade-in-up delay-300">
            <span className="text-xs uppercase tracking-widest text-gray-400">Category:</span>
            <span className="font-medium text-blue-600 text-sm bg-blue-50 px-2 py-0.5 rounded-full shadow-sm">{product.category}</span>
          </div>
          <div className="w-12 border-t-2 border-blue-200 my-2 animate-fade-in-up delay-350" />
          <p className="mb-6 text-gray-700 text-center text-lg animate-fade-in-up delay-400 leading-relaxed">{product.description}</p>
        </div>
      </div>
      {/* Фиксированный блок с ценой и кнопкой Buy */}
      <div className="fixed left-0 right-0 bottom-16 flex justify-center z-30 animate-fade-in-up delay-600 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 max-w-md w-full mx-auto border border-gray-100 glass-card">
          <span className="text-2xl font-bold text-blue-700 bg-blue-100 px-4 py-1 rounded-full shadow-inner flex-shrink-0">${product.price}</span>
          <button
            className={`flex-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white px-10 py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 relative overflow-hidden group ${buyAnim ? 'animate-bounce' : ''}`}
            onClick={() => { setBuyAnim(true); setTimeout(() => setBuyAnim(false), 600); }}
          >
            <span className="relative z-10 group-hover:tracking-widest transition-all duration-300">Buy</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-up.delay-100 { animation-delay: .1s; }
        .animate-fade-in-up.delay-200 { animation-delay: .2s; }
        .animate-fade-in-up.delay-300 { animation-delay: .3s; }
        .animate-fade-in-up.delay-350 { animation-delay: .35s; }
        .animate-fade-in-up.delay-400 { animation-delay: .4s; }
        .animate-fade-in-up.delay-500 { animation-delay: .5s; }
        .animate-fade-in-up.delay-600 { animation-delay: .6s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        .glass-card { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); border: 1px solid rgba(255,255,255,0.18); }
      `}</style>
    </div>
  );
}

export default Product; 