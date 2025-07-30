"use client"

import {
  Package,
  Users,
  BarChart3,
  Shield,
  Search,
  Plus,
  AlertTriangle,
  FileText,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HomePageProps {
  onNavigate: (view: "home" | "admin" | "customer") => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InventoryPro</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onNavigate("customer")}>
                Customer View
              </Button>
              <Button onClick={() => onNavigate("admin")}>Admin Dashboard</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Inventory
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Management
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive inventory management system with separate interfaces for administrators and customers.
              Streamline your inventory processes with real-time tracking, automated alerts, and seamless customer
              interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate("admin")} className="text-lg px-8 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("customer")} className="text-lg px-8 py-3">
                <Users className="w-5 h-5 mr-2" />
                Customer Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">System Features</h3>
            <p className="text-lg text-gray-600">Everything you need to manage inventory efficiently</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Admin Features */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  Admin Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Analytics Overview</p>
                      <p className="text-sm text-gray-600">Total products, low stock alerts, inventory value</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Product Management</p>
                      <p className="text-sm text-gray-600">Add, edit, delete products with stock tracking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Search className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Advanced Filtering</p>
                      <p className="text-sm text-gray-600">Search by name, category, or stock level</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Customer Requests</p>
                      <p className="text-sm text-gray-600">Manage customer inquiries and requests</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Features */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  Customer Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Product Catalog</p>
                      <p className="text-sm text-gray-600">Browse products in clean card layout</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Search className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Smart Search</p>
                      <p className="text-sm text-gray-600">Find products by name or category</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Plus className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Product Inquiries</p>
                      <p className="text-sm text-gray-600">Submit requests for specific products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Real-time Updates</p>
                      <p className="text-sm text-gray-600">Live inventory status and availability</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inventory Management Process */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Inventory Management Process</h3>
            <p className="text-lg text-gray-600">Streamlined workflow for efficient inventory control</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Add Products</h4>
                <p className="text-gray-600 text-sm">
                  Easily add new products with details like name, category, price, and stock quantity
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Track Stock</h4>
                <p className="text-gray-600 text-sm">
                  Monitor inventory levels in real-time with automatic low stock notifications
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Get Alerts</h4>
                <p className="text-gray-600 text-sm">
                  Receive instant notifications when products are running low or out of stock
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Generate Reports</h4>
                <p className="text-gray-600 text-sm">
                  Create detailed reports on inventory value, stock movements, and trends
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InventoryPro?</h3>
            <p className="text-lg text-gray-600">Key benefits for your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Reduce Costs</h4>
                <p className="text-gray-700">
                  Minimize overstocking and stockouts with intelligent inventory tracking and automated alerts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Increase Efficiency</h4>
                <p className="text-gray-700">
                  Streamline operations with automated processes and real-time visibility into your inventory.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Improve Customer Service</h4>
                <p className="text-gray-700">
                  Provide better customer experience with accurate product availability and quick inquiry responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2024 InventoryPro Management System. Streamline your inventory operations.</p>
        </div>
      </footer>
    </div>
  )
}
