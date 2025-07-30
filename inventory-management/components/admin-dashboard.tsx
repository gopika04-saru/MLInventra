"use client"

import { useState, useEffect } from "react"
import {
  Home,
  Package,
  Plus,
  Users,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddProductModal } from "@/components/add-product-modal"
import { EditProductModal } from "@/components/edit-product-modal"
import { Eye, Check, X } from "lucide-react"


interface AdminDashboardProps {
  onNavigate: (view: "home" | "admin" | "customer") => void
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Products", id: "products" },
  { icon: Plus, label: "Add Product", id: "add-product" },
  { icon: Users, label: "Customer inquiries", id: "inquiries" },
  { icon: Eye, label: "Customer Product Request", id: "requests" },
]

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [pendingProducts, setPendingProducts] = useState<any[]>([])

  const [totalProducts, setTotalProducts] = useState(0)
  const [lowStockCount, setLowStockCount] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    fetch("https://mlinventra.onrender.com/api/products/count")
      .then((res) => res.json())
      .then(setTotalProducts)

    fetch("https://mlinventra.onrender.com/api/products/stock/low/count")
      .then((res) => res.json())
      .then(setLowStockCount)

    fetch("https://mlinventra.onrender.com/api/products/total-value")
      .then((res) => res.json())
      .then(setTotalValue)
  }, [])

  useEffect(() => {
    let url = "https://mlinventra.onrender.com/api/products"

    if (searchTerm) {
      url = `https://mlinventra.onrender.com/api/products/search?name=${searchTerm}`
    } else if (categoryFilter !== "all") {
      url = `https://mlinventra.onrender.com/api/products/category/${categoryFilter}`
    } else if (stockFilter !== "all") {
      url = `https://mlinventra.onrender.com/api/products/stock?level=${stockFilter}`
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err))
  }, [searchTerm, categoryFilter, stockFilter])

  useEffect(() => {
    if (activeTab === "inquiries") {
      fetch("https://mlinventra.onrender.com/api/inquiries")
        .then((res) => res.json())
        .then(setInquiries)
        .catch((err) => console.error("Failed to fetch inquiries:", err))
    }
  }, [activeTab])

  useEffect(() => {
    fetch("https://mlinventra.onrender.com/api/products/pending")
      .then((res) => res.json())
      .then(setPendingProducts)
      .catch(() => alert("Failed to fetch pending approvals"))
  }, [])

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [acceptPrice, setAcceptPrice] = useState('');
  const [acceptQuantity, setAcceptQuantity] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const openAcceptModal = (id: number) => {
    setSelectedProductId(id);
    setShowAcceptModal(true);
  };
  const submitAcceptProduct = async () => {
    try {
      const response = await fetch(`https://mlinventra.onrender.com/api/products/accept/${selectedProductId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: parseFloat(acceptPrice),
          quantity: parseInt(acceptQuantity),
        }),
      });

      if (response.ok) {
        alert("Product accepted successfully!");
        setPendingProducts(prev =>
          prev.filter(product => product.id !== selectedProductId)
        );
        setShowAcceptModal(false);
        setAcceptPrice('');
        setAcceptQuantity('');
        setSelectedProductId(null);
      } else {
        alert("Failed to accept product.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while accepting product.");
    }
  };

  const rejectProduct = async (id:number) => {
    try {
      const response = await fetch(`https://mlinventra.onrender.com/api/products/reject/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert("Product rejected.");
        setPendingProducts(prev =>
          prev.filter(product => product.id !== id)
        );
      } else {
        alert("Failed to reject product.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while rejecting product.");
    }
  };

  const filteredProducts = products

  const categories = [...new Set(products.map((p) => p.category))]

  const [recentProducts, setRecentProducts] = useState<any[]>([])

  useEffect(() => {
    fetch("https://mlinventra.onrender.com/api/products/recent?limit=6")
      .then((res) => res.json())
      .then(setRecentProducts)
  }, [])

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    fetch(`https://mlinventra.onrender.com/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => p.id !== id))
        } else {
          alert("Failed to delete product.")
        }
      })
      .catch(() => alert("Network error. Could not delete product."))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">InventoryPro</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "add-product") {
                    setShowAddModal(true)
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => onNavigate("home")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">Overview of your inventory system</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Products</p>
                        <p className="text-3xl font-bold mt-2">{totalProducts}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-blue-100">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm font-medium">Low Stock Items</p>
                        <p className="text-3xl font-bold mt-2">{lowStockCount}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-red-100">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm">Needs attention</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Total Value</p>
                        <p className="text-3xl font-bold mt-2">${totalValue.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-green-100">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+8% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Products */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 mx-auto mb-2 rounded-lg object-cover"
                        />
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                  <p className="text-gray-600 mt-1">Manage your product inventory</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-0 bg-gray-50"
                      />
                    </div>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-48 border-0 bg-gray-50">
                        <SelectValue placeholder="Filter by category" />
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

                    <Select value={stockFilter} onValueChange={setStockFilter}>
                      <SelectTrigger className="w-48 border-0 bg-gray-50">
                        <SelectValue placeholder="Filter by stock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stock Levels</SelectItem>
                        <SelectItem value="low">Low Stock</SelectItem>
                        <SelectItem value="normal">Normal Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-100">
                        <TableHead className="font-semibold">Product</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Price</TableHead>
                        <TableHead className="font-semibold">Stock</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className={`hover:bg-gray-50 ${product.lowStock ? "bg-red-50/50" : ""}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                {product.lowStock && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <AlertTriangle className="w-3 h-3 text-red-500" />
                                    <span className="text-xs text-red-600">Low Stock</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-gray-100">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">${product.price}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-white text-xs font-medium ${
                                product.quantity < 10 ? "bg-red-600" : "bg-black"
                              }`}
                            >
                              {product.quantity} units
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customer inquiries</h1>
                <p className="text-gray-600 mt-1">Manage customer inquiries and requests</p>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  {inquiries.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                      <p className="text-gray-500">Customer inquiries will appear here once submitted.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiries.map((inquiry) => (
                          <TableRow key={inquiry.id}>
                          <TableCell>{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                          <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span
                              className={`font-bold text-lg ${
                                inquiry.priority === "High"
                                  ? "text-red-500"
                                  : inquiry.priority === "Medium"
                                  ? "text-blue-500"
                                  : inquiry.priority === "Low"
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                              title={inquiry.priority}
                            >
                              ●
                            </span>
                          </TableCell>
                        </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "requests" && (
          <div className="max-w-4xl mx-auto px-2 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Pending Product Approvals ({pendingProducts.length})
            </h1>

            <div className="space-y-6">
              {pendingProducts.map((product) => (
                <Card key={product.id} className="border-l-4 border-yellow-500 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-36 h-36 object-cover rounded"
                      />

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">{product.productName}</h2>
                        <p className="text-gray-600">Category: {product.category}</p>
                        <p className="text-gray-700 font-medium">₹{product.price}</p>
                        <p className="text-gray-500 text-sm">{product.description}</p>
                        <p className="text-gray-500 italic">{product.notes}</p>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Submitted at: {new Date(product.submittedAt).toLocaleString()}
                        </Badge>
                        <div className="flex gap-4 mt-4">
                          <Button
                            onClick={() => openAcceptModal(product.id)}
                            className="bg-green-600 hover:bg-green-700"
                            >
                            <Check className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button variant="destructive" onClick={() => rejectProduct(product.id)}>
                              <X className="w-4 h-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Accept Overlay */}
            {showAcceptModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg w-[400px] space-y-4">
                  <h3 className="text-xl font-bold mb-2">Enter Price & Quantity</h3>
                  <Input
                    type="number"
                    placeholder="Auto-predicted-price"
                    value={acceptPrice}
                    onChange={(e) => setAcceptPrice(e.target.value)}
                  />
                  <small className="text-gray-500">This price is auto-suggested by ML. You can edit it.</small>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={acceptQuantity}
                    onChange={(e) => setAcceptQuantity(e.target.value)}
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <Button
                      className="bg-gray-300 text-black"
                      onClick={() => setShowAcceptModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 text-white"
                      onClick={submitAcceptProduct}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        </div>
      </div>

      <AddProductModal open={showAddModal} onOpenChange={setShowAddModal} />
      <EditProductModal
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
      />
    </div>
  )
}
