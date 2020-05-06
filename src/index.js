require("dotenv").config();
const express = require("express");
require("express-async-errors");
const helmet = require("helmet"); // encode to protect server and cover the language usage
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerSpec = YAML.load("./swagger/swagger.yaml");

const app = express();
const PORT = process.env.PORT || 3000;
const morganLog =
  process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

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
