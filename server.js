const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const port = 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
