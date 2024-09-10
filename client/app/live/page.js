'use client'

import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import Link from 'next/link'
import { ArrowLeftIcon, SendIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

let socket

export default function StartPage() {
  const [logs, setLogs] = useState([])
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    // Connect to the socket server
    socket = io('http://localhost:3001')

    // Listen for new logs
    socket.on('new_log', (message) => {
      setLogs((prevLogs) => [...prevLogs, message])
    })

    // Cleanup when the component is unmounted
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  // Scroll to bottom when new logs are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center text-sm font-medium hover:text-purple-300 transition-colors">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Join Our Telegram Notification Service
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Stay updated with real-time Ethereum deposit notifications. Enter your Telegram username to get started.
          </p>
          <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              placeholder="Your Telegram Username"
              className="flex-grow mr-2 bg-white/10 border-purple-400 text-white placeholder-gray-400"
            />
            <Link href="https://t.me/+pfHgwNcP_n42OGM1">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <SendIcon className="mr-2 h-4 w-4" />
              Join
            </Button>
            </Link>
          </form>
        </section>
        <section className="bg-black rounded-lg p-4 border border-purple-400">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">Live Deposit Logs</h2>
          <ScrollArea className="h-[400px] rounded-md border border-purple-600" ref={scrollAreaRef}>
            <div className="p-4 space-y-2 bg-black">
              {logs.map((log, index) => (
                <div key={index} className="text-sm text-green-400 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
      <footer className="w-full py-6 bg-black/60">
        <div className="container mx-auto px-4 text-center text-sm text-gray-300">
          © 2023 Luganodes Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
