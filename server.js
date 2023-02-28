require("dotenv").config();

const getConnection = require("./db/connections");
const app = require("./app");

app.listen(3000, async () => {
  try {
    await getConnection();
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
