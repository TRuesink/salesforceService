// Third party packages
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");

// imported files
const keys = require("./config/keys");
const errorHandler = require("./middlewares/error");

// Routes
const sobjectRoutes = require("./routes/sobjectRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

// env vars
dotenv.config({ path: "./config/config.env" });

// create app
const app = express();

// middlewares
app.use(
  cookieSession({
    name: "salesforceSession",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());

// mount routers
app.use("/api/v1/sobjects", sobjectRoutes);
app.use("/api/v1/auth", authRoutes);

// custom error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow
  );
});
