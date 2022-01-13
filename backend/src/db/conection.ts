import mongoose from "mongoose";

const connectDB = async function () {
  const conn = await mongoose.connect(process.env.DB!);
  console.log("DB is connected");
  // conn.connection.db.dropDatabase();
};

export default connectDB;
