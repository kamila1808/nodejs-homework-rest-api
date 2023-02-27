require("dotenv").config();
const app = require("./app");
const MongoClient = require("mongodb").MongoClient;

app.listen(3000, async () => {
  try {
    await MongoClient.connect(process.env.MONGO_URL, );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
