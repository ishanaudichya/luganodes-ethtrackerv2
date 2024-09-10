import Redis from "ioredis";
const redis = new Redis(`rediss://default:AVNS_gBwKVReWnzyEpmhaoP3@redis-ba5e231-audichyaishan-a4e5.a.aivencloud.com:15978`);

export class DepositsTrackerService {
  constructor(options) {
    this.blockchainGateway = options.blockchainGateway;
    this.notificatorGateway = options.notificatorGateway;
    this.depositsRepository = options.depositsRepository;
    this.filterIn = options.filterIn;

    if (this.filterIn.length) {
      const message = `Filtering deposits for addresses: ${this.filterIn.join(", ")}`;
      console.info(message);
      redis.publish("notifications", message);
    }

    // Send to telegram chatbot and redis make 2 seperate gatways
    this.notificatorGateway?.sendNotification(
      `Deposits tracker service started`
    );
  }

  // las block
  async processBlockTransactions(
    blockNumberOrHash = "latest"
  ) {
    try {
      const transactions = await this.blockchainGateway.fetchBlockTransactions(
        blockNumberOrHash
      );

      const sotreBatchSize = 5;
      if (transactions && transactions.length > 0) {
        const batches = Math.ceil(transactions.length / sotreBatchSize);
        for (let i = 0; i < batches; i++) {
          const batch = transactions.slice(
            i * sotreBatchSize,
            (i + 1) * sotreBatchSize
          );
          for (const tx of batch) {
            await this.processTransaction(tx);
          }
        }
      }
    } catch (error) {
      // umm
    }
  }

  async processBlockTransactionsFrom(blockNumber) {
    const lastStoredBlockNumber =
      (await this.depositsRepository.getLatestStoredBlock()) || blockNumber;
    if (lastStoredBlockNumber) {
      const message = `Executing block txs processing from block number ${lastStoredBlockNumber} as it's <last stored/requested> block number:`;
      console.info(message);
      redis.publish("notifications", message);
    }

    let latestBlock = await this.blockchainGateway.getBlockNumber();
    const latestBlockMessage = `Latest block number: ${latestBlock}`;
    console.info(latestBlockMessage);
    redis.publish("notifications", latestBlockMessage);

    const promises = [];
    for (let i = lastStoredBlockNumber; i <= latestBlock; i++) {
      promises.push(this.processBlockTransactions(i));
    }
    await Promise.all(promises);

    const finishedMessage = `Finished processing blocks from ${lastStoredBlockNumber} to ${latestBlock}`;
    console.info(finishedMessage);
    redis.publish("notifications", finishedMessage);
  }

  // live transaction 
  startPendingTransactionsListener() {
    this.blockchainGateway.watchPendingTransactions((tx) => {
      // processTransaction process 
      this.processTransaction(tx);
    });
  }


  startMintedBlocksListener() {
    this.blockchainGateway.watchMintedBlocks((blockNumber) => {
      this.processBlockTransactions(blockNumber);
      
    });
  }

  async processTransaction(txData) {
    try {
      if (!this.filterIn.includes(txData.to)) return;

      const depositMessage = `Found deposit transaction: ${txData.hash}`;
      console.info(depositMessage);
      redis.publish("notifications", depositMessage);

    // fix ishan
      const fee = txData.gasLimit * txData.gasPrice;

      const deposit = {
        blockNumber: txData.blockNumber,
        blockTimestamp: txData.blockTimestamp,
        pubkey: txData.from,
        fee: fee,
        hash: txData.hash,
        blockchain: this.blockchainGateway.blockchain,
        network: this.blockchainGateway.network,
        token: this.blockchainGateway.token,
      };

      await this.depositsRepository.storeDeposit(deposit);
    
      await this.notificatorGateway?.sendNotification(
        `Deposit processed: ${txData.hash}\n\nAmount: ${txData.value}\nFee: ${fee}\nFrom: ${txData.from}\nTo: ${txData.to}\nBlock: ${txData.blockNumber}`
      );
    } catch (error) {
      await this.notificatorGateway?.sendNotification(
        ` processing error deposit: ${txData.hash}`
      );
    }
  }
}
