"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Network Performance Report",
    description: "Comprehensive analysis of network performance metrics",
    date: "2024-01-15",
    type: "Performance",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Security Audit Report",
    description: "Security assessment and vulnerability analysis",
    date: "2024-01-10",
    type: "Security",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Bandwidth Utilization Report",
    description: "Monthly bandwidth usage and trends analysis",
    date: "2024-01-08",
    type: "Traffic",
    status: "completed",
    size: "3.2 MB",
  },
]

const metrics = [
  { label: "Average Latency", value: "12ms", change: -5, trend: "down" },
  { label: "Packet Loss", value: "0.02%", change: -15, trend: "down" },
  { label: "Throughput", value: "847 Mbps", change: 12, trend: "up" },
  { label: "Uptime", value: "99.8%", change: 2, trend: "up" },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Network Reports</h1>
            <p className="text-gray-600 mt-1">Generate and download network analysis reports</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"} mt-1`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Download and view previously generated network reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="text-xs text-gray-500">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-500">
                      {report.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Report</CardTitle>
            <CardDescription>Create a new network analysis report with custom parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold">Performance Report</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Analyze network performance metrics, latency, and throughput
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold">Traffic Analysis</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Detailed bandwidth usage and traffic pattern analysis</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold">Security Audit</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Comprehensive security assessment and vulnerability report</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
