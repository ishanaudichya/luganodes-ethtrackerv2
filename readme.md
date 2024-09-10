docker run -d \
  -p 4000:4000 \
  -e ALCHEMY_API_KEY=<your_alchemy_api_key> \
  -e MONGO_URI=<your_mongo_uri> \
  -e ETH_BLOCK_FROM=<your_eth_block_from> \
  -e TELEGRAM_NOTIFICATIONS_BOT_TOKEN=<your_telegram_bot_token> \
  -e TELEGRAM_NOTIFICATIONS_CHAT_ID=<your_telegram_chat_id> \
  -e REDIS_URI=<your_redis_uri> \
  luganodes-tracker