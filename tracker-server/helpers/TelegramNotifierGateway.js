import { Telegraf } from "telegraf";
import Redis from "ioredis";

export class TelegramNotifierGateway {
  constructor(config) {
    this.botToken = config.botToken;
    this.chatId = config.chatId;
    this.redisUri = config.redisUri;

    this.bot = new Telegraf(this.botToken);
    //take this form env  DONT COMMITTT!!!
    this.redis = new Redis(``); //add uri here
  }

  async sendNotification(message) {
    try {
      await this.bot.telegram.sendMessage(this.chatId, message);
      console.log("telegram notification sent");
      
      await this.redis.publish("notifications", message);
      console.log("Message published to Redis");
    } catch (error) {
      console.error("Telegram notification or Redis publish error", error);
      throw error;
    }
  }
}
