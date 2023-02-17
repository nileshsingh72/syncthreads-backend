require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect_Database } = require("./db.config");
const { userRoute } = require("./Routes/user.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.end("welcome to server !! ");
});

app.listen(process.env.PORT, async (req, res) => {
  console.log(`http://localhost:${process.env.PORT}`);
  try {
    await connect_Database();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not Connected to DB", error.message);
  }
});
