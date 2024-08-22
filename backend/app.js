
const express = require("express")
const app = express();
const cors = require ("cors")
// const bodyParser = require('body-parser')
const blogs = require("./routes/blogs");
const user = require("./routes/user");
require("dotenv").config();
require("./conn/conn")
// require("./conn/conn2")
app.use(cors());
app.use(express.json())
// app.use(bodyParser.json())
app.use("/api/v1",blogs)
app.use("/api2/v2",user)

app.listen(process.env.port,()=>{
    console.log("hello")
    console.log(`server is running on port ${process.env.port}`)
    console.log(`server is running on port ${process.env.uri}`);
})

