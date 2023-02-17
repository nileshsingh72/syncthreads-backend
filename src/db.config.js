require("dotenv").config();
const { connect } = require("mongoose");
const connect_Database = () => connect(process.env.URL);
module.exports = { connect_Database };
