
import { Model } from "mongoose";

export class DepositsRepository {
  constructor(depositsModel) {
    this.depositsModel = depositsModel;
  }

  async storeDeposit(deposit) {
    try {
      const newDeposit = new this.depositsModel({
        id: deposit.hash,
        ...deposit,
      });
      await newDeposit.save();
    } catch (error) {
      if (error.code === 11000) {
        // 11000 is the error code for duplicate key in MongoDB
        console.warn("Deposit with this hash already exists:", deposit.hash);
        return;
      }

      console.error("Error storing deposit:", error);
      throw error; // Rethrow the error if it's not a duplicate key error
    }
  }

  async getLatestStoredBlock() {
    const tx = await this.depositsModel
      .findOne()
      .sort({ blockNumber: -1 })
      .limit(1)
      .exec();

    return tx ? tx.blockNumber : null;
  }

  async getDeposits(props) {
    const deposits = await this.depositsModel
      .find({
        blockchain: props.blockchain,
        network: props.network,
        token: props.token,
        blockTimestamp: props.blockTimestamp
          ? { $gte: props.blockTimestamp }
          : undefined,
      })
      .exec();

    return deposits;
  }
}
