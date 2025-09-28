'use client'
import React, { useEffect, useState } from 'react'
import {
  Search,
  Filter,
  Grid,
  List,
  Package,
  User,
  Hash,
  Layers,
  Eye,
  ShoppingCart,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { getAllPosts } from '../Auth/Actions/Actions'
interface PostData {
  id: string
  created_at: string
  title: string
  product_name: string
  supplier_id: string
  stock_quantity: number
}
export const SupplierMarketplace = ({
  'data-id': dataId,
}: {
  'data-id'?: string
}) => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSupplier, setSelectedSupplier] = useState('all')
  // Declare getAllPosts function - you'll need to implement this
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])
  const suppliers = [
    'all',
    ...Array.from(new Set(posts.map((p) => p.supplier_id))),
  ]
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.supplier_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSupplier =
      selectedSupplier === 'all' || post.supplier_id === selectedSupplier
    return matchesSearch && matchesSupplier
  })
  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return {
        text: 'Out of Stock',
        color: 'text-red-600 bg-red-50',
      }
    if (quantity < 50)
      return {
        text: 'Low Stock',
        color: 'text-yellow-600 bg-yellow-50',
      }
    return {
      text: 'In Stock',
      color: 'text-green-600 bg-green-50',
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }
  const ProductCard = ({ post }: { post: PostData }) => {
    const stockStatus = getStockStatus(post.stock_quantity)
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 w-fit p-6 pl-3">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {post.product_name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                  Posted {formatDate(post.created_at)}
                </span>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
            >
              {stockStatus.text}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.title}
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-gray-500">
                <Hash className="h-3 w-3" />
                Product ID:
              </span>
              <span className="font-mono text-gray-900 text-xs bg-gray-50 px-2 py-1 rounded">
                {post.id}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-gray-500">
                <Layers className="h-3 w-3" />
                Stock:
              </span>
              <span className="font-semibold text-gray-900">
                {post.stock_quantity} units
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-gray-500">
                <User className="h-3 w-3" />
                Supplier ID:
              </span>
              <span className="font-mono text-gray-900 text-xs bg-gray-50 px-2 py-1 rounded">
                {post.supplier_id}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                <Eye className="h-4 w-4" />
                View Details
              </button>
              <button
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={post.stock_quantity === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const ProductListItem = ({ post }: { post: PostData }) => {
    const stockStatus = getStockStatus(post.stock_quantity)
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.product_name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                    Posted {formatDate(post.created_at)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{post.title}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
              >
                {stockStatus.text}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 text-xs block mb-1">
                  Product ID:
                </span>
                <p className="font-mono text-gray-900 font-medium">{post.id}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 text-xs block mb-1">Stock:</span>
                <p className="font-semibold text-gray-900">
                  {post.stock_quantity} units
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500 text-xs block mb-1">
                  Supplier ID:
                </span>
                <p className="font-mono text-gray-900 font-medium">
                  {post.supplier_id}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={post.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Contact Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 w-full flex items-center justify-center"
        data-id={dataId}
      >
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading Products
          </h3>
          <p className="text-gray-600">
            Please wait while we fetch the latest inventory...
          </p>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div
        className="min-h-screen bg-gray-50 w-full flex items-center justify-center"
        data-id={dataId}
      >
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 w-full" data-id={dataId}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Supplier Marketplace
              </h1>
              <p className="text-gray-600">
                Discover quality agricultural products from verified suppliers
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {filteredPosts.length} products available
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, IDs, or suppliers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier === 'all'
                    ? 'All Suppliers'
                    : `Supplier ${supplier}`}
                </option>
              ))}
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>
        {/* Products */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredPosts.map((post) =>
              viewMode === 'grid' ? (
                <ProductCard key={post.id} post={post} />
              ) : (
                <ProductListItem key={post.id} post={post} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
