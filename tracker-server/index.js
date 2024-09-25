import { getEthBeaconDepositTrackerService } from "./context.js";
import envs from "./utils/env.js";



const main = async () => {
  const ethBeaconDepositTrackerService =
    await getEthBeaconDepositTrackerService();

  ethBeaconDepositTrackerService.processBlockTransactionsFrom(
    envs.ETH_BLOCK_FROM
  );

  ethBeaconDepositTrackerService.startMintedBlocksListener();
};

main();
