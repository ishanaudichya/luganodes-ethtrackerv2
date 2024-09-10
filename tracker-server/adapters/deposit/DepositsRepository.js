
import { Model } from "mongoose";
//mongodb addd code pending ( also store latest block number) - done ;-;
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
        console.warn("already exists", deposit.hash);
        return;
      }

      console.error("Error saving db", error);
      throw error; // 
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
