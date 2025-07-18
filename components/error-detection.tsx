"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, CheckCircle, XCircle } from "lucide-react"

export function ErrorDetection() {
  const [hammingInput, setHammingInput] = useState("")
  const [crcInput, setCrcInput] = useState("")
  const [checksumInput, setChecksumInput] = useState("")

  // Hamming Code Calculator
  const calculateHamming = (data: string) => {
    if (!data || !/^[01]+$/.test(data)) return null

    const dataBits = data.split("").map(Number)
    const m = dataBits.length
    let r = 0

    // Calculate number of parity bits needed
    while (Math.pow(2, r) < m + r + 1) {
      r++
    }

    // Create hamming code array
    const hammingCode = new Array(m + r).fill(0)
    let dataIndex = 0

    // Place data bits
    for (let i = 1; i <= m + r; i++) {
      if (!isPowerOfTwo(i)) {
        hammingCode[i - 1] = dataBits[dataIndex++]
      }
    }

    // Calculate parity bits
    for (let i = 0; i < r; i++) {
      const parityPos = Math.pow(2, i)
      let parity = 0

      for (let j = parityPos; j <= m + r; j += 2 * parityPos) {
        for (let k = 0; k < parityPos && j + k <= m + r; k++) {
          parity ^= hammingCode[j + k - 1]
        }
      }

      hammingCode[parityPos - 1] = parity
    }

    return hammingCode.join("")
  }

  const isPowerOfTwo = (n: number) => {
    return n > 0 && (n & (n - 1)) === 0
  }

  // CRC Calculator (simplified)
  const calculateCRC = (data: string) => {
    if (!data || !/^[01]+$/.test(data)) return null

    const polynomial = "1101" // CRC-3 polynomial for demo
    let remainder = data.padEnd(data.length + polynomial.length - 1, "0")

    for (let i = 0; i <= remainder.length - polynomial.length; i++) {
      if (remainder[i] === "1") {
        for (let j = 0; j < polynomial.length; j++) {
          remainder =
            remainder.substring(0, i + j) +
            (Number.parseInt(remainder[i + j]) ^ Number.parseInt(polynomial[j])).toString() +
            remainder.substring(i + j + 1)
        }
      }
    }

    return remainder.slice(-3)
  }

  // Checksum Calculator
  const calculateChecksum = (data: string) => {
    if (!data) return null

    let sum = 0
    for (let i = 0; i < data.length; i += 2) {
      const byte = data.substr(i, 2)
      sum += Number.parseInt(byte, 16) || 0
    }

    // One's complement
    const checksum = (~sum & 0xff).toString(16).toUpperCase().padStart(2, "0")
    return checksum
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Error Detection & Correction
          </CardTitle>
          <CardDescription>
            Implement and analyze error detection mechanisms: Hamming Code, CRC, and Checksum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hamming" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hamming">Hamming Code</TabsTrigger>
              <TabsTrigger value="crc">CRC</TabsTrigger>
              <TabsTrigger value="checksum">Checksum</TabsTrigger>
            </TabsList>

            <TabsContent value="hamming" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hamming-input">Data Bits (Binary)</Label>
                  <Input
                    id="hamming-input"
                    placeholder="Enter binary data (e.g., 1011)"
                    value={hammingInput}
                    onChange={(e) => setHammingInput(e.target.value)}
                  />
                </div>

                {hammingInput && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Hamming Code Result:</h4>
                    {calculateHamming(hammingInput) ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-mono text-lg">{calculateHamming(hammingInput)}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Original: {hammingInput} → Encoded: {calculateHamming(hammingInput)}
                        </div>
                        <Badge variant="outline" className="bg-green-50">
                          Single Error Detection & Correction Enabled
                        </Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>Invalid binary input</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="crc" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="crc-input">Data Bits (Binary)</Label>
                  <Input
                    id="crc-input"
                    placeholder="Enter binary data (e.g., 110101)"
                    value={crcInput}
                    onChange={(e) => setCrcInput(e.target.value)}
                  />
                </div>

                {crcInput && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">CRC Result:</h4>
                    {calculateCRC(crcInput) ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-mono text-lg">{calculateCRC(crcInput)}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Data: {crcInput} → CRC: {calculateCRC(crcInput)}
                        </div>
                        <div className="text-sm text-gray-600">Polynomial: 1101 (CRC-3)</div>
                        <Badge variant="outline" className="bg-blue-50">
                          Burst Error Detection Enabled
                        </Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>Invalid binary input</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="checksum" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="checksum-input">Data (Hexadecimal)</Label>
                  <Input
                    id="checksum-input"
                    placeholder="Enter hex data (e.g., 4500003C)"
                    value={checksumInput}
                    onChange={(e) => setChecksumInput(e.target.value)}
                  />
                </div>

                {checksumInput && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Checksum Result:</h4>
                    {calculateChecksum(checksumInput) ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-mono text-lg">0x{calculateChecksum(checksumInput)}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Data: {checksumInput} → Checksum: {calculateChecksum(checksumInput)}
                        </div>
                        <Badge variant="outline" className="bg-purple-50">
                          Internet Checksum (One's Complement)
                        </Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>Invalid hexadecimal input</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Flow Control Protocols */}
      <Card>
        <CardHeader>
          <CardTitle>Flow Control Protocols</CardTitle>
          <CardDescription>Sliding Window, Go-Back-N, and Selective Repeat analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                Stop-and-Wait
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Window Size:</span>
                  <span className="font-mono">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-mono">50%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Recovery:</span>
                  <span className="text-green-600">Simple</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                Go-Back-N
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Window Size:</span>
                  <span className="font-mono">7</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-mono">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Recovery:</span>
                  <span className="text-yellow-600">Retransmit All</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                Selective Repeat
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Window Size:</span>
                  <span className="font-mono">7</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-mono">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Recovery:</span>
                  <span className="text-green-600">Selective</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
