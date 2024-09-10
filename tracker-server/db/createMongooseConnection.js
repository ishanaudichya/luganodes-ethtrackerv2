import mongoose from "mongoose";

const createConnection = async (
  url,
  mongooseConnectConfig
) => {
  try {
    const connection = await mongoose.connect(url, mongooseConnectConfig);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export default createConnection;
