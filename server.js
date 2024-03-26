const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"));

app.listen(3000, () => {
  console.log(`App running on port 3000 ...`);
});
