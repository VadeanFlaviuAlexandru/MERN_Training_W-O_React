require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", productRouter);
app.use("/", authRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://vadean:5dttKW0ScIk5rNLr@cluster0.aeqvqhl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`The CRUD is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
