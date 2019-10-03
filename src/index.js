require("dotenv").config();
const express = require("express");
const helmet = require("helmet"); // encode to protect server and cover the language usage
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const { connectToDB } = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 3000;
const morganLog =
  process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectToDB()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`);
    });
  })
  .catch(e => {
    console.log("DB Connection failed");
    console.log(e.message);
    process.exit(1);
  });
