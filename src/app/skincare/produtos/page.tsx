'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Heart, Star, ShoppingBag, Filter, Search, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  skinTypes: string[];
  price: number;
  rating: number;
  image: string;
  recommended?: boolean;
}

export default function ProdutosPage() {
  const [skinType] = useState<string>('mista');
  const [savedProducts, setSavedProducts] = useState<string[]>(['1', '3']);

  const products: Product[] = [
    {
      id: '1',
      name: 'Sérum Vitamina C 20%',
      brand: 'SkinGlow',
      category: 'Sérum',
      skinTypes: ['oleosa', 'mista', 'normal'],
      price: 89.90,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      recommended: true
    },
    {
      id: '2',
      name: 'Hidratante Ácido Hialurônico',
      brand: 'HydraLux',
      category: 'Hidratante',
      skinTypes: ['seca', 'normal', 'sensivel'],
      price: 79.90,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
      recommended: true
    },
    {
      id: '3',
      name: 'Protetor Solar FPS 60',
      brand: 'SunCare',
      category: 'Protetor Solar',
      skinTypes: ['oleosa', 'mista', 'normal', 'seca', 'sensivel'],
      price: 69.90,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      recommended: true
    },
    {
      id: '4',
      name: 'Tônico Facial Calmante',
      brand: 'PureBalance',
      category: 'Tônico',
      skinTypes: ['sensivel', 'seca', 'normal'],
      price: 59.90,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      name: 'Esfoliante Suave',
      brand: 'GentleGlow',
      category: 'Esfoliante',
      skinTypes: ['oleosa', 'mista', 'normal'],
      price: 49.90,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop'
    },
    {
      id: '6',
      name: 'Máscara Facial Detox',
      brand: 'PureSkin',
      category: 'Máscara',
      skinTypes: ['oleosa', 'mista'],
      price: 54.90,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop'
    }
  ];

  const toggleSave = (productId: string) => {
    setSavedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const recommendedProducts = products.filter(p => p.recommended);
  const otherProducts = products.filter(p => !p.recommended);

  return (
    <SkincareLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Produtos Recomendados
          </h1>
          <p className="text-gray-600 mt-2">Selecionados especialmente para pele {skinType}</p>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-pink-300 focus:outline-none"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-pink-300 transition-colors">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Banner de Tipo de Pele */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Seu Tipo de Pele: {skinType.charAt(0).toUpperCase() + skinType.slice(1)}</h3>
              <p className="text-white/90 text-sm">Produtos selecionados com base no seu perfil</p>
            </div>
          </div>
        </div>

        {/* Produtos Recomendados */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold text-gray-800">Recomendados para Você</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => toggleSave(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedProducts.includes(product.id)
                          ? 'fill-pink-500 text-pink-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold">
                    Recomendado
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">(245 avaliações)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-800">
                      R$ {product.price.toFixed(2)}
                    </div>
                    <button className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outros Produtos */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Outros Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => toggleSave(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedProducts.includes(product.id)
                          ? 'fill-pink-500 text-pink-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">(128 avaliações)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-800">
                      R$ {product.price.toFixed(2)}
                    </div>
                    <button className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos Salvos */}
        {savedProducts.length > 0 && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
              <h3 className="text-xl font-bold text-gray-800">
                {savedProducts.length} {savedProducts.length === 1 ? 'Produto Salvo' : 'Produtos Salvos'}
              </h3>
            </div>
            <p className="text-gray-700">
              Acesse seus produtos favoritos a qualquer momento na sua lista de salvos!
            </p>
          </div>
        )}
      </div>
    </SkincareLayout>
  );
}
