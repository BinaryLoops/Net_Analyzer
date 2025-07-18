"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Shield, Zap, AlertTriangle, CheckCircle, Play, Pause, RotateCcw, Clock } from "lucide-react"

// Mock packet data for simulation
const generateMockPacket = () => {
  const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "FTP", "SMTP", "DNS", "ICMP"]
  const sources = ["192.168.1.100", "10.0.0.15", "172.16.0.50", "192.168.0.25"]
  const destinations = ["8.8.8.8", "1.1.1.1", "192.168.1.1", "10.0.0.1"]

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    size: Math.floor(Math.random() * 1500) + 64,
    port: Math.floor(Math.random() * 65535),
    flags: ["SYN", "ACK", "FIN", "PSH"][Math.floor(Math.random() * 4)],
    ttl: Math.floor(Math.random() * 64) + 64,
  }
}

export default function NetworkAnalyzer() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [packets, setPackets] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPackets: 0,
    tcpPackets: 0,
    udpPackets: 0,
    httpPackets: 0,
    avgLatency: 12.5,
    throughput: 847.2,
    errorRate: 0.02,
    uptime: 99.8,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCapturing) {
      interval = setInterval(() => {
        const newPacket = generateMockPacket()
        setPackets((prev) => [newPacket, ...prev.slice(0, 99)]) // Keep last 100 packets

        setStats((prev) => ({
          ...prev,
          totalPackets: prev.totalPackets + 1,
          tcpPackets: newPacket.protocol === "TCP" ? prev.tcpPackets + 1 : prev.tcpPackets,
          udpPackets: newPacket.protocol === "UDP" ? prev.udpPackets + 1 : prev.udpPackets,
          httpPackets: ["HTTP", "HTTPS"].includes(newPacket.protocol) ? prev.httpPackets + 1 : prev.httpPackets,
          avgLatency: Math.random() * 20 + 5,
          throughput: Math.random() * 200 + 750,
        }))
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isCapturing])

  const protocolColors: { [key: string]: string } = {
    TCP: "bg-blue-500",
    UDP: "bg-green-500",
    HTTP: "bg-purple-500",
    HTTPS: "bg-purple-700",
    FTP: "bg-orange-500",
    SMTP: "bg-red-500",
    DNS: "bg-yellow-500",
    ICMP: "bg-gray-500",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Network Protocol Analyzer</h1>
            <p className="text-gray-600 mt-1">Real-time packet analysis and network performance monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsCapturing(!isCapturing)} variant={isCapturing ? "destructive" : "default"}>
              {isCapturing ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isCapturing ? "Stop Capture" : "Start Capture"}
            </Button>
            <Button
              onClick={() => {
                setPackets([])
                setStats((prev) => ({ ...prev, totalPackets: 0, tcpPackets: 0, udpPackets: 0, httpPackets: 0 }))
              }}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packets</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPackets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{isCapturing ? "Capturing..." : "Capture stopped"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgLatency.toFixed(1)}ms</div>
              <Progress value={Math.min(stats.avgLatency * 2, 100)} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Throughput</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.throughput.toFixed(1)} Mbps</div>
              <Progress value={(stats.throughput / 1000) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.errorRate}%</div>
              <p className="text-xs text-muted-foreground">Very Low</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Tabs defaultValue="packets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="packets">Live Packets</TabsTrigger>
            <TabsTrigger value="protocols">Protocol Analysis</TabsTrigger>
            <TabsTrigger value="network">Network Layer</TabsTrigger>
            <TabsTrigger value="transport">Transport Layer</TabsTrigger>
            <TabsTrigger value="application">Application Layer</TabsTrigger>
            <TabsTrigger value="security">Security Analysis</TabsTrigger>
          </TabsList>

          {/* Live Packets Tab */}
          <TabsContent value="packets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Packet Capture</CardTitle>
                <CardDescription>Real-time network packet analysis and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <Badge variant="outline">TCP: {stats.tcpPackets}</Badge>
                      <Badge variant="outline">UDP: {stats.udpPackets}</Badge>
                      <Badge variant="outline">HTTP: {stats.httpPackets}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">Showing last {Math.min(packets.length, 100)} packets</div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b font-mono text-sm grid grid-cols-7 gap-4">
                      <div>Time</div>
                      <div>Protocol</div>
                      <div>Source</div>
                      <div>Destination</div>
                      <div>Size</div>
                      <div>Port</div>
                      <div>Flags</div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {packets.map((packet) => (
                        <div
                          key={packet.id}
                          className="px-4 py-2 border-b font-mono text-sm grid grid-cols-7 gap-4 hover:bg-gray-50"
                        >
                          <div className="text-gray-600">{packet.timestamp}</div>
                          <div>
                            <Badge className={`${protocolColors[packet.protocol]} text-white`}>{packet.protocol}</Badge>
                          </div>
                          <div>{packet.source}</div>
                          <div>{packet.destination}</div>
                          <div>{packet.size} bytes</div>
                          <div>{packet.port}</div>
                          <div>{packet.flags}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Protocol Analysis Tab */}
          <TabsContent value="protocols" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Protocol Distribution</CardTitle>
                  <CardDescription>Analysis of network protocols in captured traffic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries({
                      TCP: stats.tcpPackets,
                      UDP: stats.udpPackets,
                      HTTP: stats.httpPackets,
                      HTTPS: Math.floor(stats.httpPackets * 0.7),
                      DNS: Math.floor(stats.totalPackets * 0.1),
                      FTP: Math.floor(stats.totalPackets * 0.05),
                    }).map(([protocol, count]) => (
                      <div key={protocol} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${protocolColors[protocol]}`}></div>
                          <span className="font-medium">{protocol}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress
                            value={stats.totalPackets > 0 ? (count / stats.totalPackets) * 100 : 0}
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600 w-16 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OSI Layer Analysis</CardTitle>
                  <CardDescription>Traffic breakdown by OSI model layers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { layer: "Application Layer (L7)", protocols: "HTTP, HTTPS, FTP, SMTP", percentage: 45 },
                      { layer: "Transport Layer (L4)", protocols: "TCP, UDP", percentage: 35 },
                      { layer: "Network Layer (L3)", protocols: "IP, ICMP", percentage: 15 },
                      { layer: "Data Link Layer (L2)", protocols: "Ethernet, WiFi", percentage: 5 },
                    ].map((item) => (
                      <div key={item.layer} className="space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{item.layer}</div>
                            <div className="text-sm text-gray-600">{item.protocols}</div>
                          </div>
                          <div className="text-sm font-medium">{item.percentage}%</div>
                        </div>
                        <Progress value={item.percentage} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Network Layer Tab */}
          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>IP Address Analysis</CardTitle>
                  <CardDescription>IPv4 and IPv6 traffic analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">IPv4</div>
                        <div className="text-sm text-gray-600">94.2%</div>
                        <Progress value={94.2} className="mt-2" />
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">IPv6</div>
                        <div className="text-sm text-gray-600">5.8%</div>
                        <Progress value={5.8} className="mt-2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Top Source IPs</h4>
                      {["192.168.1.100", "10.0.0.15", "172.16.0.50"].map((ip, index) => (
                        <div key={ip} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-mono text-sm">{ip}</span>
                          <Badge variant="outline">{Math.floor(Math.random() * 100) + 50} packets</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Routing & Subnetting</CardTitle>
                  <CardDescription>Network topology and routing analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Detected Subnets</h4>
                      {[
                        { subnet: "192.168.1.0/24", hosts: 45, gateway: "192.168.1.1" },
                        { subnet: "10.0.0.0/16", hosts: 23, gateway: "10.0.0.1" },
                        { subnet: "172.16.0.0/20", hosts: 12, gateway: "172.16.0.1" },
                      ].map((subnet) => (
                        <div key={subnet.subnet} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-sm">{subnet.subnet}</span>
                            <Badge variant="outline">{subnet.hosts} hosts</Badge>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">Gateway: {subnet.gateway}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">TTL Analysis</h4>
                      <div className="text-sm text-gray-600">Average TTL: 58 hops</div>
                      <Progress value={58} className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transport Layer Tab */}
          <TabsContent value="transport" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>TCP Analysis</CardTitle>
                  <CardDescription>TCP connection states and flow control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">ESTABLISHED</div>
                        <div className="text-sm text-gray-600">142 connections</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">SYN_SENT</div>
                        <div className="text-sm text-gray-600">23 connections</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">TIME_WAIT</div>
                        <div className="text-sm text-gray-600">8 connections</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Sliding Window Protocol</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Window Size</span>
                          <span className="text-sm font-mono">65535 bytes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Congestion Window</span>
                          <span className="text-sm font-mono">32768 bytes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">RTT</span>
                          <span className="text-sm font-mono">12.5 ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Congestion Control</CardTitle>
                  <CardDescription>TCP congestion control mechanisms analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Congestion Algorithms</h4>
                      {[
                        { algorithm: "Slow Start", usage: 35, color: "bg-blue-500" },
                        { algorithm: "Congestion Avoidance", usage: 45, color: "bg-green-500" },
                        { algorithm: "Fast Recovery", usage: 20, color: "bg-yellow-500" },
                      ].map((item) => (
                        <div key={item.algorithm} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded ${item.color}`}></div>
                            <span className="text-sm">{item.algorithm}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={item.usage} className="w-20" />
                            <span className="text-sm w-8">{item.usage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">QoS Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Jitter:</span>
                          <span className="font-mono">2.1ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Packet Loss:</span>
                          <span className="font-mono">0.02%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bandwidth:</span>
                          <span className="font-mono">847 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delay:</span>
                          <span className="font-mono">12.5ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Application Layer Tab */}
          <TabsContent value="application" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Protocols</CardTitle>
                  <CardDescription>HTTP, FTP, SMTP, DNS analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { protocol: "HTTP/HTTPS", requests: 1247, responses: 1198, errors: 49 },
                      { protocol: "DNS", queries: 342, responses: 338, errors: 4 },
                      { protocol: "FTP", commands: 23, responses: 21, errors: 2 },
                      { protocol: "SMTP", emails: 15, delivered: 14, errors: 1 },
                    ].map((app) => (
                      <div key={app.protocol} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{app.protocol}</span>
                          <Badge variant="outline">{app.errors > 0 ? `${app.errors} errors` : "No errors"}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium text-blue-600">
                              {app.requests || app.queries || app.commands || app.emails}
                            </div>
                            <div className="text-gray-600">Requests</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-green-600">{app.responses || app.delivered}</div>
                            <div className="text-gray-600">Success</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-red-600">{app.errors}</div>
                            <div className="text-gray-600">Errors</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>DNS Analysis</CardTitle>
                  <CardDescription>Domain Name System query analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Top Queried Domains</h4>
                      {[
                        { domain: "google.com", queries: 45, type: "A" },
                        { domain: "cloudflare.com", queries: 32, type: "AAAA" },
                        { domain: "github.com", queries: 28, type: "A" },
                        { domain: "stackoverflow.com", queries: 21, type: "A" },
                      ].map((dns) => (
                        <div key={dns.domain} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-mono text-sm">{dns.domain}</div>
                            <div className="text-xs text-gray-600">Type: {dns.type}</div>
                          </div>
                          <Badge variant="outline">{dns.queries} queries</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">DNS Performance</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Avg Response Time:</span>
                          <span className="font-mono">23ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cache Hit Rate:</span>
                          <span className="font-mono">87%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Analysis Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Threats</CardTitle>
                  <CardDescription>Network security analysis and threat detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="text-sm font-medium">Secure</div>
                        <div className="text-xs text-gray-600">94.2%</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                        <div className="text-sm font-medium">Warnings</div>
                        <div className="text-xs text-gray-600">5.1%</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <Shield className="h-6 w-6 text-red-600 mx-auto mb-1" />
                        <div className="text-sm font-medium">Threats</div>
                        <div className="text-xs text-gray-600">0.7%</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Detected Issues</h4>
                      {[
                        { type: "Port Scan", severity: "Medium", count: 3, color: "text-yellow-600" },
                        { type: "Suspicious Traffic", severity: "Low", count: 7, color: "text-blue-600" },
                        { type: "Failed Auth", severity: "High", count: 1, color: "text-red-600" },
                      ].map((threat) => (
                        <div key={threat.type} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <div className="font-medium">{threat.type}</div>
                            <div className={`text-sm ${threat.color}`}>Severity: {threat.severity}</div>
                          </div>
                          <Badge variant="outline">{threat.count} incidents</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Encryption Analysis</CardTitle>
                  <CardDescription>SSL/TLS and encryption protocol analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">TLS Versions</h4>
                      {[
                        { version: "TLS 1.3", percentage: 65, color: "bg-green-500" },
                        { version: "TLS 1.2", percentage: 30, color: "bg-blue-500" },
                        { version: "TLS 1.1", percentage: 4, color: "bg-yellow-500" },
                        { version: "SSL 3.0", percentage: 1, color: "bg-red-500" },
                      ].map((tls) => (
                        <div key={tls.version} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded ${tls.color}`}></div>
                            <span className="text-sm">{tls.version}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={tls.percentage} className="w-20" />
                            <span className="text-sm w-8">{tls.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Certificate Status</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Valid Certs:</span>
                          <span className="font-mono text-green-600">98.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expired:</span>
                          <span className="font-mono text-red-600">1.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Self-Signed:</span>
                          <span className="font-mono text-yellow-600">0.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revoked:</span>
                          <span className="font-mono text-red-600">0.0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
