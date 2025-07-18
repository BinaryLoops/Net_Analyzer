"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Router, Server, Wifi, Monitor } from "lucide-react"

export function NetworkTopology() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Network Topology</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-gray-50 rounded-lg p-8">
          {/* Internet */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">WAN</span>
              </div>
              <span className="text-xs mt-1">Internet</span>
            </div>
          </div>

          {/* Core Router */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Router className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs mt-1">Core Router</span>
              <Badge variant="default" className="mt-1 text-xs">
                Online
              </Badge>
            </div>
          </div>

          {/* Switches */}
          <div className="absolute top-40 left-1/4 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Server className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs mt-1">Switch-01</span>
              <Badge variant="default" className="mt-1 text-xs">
                Online
              </Badge>
            </div>
          </div>

          <div className="absolute top-40 right-1/4 transform translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs mt-1">Access Point</span>
              <Badge variant="secondary" className="mt-1 text-xs">
                Warning
              </Badge>
            </div>
          </div>

          {/* End Devices */}
          <div className="absolute bottom-8 left-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs mt-1">PC-01</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-24">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs mt-1">PC-02</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Server className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs mt-1">Server</span>
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Internet to Router */}
            <line x1="50%" y1="20%" x2="50%" y2="30%" stroke="#374151" strokeWidth="2" />

            {/* Router to Switches */}
            <line x1="50%" y1="35%" x2="25%" y2="45%" stroke="#374151" strokeWidth="2" />
            <line x1="50%" y1="35%" x2="75%" y2="45%" stroke="#374151" strokeWidth="2" />

            {/* Switches to End Devices */}
            <line x1="25%" y1="50%" x2="10%" y2="75%" stroke="#374151" strokeWidth="1" />
            <line x1="25%" y1="50%" x2="20%" y2="75%" stroke="#374151" strokeWidth="1" />
            <line x1="75%" y1="50%" x2="90%" y2="75%" stroke="#374151" strokeWidth="1" />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
