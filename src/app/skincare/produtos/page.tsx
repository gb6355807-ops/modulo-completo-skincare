'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Star, ArrowLeft } from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  skin_types: string[]
  price: number
  rating: number
  image: string
  description: string
}

export default function ProdutosPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser(user)
    }

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('rating', { ascending: false })

      if (error) {
        console.error('Erro ao buscar produtos:', error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    checkUser()
    fetchProducts()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Produtos Skincare
              </h1>
            </div>
            <Link
              href="/skincare"
              className="px-4 py-2 text-gray-600 hover:text-pink-600 transition-colors duration-300 rounded-lg hover:bg-pink-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Produtos Recomendados
          </h2>
          <p className="text-xl text-gray-600">
            Descubra produtos ideais para o seu tipo de pele
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-pink-100"
            >
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                <Package className="w-12 h-12 text-pink-400" />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-pink-600">
                  R$ {product.price.toFixed(2)}
                </p>

                {/* Skin Types */}
                <div className="flex flex-wrap gap-1">
                  {product.skin_types.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum produto encontrado.</p>
          </div>
        )}
      </main>
    </div>
  )
}