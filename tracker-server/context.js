import { EthereumGateway } from "./adapters/RPC/EthereumGateway.js";
import { DepositsTrackerService } from "./services/DepositsTrackerService.js";
import { DepositsFetcherService } from "./services/DepositsFetcherService.js";
import { DepositsRepository } from "./adapters/deposit/DepositsRepository.js";
import { TelegramNotifierGateway } from "./helpers/TelegramNotifierGateway.js";
import { DepositModel } from "./db/Schema.js";
import createMongooseConnection from "./db/createMongooseConnection.js";
import envs from "./utils/env.js";

const createSingleton = (creator) => {
  let instance;
  return async () => {
    if (!instance) {
      instance = await creator();
    }
    return instance;
  };
};

const getMongooseConnection = createSingleton(() => 
  createMongooseConnection(envs.MONGO_URI)
);

const getDepositsRepository = createSingleton(async () => {
  await getMongooseConnection();
  return new DepositsRepository(DepositModel);
});

const getTelegramNotifierGateway = createSingleton(() => 
  new TelegramNotifierGateway({
    botToken: envs.TELEGRAM_NOTIFICATIONS_BOT_TOKEN,
    chatId: envs.TELEGRAM_NOTIFICATIONS_CHAT_ID,
    redisUri: envs.REDIS_URI,
  })
);

const getEthGateway = createSingleton(() => 
  new EthereumGateway({
    rpcUrl: "https://eth-mainnet.g.alchemy.com",
    apiKey: envs.ALCHEMY_API_KEY,
    metadata: { network: "mainnet" },
  })
);

export const getDepositsFetcherService = createSingleton(async () => {
  await getMongooseConnection();
  const depositsRepository = await getDepositsRepository();
  return new DepositsFetcherService({ depositsRepository });
});

export const getEthBeaconDepositTrackerService = createSingleton(async () => {
  await getMongooseConnection();
  const [depositsRepository, telegramNotifierGateway, ethGateway] = await Promise.all([
    getDepositsRepository(),
    getTelegramNotifierGateway(),
    getEthGateway(),
  ]);

  return new DepositsTrackerService({
    blockchainGateway: ethGateway,
    notificatorGateway: telegramNotifierGateway,
    depositsRepository: depositsRepository,
    filterIn: ["0x00000000219ab540356cBB839Cbe05303d7705Fa"],
  });
});
