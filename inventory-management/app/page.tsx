"use client"

import { useState } from "react"
import { HomePage } from "@/components/home-page"
import { AdminDashboard } from "@/components/admin-dashboard"
import { CustomerPage } from "@/components/customer-page"

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "admin" | "customer">("home")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentView === "home" && <HomePage onNavigate={setCurrentView} />}
      {currentView === "admin" && <AdminDashboard onNavigate={setCurrentView} />}
      {currentView === "customer" && <CustomerPage onNavigate={setCurrentView} />}
    </div>
  )
}
