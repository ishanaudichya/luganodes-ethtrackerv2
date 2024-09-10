import { ethers } from "ethers";
import { BlockchainGateway } from "./BlockchainGateway.js";

// Implement the Ethereum-specific provider
class EthereumProvider {
  constructor(config) {
    const fullRpcUrl = `${config.rpcUrl}/v2/${config.apiKey}`;
    this.provider = new ethers.JsonRpcProvider(fullRpcUrl, config.network);
  }

  async getTransaction(txHash) {
    return this.provider.getTransaction(txHash);
  }

  async getBlock(blockNumberOrHash) {
    return this.provider.getBlock(blockNumberOrHash);
  }

  async getBlockNumber() {
    return this.provider.getBlockNumber();
  }

  async getTransactionTrace(txHash, options = {}) {
    try {
      const opts = {
        tracer: "callTracer",
        ...options,
      };

      const trace = await this.provider.send("debug_traceTransaction", [
        txHash,
        opts,
      ]);
      return trace;
    } catch (error) {
      console.error("Error fetching transaction trace:", error);
      return null;
    }
  }

  on(event, listener) {
    this.provider.on(event, listener);
  }
}

// Extend the generic BlockchainGateway to create an Ethereum-specific gateway
export class EthereumGateway extends BlockchainGateway {
  constructor(config) {
    const ethereumProvider = new EthereumProvider(config);
    super({
      provider: ethereumProvider,
      blockchain: "ethereum",
      network: config.metadata.network,
      token: "ETH",
    });
    this.token = "ETH";
  }
}
