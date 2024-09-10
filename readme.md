# Luganodes Ethereum Tracker

![Thumbnail 1](/media/thumbnail.png)


## Overview

Luganodes Ethereum Tracker is a robust and efficient system designed to monitor and record ETH deposits on the Beacon Deposit Contract. This project provides real-time tracking of Ethereum transactions, database storage, live logging, and instant notifications through Telegram.

![Thumbnail 2](/media/thumbnail2.png)
## Features

### 1. Ethereum Deposit Tracking
- Continuously monitors the Beacon Deposit Contract address `0x00000000219ab540356cBB839Cbe05303d7705Fa` for incoming ETH deposits.
- Utilizes Alchemy API to interact with the Ethereum blockchain using RPC methods.

### 2. Data Storage
- Stores transaction data in MongoDB with the following schema:
  ```
  Deposit {
    blockNumber: Number,
    blockTimestamp: Date,
    fee: Number,
    hash: String,
    pubkey: String
  }
  ```

![DB 1](/media/db.png)

### 3. Real-time Notifications
- Implements a Telegram notification service for admins.
- Sends instant alerts when relevant transactions occur on the monitored address.

### 4. Live Logging
- Utilizes Redis for efficient log streaming.
- Provides real-time updates on system activities and transactions.

### 5. Web Interface
- Built with Next.js for a responsive and interactive frontend.
- Features:
  - Landing page with project overview
  - Comprehensive list of all recorded transactions
  - Live log viewer for real-time system updates

### 6. WebSocket Server
- Implements a Node.js WebSocket server for real-time communication between the tracker and the client.

### 7. Pub/Sub System
- Utilizes Redis Pub/Sub for efficient message broadcasting.
- Ensures instant propagation of new transaction information across the system.
### 8. Docker Image
- Provides a containerized version of the Tracker-Server for easy deployment.
- Configurable through environment variables for flexibility.

## Architecture

The Luganodes Ethereum Tracker consists of several interconnected components:

1. **Tracker Server**: Monitors the Ethereum blockchain using Alchemy API.
2. **Database**: MongoDB for storing transaction data.
3. **WebSocket Server**: Facilitates real-time updates to the client.
4. **Redis**: Handles log streaming and Pub/Sub functionality.
5. **Frontend**: Next.js-based web interface for user interaction.
6. **Telegram Bot**: Sends notifications to admin users.

## Technologies Used

- Frontend: Next.js
- Websocket Server: Node.js
- Database: MongoDB
- Pub/Sub: Redis
- Blockchain Interaction: Alchemy API
- Websockets: socket.io
- Notifications: Telegram Bot API (Telegraf)
- Containerization: Docker

## Setup

To run the Luganodes Ethereum Tracker using Docker, use the following command:

```bash
docker run -d \
  -p 4000:4000 \
  -e ALCHEMY_API_KEY=<your_alchemy_api_key> \
  -e MONGO_URI=<your_mongo_uri> \
  -e ETH_BLOCK_FROM=<your_eth_block_from> \
  -e TELEGRAM_NOTIFICATIONS_BOT_TOKEN=<your_telegram_bot_token> \
  -e TELEGRAM_NOTIFICATIONS_CHAT_ID=<your_telegram_chat_id> \
  -e REDIS_URI=<your_redis_uri> \
  luganodes-tracker
```



### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ishanaudichya/luganodes-ethtrackerv2.git
   cd luganodes-ethtrackerv2
   ```

2. Set up the client:
   ```bash
   cd client
   pnpm install
   cp .env.example .env
   ```
   Edit the `.env` file and add your MongoDB URI.

3. Set up the server:
   ```bash
   cd ../server
   npm install
   cp .env.example .env
   ```
   Edit the `.env` file and add your Redis URI.

4. Set up the tracker-server:
   You can either use Docker or run it manually.

   a. Using Docker:
      ```bash
      cd ../tracker-server
      docker build -t luganodes-tracker .
      ```

   b. Manual setup:
      ```bash
      cd ../tracker-server
      npm install
      ```

### Running the Application

1. Start the client:
   ```bash
   cd client
   pnpm run dev
   ```

2. Start the server:
   ```bash
   cd server
   pnpm run dev
   ```

3. Start the tracker-server:
   
   a. Using Docker:
   ```bash
   docker run -d \
     -p 4000:4000 \
     -e ALCHEMY_API_KEY=<your_alchemy_api_key> \
     -e MONGO_URI=<your_mongo_uri> \
     -e ETH_BLOCK_FROM=<your_eth_block_from> \
     -e TELEGRAM_NOTIFICATIONS_BOT_TOKEN=<your_telegram_bot_token> \
     -e TELEGRAM_NOTIFICATIONS_CHAT_ID=<your_telegram_chat_id> \
     -e REDIS_URI=<your_redis_uri> \
     luganodes-tracker
   ```

   b. Manually:
   ```bash
   cd tracker-server
   npm run dev
   ```

Make sure to replace the placeholder values in the Docker command or in your `.env` file with your actual API keys, URIs, and other configuration details.

## Contact

For any queries or support, please contact audichyaishan@gmail.com or https://ishanaudichya.xyz
