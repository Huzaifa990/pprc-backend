const express = require("express");
const cors = require("cors");
const app = express();
const ROUTE = require("./Routes");
require("./DB/Conn");

app.use(cors());
app.use(express.json());

const PORT = 8080;

app.use("/api/", ROUTE);

app.listen(PORT, ()=>{
    console.log("API is running on PORT: "+8080);
})
