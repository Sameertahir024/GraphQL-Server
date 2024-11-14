import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db is connected");
  } catch (error) {
    console.error("Error while connecting");
  }
};

export default connect;
