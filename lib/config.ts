import mongoose from "mongoose";

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .catch((err) => console.log(err));

  console.log("Mongoose Connection Established");
};

export default connect;
