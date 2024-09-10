import { getEthBeaconDepositTrackerService } from "./context.js";
import envs from "./utils/env.js";



const main = async () => {
  const ethBeaconDepositTrackerService =
    await getEthBeaconDepositTrackerService();

  // Process the latest block
  ethBeaconDepositTrackerService.processBlockTransactionsFrom(
    envs.ETH_BLOCK_FROM
  );

  // Listen to pending transactions
  ethBeaconDepositTrackerService.startMintedBlocksListener();
};

main();
