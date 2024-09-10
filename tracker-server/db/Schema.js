import mongoose, { Schema, Document } from "mongoose";
// Schema of Deposit to be Saved:
// Deposit {
//     blockNumber;
//     blockTimestamp;
//     fee;
//     hash;
//     pubkey;
// }

const DepositSchema = new Schema({
  blockNumber: { type: Number, required: true },
  blockTimestamp: { type: Number, required: true },
  fee: { type: BigInt, required: false },
  hash: { type: String, required: false },
  pubkey: { type: String, required: true },
  blockchain: { type: String, required: true }, //remove not asked by luga claude sux
  network: { type: String, required: true },
  token: { type: String, required: true },
});

export const DepositModel = mongoose.model("Deposit", DepositSchema);
