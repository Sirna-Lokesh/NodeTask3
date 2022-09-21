const express=require('express');
const router=require("./src/routers/routes")
const app=express();

const port=8080;


app.use("/",router);

app.listen(port,()=>{
    console.log("server started at "+port);
})