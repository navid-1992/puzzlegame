const express = require("express");
const cors = require('cors')

const app = express();

const Router = require("./routes/routes");

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use("/", Router);

app.listen(5000,()=>{
    console.log("App started at port 5000")
})
