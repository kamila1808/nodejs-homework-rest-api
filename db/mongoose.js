const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

mongoose.set("strictQuery", false);
mongoose.connect(getConnectionURI());

module.exports = mongoose;
