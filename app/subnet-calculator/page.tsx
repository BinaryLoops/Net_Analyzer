"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Network, Globe, Router } from "lucide-react"

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("192.168.1.0")
  const [subnetMask, setSubnetMask] = useState("24")
  const [subnets, setSubnets] = useState("4")

  const calculateSubnet = () => {
    const ip = ipAddress.split(".").map(Number)
    const cidr = Number.parseInt(subnetMask)

    if (ip.length !== 4 || ip.some((octet) => octet < 0 || octet > 255) || cidr < 0 || cidr > 32) {
      return null
    }

    const networkBits = cidr
    const hostBits = 32 - networkBits
    const subnetCount = Number.parseInt(subnets)
    const bitsNeeded = Math.ceil(Math.log2(subnetCount))
    const newCidr = networkBits + bitsNeeded
    const hostsPerSubnet = Math.pow(2, 32 - newCidr) - 2

    const results = []
    const increment = Math.pow(2, 32 - newCidr)

    for (let i = 0; i < subnetCount; i++) {
      const networkAddress = (ip[0] << 24) + (ip[1] << 16) + (ip[2] << 8) + ip[3] + i * increment
      const broadcastAddress = networkAddress + increment - 1
      const firstHost = networkAddress + 1
      const lastHost = broadcastAddress - 1

      results.push({
        subnet: i + 1,
        network:
          [
            (networkAddress >>> 24) & 255,
            (networkAddress >>> 16) & 255,
            (networkAddress >>> 8) & 255,
            networkAddress & 255,
          ].join(".") + `/${newCidr}`,
        firstHost: [(firstHost >>> 24) & 255, (firstHost >>> 16) & 255, (firstHost >>> 8) & 255, firstHost & 255].join(
          ".",
        ),
        lastHost: [(lastHost >>> 24) & 255, (lastHost >>> 16) & 255, (lastHost >>> 8) & 255, lastHost & 255].join("."),
        broadcast: [
          (broadcastAddress >>> 24) & 255,
          (broadcastAddress >>> 16) & 255,
          (broadcastAddress >>> 8) & 255,
          broadcastAddress & 255,
        ].join("."),
        hosts: hostsPerSubnet,
      })
    }

    return results
  }

  const results = calculateSubnet()

  const getAddressClass = (ip: string) => {
    const firstOctet = Number.parseInt(ip.split(".")[0])
    if (firstOctet >= 1 && firstOctet <= 126) return "A"
    if (firstOctet >= 128 && firstOctet <= 191) return "B"
    if (firstOctet >= 192 && firstOctet <= 223) return "C"
    if (firstOctet >= 224 && firstOctet <= 239) return "D"
    return "E"
  }

  const isPrivateIP = (ip: string) => {
    const octets = ip.split(".").map(Number)
    return (
      octets[0] === 10 ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 168)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subnet Calculator & Network Designer</h1>
            <p className="text-gray-600 mt-1">IPv4/IPv6 subnetting, VLSM, and network analysis tools</p>
          </div>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Subnet Calculator</TabsTrigger>
            <TabsTrigger value="vlsm">VLSM Designer</TabsTrigger>
            <TabsTrigger value="ipv6">IPv6 Calculator</TabsTrigger>
            <TabsTrigger value="nat">NAT Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Subnet Configuration
                  </CardTitle>
                  <CardDescription>Enter network parameters for subnetting calculation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ip-address">Network Address</Label>
                    <Input
                      id="ip-address"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      placeholder="192.168.1.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subnet-mask">Subnet Mask (CIDR)</Label>
                    <Input
                      id="subnet-mask"
                      value={subnetMask}
                      onChange={(e) => setSubnetMask(e.target.value)}
                      placeholder="24"
                      type="number"
                      min="0"
                      max="32"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subnets">Number of Subnets</Label>
                    <Input
                      id="subnets"
                      value={subnets}
                      onChange={(e) => setSubnets(e.target.value)}
                      placeholder="4"
                      type="number"
                      min="1"
                      max="256"
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Address Class:</span>
                      <Badge variant="outline">Class {getAddressClass(ipAddress)}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Address Type:</span>
                      <Badge variant={isPrivateIP(ipAddress) ? "default" : "secondary"}>
                        {isPrivateIP(ipAddress) ? "Private" : "Public"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Network Summary</CardTitle>
                  <CardDescription>Overview of the network configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{results.length}</div>
                          <div className="text-sm text-gray-600">Subnets</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results[0]?.hosts || 0}</div>
                          <div className="text-sm text-gray-600">Hosts per Subnet</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Original Network:</span>
                          <span className="font-mono">
                            {ipAddress}/{subnetMask}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Subnet Mask:</span>
                          <span className="font-mono">
                            /{Number.parseInt(subnetMask) + Math.ceil(Math.log2(Number.parseInt(subnets)))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Hosts:</span>
                          <span className="font-mono">{(results[0]?.hosts || 0) * results.length}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Enter valid network parameters to see summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Subnet Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Subnet Details</CardTitle>
                  <CardDescription>Detailed breakdown of each subnet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Subnet</th>
                          <th className="text-left p-2">Network Address</th>
                          <th className="text-left p-2">First Host</th>
                          <th className="text-left p-2">Last Host</th>
                          <th className="text-left p-2">Broadcast</th>
                          <th className="text-left p-2">Hosts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((subnet) => (
                          <tr key={subnet.subnet} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">#{subnet.subnet}</td>
                            <td className="p-2 font-mono">{subnet.network}</td>
                            <td className="p-2 font-mono">{subnet.firstHost}</td>
                            <td className="p-2 font-mono">{subnet.lastHost}</td>
                            <td className="p-2 font-mono">{subnet.broadcast}</td>
                            <td className="p-2">{subnet.hosts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="vlsm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  VLSM (Variable Length Subnet Masking)
                </CardTitle>
                <CardDescription>Design efficient networks with variable subnet sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Network Requirements</h4>
                      {[
                        { dept: "Sales", hosts: 50, subnet: "192.168.1.0/26", range: "192.168.1.1 - 192.168.1.62" },
                        {
                          dept: "Engineering",
                          hosts: 30,
                          subnet: "192.168.1.64/27",
                          range: "192.168.1.65 - 192.168.1.94",
                        },
                        { dept: "HR", hosts: 15, subnet: "192.168.1.96/28", range: "192.168.1.97 - 192.168.1.110" },
                        {
                          dept: "Management",
                          hosts: 8,
                          subnet: "192.168.1.112/29",
                          range: "192.168.1.113 - 192.168.1.118",
                        },
                      ].map((dept) => (
                        <div key={dept.dept} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{dept.dept}</span>
                            <Badge variant="outline">{dept.hosts} hosts needed</Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="font-mono">{dept.subnet}</div>
                            <div className="text-gray-600">{dept.range}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">VLSM Benefits</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Efficient IP Usage</div>
                            <div className="text-sm text-gray-600">Minimizes IP address wastage</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Scalable Design</div>
                            <div className="text-sm text-gray-600">Accommodates different subnet sizes</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Hierarchical Routing</div>
                            <div className="text-sm text-gray-600">Supports route summarization</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ipv6" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IPv6 Address Calculator
                </CardTitle>
                <CardDescription>IPv6 addressing, subnetting, and address types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ipv6-address">IPv6 Address</Label>
                        <Input id="ipv6-address" placeholder="2001:db8::/32" defaultValue="2001:db8::/32" />
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">IPv6 Address Types</h4>
                        {[
                          { type: "Unicast", description: "One-to-one communication", example: "2001:db8::1" },
                          { type: "Multicast", description: "One-to-many communication", example: "ff02::1" },
                          { type: "Anycast", description: "One-to-nearest communication", example: "2001:db8::" },
                        ].map((addr) => (
                          <div key={addr.type} className="p-3 border rounded-lg">
                            <div className="font-medium">{addr.type}</div>
                            <div className="text-sm text-gray-600">{addr.description}</div>
                            <div className="font-mono text-sm mt-1">{addr.example}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">IPv6 vs IPv4 Comparison</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Feature</th>
                              <th className="text-left p-2">IPv4</th>
                              <th className="text-left p-2">IPv6</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Address Length</td>
                              <td className="p-2">32 bits</td>
                              <td className="p-2">128 bits</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Address Space</td>
                              <td className="p-2">4.3 billion</td>
                              <td className="p-2">340 undecillion</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Header Size</td>
                              <td className="p-2">20-60 bytes</td>
                              <td className="p-2">40 bytes</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Checksum</td>
                              <td className="p-2">Yes</td>
                              <td className="p-2">No</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-medium">Auto-config</td>
                              <td className="p-2">DHCP</td>
                              <td className="p-2">SLAAC</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  NAT Configuration
                </CardTitle>
                <CardDescription>Network Address Translation setup and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">NAT Types</h4>
                      {[
                        {
                          type: "Static NAT",
                          description: "One-to-one mapping",
                          example: "192.168.1.10 ↔ 203.0.113.10",
                          usage: "Servers, permanent mapping",
                        },
                        {
                          type: "Dynamic NAT",
                          description: "Pool of public IPs",
                          example: "192.168.1.x ↔ 203.0.113.1-10",
                          usage: "Multiple users, temporary",
                        },
                        {
                          type: "PAT (NAPT)",
                          description: "Port-based translation",
                          example: "192.168.1.x:port ↔ 203.0.113.1:port",
                          usage: "Home/office networks",
                        },
                      ].map((nat) => (
                        <div key={nat.type} className="p-4 border rounded-lg">
                          <div className="font-medium text-lg">{nat.type}</div>
                          <div className="text-sm text-gray-600 mt-1">{nat.description}</div>
                          <div className="font-mono text-sm mt-2 p-2 bg-gray-50 rounded">{nat.example}</div>
                          <div className="text-sm text-blue-600 mt-2">Use case: {nat.usage}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">NAT Translation Table</h4>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b font-medium text-sm grid grid-cols-4 gap-2">
                          <div>Inside Local</div>
                          <div>Inside Global</div>
                          <div>Outside Local</div>
                          <div>Outside Global</div>
                        </div>
                        {[
                          { il: "192.168.1.10:1024", ig: "203.0.113.1:1024", ol: "8.8.8.8:53", og: "8.8.8.8:53" },
                          { il: "192.168.1.11:1025", ig: "203.0.113.1:1025", ol: "1.1.1.1:80", og: "1.1.1.1:80" },
                          {
                            il: "192.168.1.12:1026",
                            ig: "203.0.113.1:1026",
                            ol: "208.67.222.222:443",
                            og: "208.67.222.222:443",
                          },
                        ].map((entry, index) => (
                          <div key={index} className="px-4 py-2 border-b text-sm font-mono grid grid-cols-4 gap-2">
                            <div>{entry.il}</div>
                            <div>{entry.ig}</div>
                            <div>{entry.ol}</div>
                            <div>{entry.og}</div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">NAT Benefits & Limitations</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Conserves public IP addresses</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Provides security through obscurity</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-600">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm">Breaks end-to-end connectivity</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-600">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm">Complicates peer-to-peer applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
