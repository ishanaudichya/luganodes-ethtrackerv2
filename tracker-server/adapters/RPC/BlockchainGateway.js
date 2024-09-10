import sleep from "../../utils/sleep.js";
import Redis from "ioredis";


//ffs env is not working. fix it - 
const redis = new Redis(`rediss://default:AVNS_gBwKVReWnzyEpmhaoP3@redis-ba5e231-audichyaishan-a4e5.a.aivencloud.com:15978`);

export class BlockchainGateway {
  constructor(config) {
    this.provider = config.provider;
    this.batchSize = config.batchSize || 15;
    this.retries = config.retries || 15;
    this.blockchain = config.blockchain;
    this.network = config.network;
    this.token = config.token;
    this.fetchQueue = [];
    this.isFetching = false;
  }

  async queueFetchOperation(fetchCallback) {
    return new Promise((resolve) => {
      this.fetchQueue.push({ fetchCallback, resolvePromise: resolve });
      this.processFetchQueue();
    });
  }

  async processFetchQueue() {
    if (this.isFetching || this.fetchQueue.length === 0) return;

    this.isFetching = true;
    const batch = this.fetchQueue.splice(0, this.batchSize);

    const promises = batch.map(async ({ fetchCallback, resolvePromise }) => {
      const data = await this.executeFetchWithRetry(fetchCallback);
      resolvePromise(data);
    });

    await Promise.all(promises);
    console.info(`checked ${batch.length} fetch operations`);

    this.isFetching = false;
    this.processFetchQueue();
  }

  async executeFetchWithRetry(fetchCallback, retries = this.retries, backoff = 1000) {
    try {
      return await fetchCallback();
    } catch (error) {
      if (retries > 0 && error?.error?.code === 429) {
        console.warn(`Rate limit exceeded. Retrying in ${backoff}ms...`);
        await sleep(backoff);
        return this.executeFetchWithRetry(fetchCallback, retries - 1, backoff * 2);
      } else if (error?.error?.code === -32603) {
        console.warn(`Timeout error. Retrying in ${backoff}ms...`);
        await sleep(backoff);
        return this.executeFetchWithRetry(fetchCallback, retries - 1, backoff * 2);
      } else {
        console.error('rate limit erro');
        throw error;
      }
    }
  }

  async getTransactionData(txHash) {
    return this.queueFetchOperation(async () => {
      const tx = await this.provider.getTransaction(txHash);
      if (tx) {
        const block = await this.provider.getBlock(tx.blockNumber);
        return {
          value: tx.value,
          blockTimestamp: block.timestamp,
          blockNumber: tx.blockNumber,
          blockHash: tx.blockHash,
          index: tx.index,
          hash: tx.hash,
          type: tx.type,
          to: tx.to,
          from: tx.from,
          nonce: tx.nonce,
          gasLimit: tx.gasLimit,
          gasPrice: tx.gasPrice,
          maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
          maxFeePerGas: tx.maxFeePerGas,
          maxFeePerBlobGas: tx.maxFeePerBlobGas,
        };
      }
      return null;
    });
  }

  async fetchBlockTransactions(blockNumberOrHash) {
    console.info("Fetching block transactions from block:", blockNumberOrHash);
    redis.publish("notifications", "Fetching block transactions from block:" + blockNumberOrHash);
    const block = await this.queueFetchOperation(() =>
      this.provider.getBlock(blockNumberOrHash)
    );

    if (block && block.transactions) {
      const deposits = [];
      const promises = block.transactions.map(async (txHash) => {
        const deposit = await this.getTransactionData(txHash);
        if (deposit) {
          deposits.push(deposit);
        }
      });
      await Promise.all(promises);
      return deposits.length > 0 ? deposits : null;
    }
    return null;
  }

  async watchPendingTransactions(callback) {
    console.info("Watching for pending transactions...");

    this.provider.on("pending", async (txHash) => {
      const data = await this.getTransactionData(txHash);
      data && callback(data);
    });
  }

  async watchMintedBlocks(callback) {
    console.info("Watching for new minted blocks...");
    this.provider.on("block", async (blockNumber) => {
      callback(blockNumber);
    });
  }

  async getBlockNumber() {
    return this.queueFetchOperation(() => this.provider.getBlockNumber());
  }
}
