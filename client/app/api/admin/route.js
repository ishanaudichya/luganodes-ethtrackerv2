import { connectToDatabase } from '@/lib/mongodb'
import { Schema, model, models } from 'mongoose'
import { NextResponse } from 'next/server'

const DepositSchema = new Schema({
  blockNumber: { type: Number, required: true },
  blockTimestamp: { type: Number, required: true },
  fee: { type: String, required: false }, // Changed to String to handle BigInt
  hash: { type: String, required: false },
  pubkey: { type: String, required: true },
  blockchain: { type: String, required: true },
  network: { type: String, required: true },
  token: { type: String, required: true },
})

const Deposit = models.Deposit || model('Deposit', DepositSchema)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  try {
    await connectToDatabase()
    const deposits = await Deposit.find().skip(skip).limit(Number(limit))
    const total = await Deposit.countDocuments()

    return NextResponse.json({ deposits, total })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching deposits' }, { status: 500 })
  }
}