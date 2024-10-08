//env config

import dotenv from "dotenv";
dotenv.config();

const envs = {
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || '',
  MONGO_URI: process.env.MONGO_URI || '',

  ETH_BLOCK_FROM: parseInt(process.env.ETH_BLOCK_FROM || '0'),

  TELEGRAM_NOTIFICATIONS_BOT_TOKEN:
    process.env.TELEGRAM_NOTIFICATIONS_BOT_TOKEN || '',
  TELEGRAM_NOTIFICATIONS_CHAT_ID: process.env.TELEGRAM_NOTIFICATIONS_CHAT_ID || '',
};
const requiredEnvs = ['ALCHEMY_API_KEY', 'MONGO_URI', 'TELEGRAM_NOTIFICATIONS_BOT_TOKEN', 'TELEGRAM_NOTIFICATIONS_CHAT_ID'];
requiredEnvs.forEach(key => {
  if (!envs[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default envs;
