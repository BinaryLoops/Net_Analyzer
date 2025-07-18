"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, Calculator, Router, BarChart3, Shield, Network } from "lucide-react"

const navigation = [
  { name: "Protocol Analyzer", href: "/", icon: Activity },
  { name: "Subnet Calculator", href: "/subnet-calculator", icon: Calculator },
  { name: "Routing Protocols", href: "/routing", icon: Router },
  { name: "Error Detection", href: "/error-detection", icon: Shield },
  { name: "Performance", href: "/performance", icon: BarChart3 },
  { name: "Network Tools", href: "/tools", icon: Network },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-xl font-bold text-gray-900">NetAnalyzer</span>
                <div className="text-xs text-gray-500">Professional CN Project</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Computer Networks</p>
              <p className="text-xs text-gray-500">BCSE308L Project</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
