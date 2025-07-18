"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Router, Play, Pause } from "lucide-react"

export function RoutingProtocols() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [convergenceTime, setConvergenceTime] = useState(0)

  const routingTable = [
    { destination: "192.168.1.0/24", nextHop: "10.0.0.1", metric: 1, protocol: "OSPF", interface: "eth0" },
    { destination: "192.168.2.0/24", nextHop: "10.0.0.2", metric: 2, protocol: "OSPF", interface: "eth1" },
    { destination: "10.0.0.0/8", nextHop: "Direct", metric: 0, protocol: "Connected", interface: "eth0" },
    { destination: "172.16.0.0/16", nextHop: "10.0.0.3", metric: 3, protocol: "RIP", interface: "eth2" },
    { destination: "0.0.0.0/0", nextHop: "10.0.0.1", metric: 1, protocol: "Static", interface: "eth0" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Router className="h-5 w-5" />
            Routing Protocol Analysis
          </CardTitle>
          <CardDescription>Compare Link State and Distance Vector routing protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comparison">Protocol Comparison</TabsTrigger>
              <TabsTrigger value="ospf">OSPF (Link State)</TabsTrigger>
              <TabsTrigger value="rip">RIP (Distance Vector)</TabsTrigger>
              <TabsTrigger value="simulation">Route Simulation</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Link State Protocols</CardTitle>
                    <CardDescription>OSPF, IS-IS</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Convergence Speed</span>
                        <Badge variant="default" className="bg-green-500">
                          Fast
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Memory Usage</span>
                        <Badge variant="secondary">High</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CPU Usage</span>
                        <Badge variant="secondary">High</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Scalability</span>
                        <Badge variant="default" className="bg-green-500">
                          Excellent
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Loop Prevention</span>
                        <Badge variant="default" className="bg-green-500">
                          Built-in
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Complete network topology knowledge</li>
                        <li>• Dijkstra's shortest path algorithm</li>
                        <li>• Hierarchical network design</li>
                        <li>• Fast convergence after topology changes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Distance Vector Protocols</CardTitle>
                    <CardDescription>RIP, EIGRP</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Convergence Speed</span>
                        <Badge variant="destructive">Slow</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Memory Usage</span>
                        <Badge variant="default" className="bg-green-500">
                          Low
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CPU Usage</span>
                        <Badge variant="default" className="bg-green-500">
                          Low
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Scalability</span>
                        <Badge variant="secondary">Limited</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Loop Prevention</span>
                        <Badge variant="secondary">Split Horizon</Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Simple configuration and operation</li>
                        <li>• Bellman-Ford algorithm</li>
                        <li>• Periodic route updates</li>
                        <li>• Count-to-infinity problem</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ospf" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>OSPF Areas</CardTitle>
                    <CardDescription>Hierarchical network design</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { area: "Area 0 (Backbone)", routers: 4, type: "Backbone", color: "bg-red-500" },
                        { area: "Area 1", routers: 8, type: "Standard", color: "bg-blue-500" },
                        { area: "Area 2", routers: 6, type: "Standard", color: "bg-green-500" },
                        { area: "Area 10", routers: 3, type: "Stub", color: "bg-yellow-500" },
                      ].map((area) => (
                        <div key={area.area} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${area.color}`}></div>
                            <div>
                              <div className="font-medium">{area.area}</div>
                              <div className="text-sm text-gray-600">{area.type} Area</div>
                            </div>
                          </div>
                          <Badge variant="outline">{area.routers} routers</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>OSPF LSA Types</CardTitle>
                    <CardDescription>Link State Advertisement types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { type: "Type 1", name: "Router LSA", description: "Router links within area" },
                        { type: "Type 2", name: "Network LSA", description: "Multi-access network links" },
                        { type: "Type 3", name: "Summary LSA", description: "Inter-area routes" },
                        { type: "Type 4", name: "ASBR Summary", description: "ASBR location" },
                        { type: "Type 5", name: "External LSA", description: "External routes" },
                      ].map((lsa) => (
                        <div key={lsa.type} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{lsa.type}</span>
                            <Badge variant="outline">{lsa.name}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">{lsa.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rip" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>RIP Versions</CardTitle>
                    <CardDescription>Evolution of RIP protocol</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          version: "RIPv1",
                          features: ["Classful routing", "Broadcast updates", "No authentication"],
                          status: "Legacy",
                        },
                        {
                          version: "RIPv2",
                          features: ["Classless routing", "Multicast updates", "Authentication support"],
                          status: "Current",
                        },
                        {
                          version: "RIPng",
                          features: ["IPv6 support", "Link-local addresses", "IPSec authentication"],
                          status: "IPv6",
                        },
                      ].map((rip) => (
                        <div key={rip.version} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-lg">{rip.version}</span>
                            <Badge variant={rip.status === "Current" ? "default" : "outline"}>{rip.status}</Badge>
                          </div>
                          <ul className="text-sm space-y-1">
                            {rip.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>RIP Timers</CardTitle>
                    <CardDescription>Protocol timing mechanisms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { timer: "Update Timer", value: "30 seconds", description: "Regular route updates" },
                        { timer: "Invalid Timer", value: "180 seconds", description: "Route becomes invalid" },
                        { timer: "Hold-down Timer", value: "180 seconds", description: "Suppress route updates" },
                        { timer: "Flush Timer", value: "240 seconds", description: "Remove route from table" },
                      ].map((timer) => (
                        <div key={timer.timer} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{timer.timer}</div>
                            <div className="text-sm text-gray-600">{timer.description}</div>
                          </div>
                          <Badge variant="outline" className="font-mono">
                            {timer.value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="simulation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Routing Table</CardTitle>
                  <CardDescription>Current routing table entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsSimulating(!isSimulating)}
                          variant={isSimulating ? "destructive" : "default"}
                          size="sm"
                        >
                          {isSimulating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                          {isSimulating ? "Stop" : "Start"} Simulation
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">Convergence Time: {convergenceTime}ms</div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b font-medium text-sm grid grid-cols-5 gap-4">
                        <div>Destination</div>
                        <div>Next Hop</div>
                        <div>Metric</div>
                        <div>Protocol</div>
                        <div>Interface</div>
                      </div>
                      {routingTable.map((route, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 border-b text-sm font-mono grid grid-cols-5 gap-4 hover:bg-gray-50"
                        >
                          <div>{route.destination}</div>
                          <div>{route.nextHop}</div>
                          <div>{route.metric}</div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {route.protocol}
                            </Badge>
                          </div>
                          <div>{route.interface}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
