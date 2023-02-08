const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/dbConnect");

const authRouter = require("./routes/authRoute.js");
const { notFound, handleError } = require("./middlewares/errorHandle");

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);

app.use(notFound);
app.use(handleError);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
