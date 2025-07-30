"use client"

import { useEffect, useState } from "react"
import {
  Search,
  ShoppingCart,
  MessageCircle,
  ArrowLeft,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InquiryModal } from "@/components/inquiry-modal"

interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  quantity: number
  imageUrl: string
}

interface CustomerPageProps {
  onNavigate: (view: "home" | "admin" | "customer") => void
}

export function CustomerPage({ onNavigate }: CustomerPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showInquiry, setShowInquiry] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err))
  }, [])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    if (value.trim() === "") {
      fetch("http://localhost:8080/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    } else {
      fetch(`http://localhost:8080/api/products/search?name=${value}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }
  }

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
    if (value === "all") {
      fetch("http://localhost:8080/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    } else {
      fetch(`http://localhost:8080/api/products/category/${value}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showSellForm, setShowSellForm] = useState(false)
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    imageUrl: "",
    price: "",
    description: "",
    notes: ""
  });

  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base">Product Catalog</h1>
                <p className="text-xs text-gray-500">Browse our collection</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSellForm(true)}
                className="h-8 px-3 text-xs"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Become a Seller
              </Button>
              <Button variant="outline" onClick={() => setShowInquiry(true)} className="h-8 px-3 text-xs">
                <MessageCircle className="w-4 h-4 mr-1" />
                Inquiry
              </Button>
              <Button variant="outline" onClick={() => onNavigate("home")} className="h-8 px-3 text-xs">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 text-sm bg-gray-50"
              />
            </div>

            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-50 text-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((category) => category && category.trim() !== "")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-md group overflow-hidden text-sm">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge className="bg-purple-100 text-purple-700">{product.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.5</span>
                    <span className="text-gray-500">(50)</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>

                <div
                  className={`text-white text-xs font-medium inline-block px-2 py-0.5 rounded ${
                    product.quantity < 10 ? "bg-red-600" : "bg-black"
                  }`}
                >
                  {product.quantity} units
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product)
                      setShowInquiry(true)
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                  >
                    Inquire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <Card className="border-0 shadow-lg mt-10">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try a different keyword or category.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <InquiryModal open={showInquiry} onOpenChange={setShowInquiry} product={selectedProduct} />

      {showSellForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch("http://localhost:8080/api/user-products", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });

                  if (response.ok) {
                    alert("Product submitted successfully!");
                    setShowSellForm(false);
                    setFormData({
                      productName: "",
                      category: "",
                      imageUrl: "",
                      price: "",
                      description: "",
                      notes: ""
                    });
                  } else {
                    alert("Failed to submit product.");
                  }
                } catch (error) {
                  console.error("Error submitting product:", error);
                  alert("Error occurred while submitting.");
                }
              }}
              className="space-y-3"
            >
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              ></textarea>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              >
                <option value="">Select category</option>
                <option value="Paintings">Paintings</option>
                <option value="Sketches & Drawings">Sketches & Drawings</option>
                <option value="Earthen Pot Art">Earthen Pot Art</option>
                <option value="Handicrafts & Decor">Handicrafts & Decor</option>
                <option value="Thread & Yarn Decor">Thread & Yarn Decor</option>
                <option value="Artisan Jewelry">Artisan Jewelry</option>
                <option value="Calligraphy & Typography">Calligraphy & Typography</option>
                <option value="Mandala & Dot Art">Mandala & Dot Art</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />

              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border rounded-md p-2 h-20"
              ></textarea>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowSellForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                  Submit Product
                </Button>
              </div>
            </form>

            {/* Close button (optional) */}
            <button
              onClick={() => setShowSellForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
