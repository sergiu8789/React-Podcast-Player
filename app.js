const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const route = require("./router/route");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use("/",route);
mongoose.set('strictQuery', true);
mongoose
  .connect(
    "mongodb+srv://helder:helder@cluster0.1omlqxj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000,()=>{
        console.log("connect successfully")
    })
  })
  .catch((err) => {
    console.log(err);
  }); 
