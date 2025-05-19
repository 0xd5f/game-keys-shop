import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

function Card({ product, className = '' }) {
  const navigate = useNavigate();
  const image = product.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80';
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col cursor-pointer overflow-hidden min-w-0 ${className}`}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ minHeight: 240, maxWidth: 260, height: '100%', width: '100%' }}
    >
      <img
        src={image}
        alt={product.title}
        className="w-full h-32 object-cover object-center bg-gray-100"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80'; }}
        loading="lazy"
      />
      <div className="flex-1 flex flex-col px-4 py-3 gap-1">
        <div className="flex items-center justify-between mb-1">
          <div className="text-base font-semibold text-gray-900 truncate" title={product.title}>{product.title}</div>
          <button
            className="ml-2 p-1 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            aria-label="Details"
            tabIndex={0}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-1 mb-1">
          {[1,2,3,4,5].map(i => (
            <svg
              key={i}
              className={`w-4 h-4 ${product.rating >= i ? 'text-yellow-400' : product.rating >= i - 0.5 ? 'text-yellow-300' : 'text-gray-300'}`}
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
          <span className="ml-1 text-xs text-gray-500">{product.rating?.toFixed(1) ?? '—'}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-blue-700 font-bold text-lg">${product.price}</span>
          {product.category && (
            <span className="text-xs bg-blue-50 text-blue-600 rounded px-2 py-0.5 border border-blue-100 font-medium ml-2 truncate max-w-[80px]">{product.category}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card; 