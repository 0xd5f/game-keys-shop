import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderEnabled, setSliderEnabled] = useState(() => localStorage.getItem('sliderEnabled') !== 'false');

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handler = () => setSliderEnabled(localStorage.getItem('sliderEnabled') !== 'false');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const popular = [...products].filter(p => p.showInSlider).sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 8);

  return (
    <div className="container mx-auto px-2 py-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Game Keys</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {sliderEnabled && popular.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Most Popular</h2>
              <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 10,
                  stretch: 0,
                  depth: 80,
                  modifier: 2,
                  slideShadows: false,
                }}
                grabCursor={true}
                centeredSlides={true}
                spaceBetween={4}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  768: { slidesPerView: 3.2 },
                  1024: { slidesPerView: 4.2 },
                }}
                style={{ paddingBottom: 24 }}
              >
                {popular.map(product => (
                  <SwiperSlide key={product.id} className="!flex !h-auto">
                    <Card product={product} className="w-full h-full" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home; 