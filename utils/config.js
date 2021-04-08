require("dotenv").config();

const PORT = process.env.PORT || 3003;
const url = process.env.MONGO_URI;

module.exports = {
  url,
  PORT,
};
