const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const userRoutes = require("./routes/user");
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("tiny"));
app.use(helmet());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Wallet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

mongoose.connection
  .once("open", () => console.log("MongoDB succesfully connected!"))
  .on("error", (error) => {
    console.log("Error in connecting MongoDB:", error);
  });

app.use(authRoutes);
app.use(userRoutes);
app.use(expenseRoutes);

const port = process.env.port || 27017;
app.listen(port, function () {
  console.log(`Server Listening on http://localhost:${port}`);
});