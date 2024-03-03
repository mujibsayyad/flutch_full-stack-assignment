import { connect } from "mongoose";

const connectToDB = async () => {
  try {
    await connect(process.env.DB);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

export default connectToDB;
