

const express = require("express");
const app = express();
app.listen(3000,()=>{
    console.log("running");
})
app.get("/",(req,res)=>{
    const publisher = require("./publisher");
    const data = {
        status:200,
        message:"Done",
        id:req.query.id
    }
    publisher.connect(data);
    res.send("done");
})