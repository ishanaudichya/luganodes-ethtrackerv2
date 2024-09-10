'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deposits, setDeposits] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    fetchDeposits()
  }, [currentPage])

  const fetchDeposits = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setDeposits(data.deposits)
      setTotalPages(Math.ceil(data.total / itemsPerPage))
    } catch (error) {
      console.error('Error fetching deposits:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center text-sm font-medium hover:text-purple-300 transition-colors">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Stored Transactions</h1>
        <div className="bg-black/60 rounded-lg p-4 border border-purple-400 overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-purple-300">Block Number</TableHead>
                  <TableHead className="text-purple-300">Timestamp</TableHead>
                  <TableHead className="text-purple-300">Fee</TableHead>
                  <TableHead className="text-purple-300">Hash</TableHead>
                  <TableHead className="text-purple-300">Public Key</TableHead>
                  <TableHead className="text-purple-300">Blockchain</TableHead>
                  <TableHead className="text-purple-300">Network</TableHead>
                  <TableHead className="text-purple-300">Token</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((deposit, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{deposit.blockNumber}</TableCell>
                    <TableCell className="font-mono">{new Date(deposit.blockTimestamp * 1000).toLocaleString()}</TableCell>
                    <TableCell className="font-mono">{deposit.fee || 'N/A'}</TableCell>
                    <TableCell className="font-mono">{deposit.hash || 'N/A'}</TableCell>
                    <TableCell className="font-mono">{deposit.pubkey}</TableCell>
                    <TableCell>{deposit.blockchain}</TableCell>
                    <TableCell>{deposit.network}</TableCell>
                    <TableCell>{deposit.token}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        {!isLoading && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full py-6 bg-black/60">
        <div className="container mx-auto px-4 text-center text-sm text-gray-300">
          © 2023 Luganodes Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}