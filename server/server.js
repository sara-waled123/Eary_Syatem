//================INTIALIZE EXPRESS APP==============
const express = require('express');
const app=express();

//=================GLOBAL MIDDLEWARE=================
app.use(express.json());//ACCESS KEY
app.use(express.urlencoded({extended:true}));//ACCESS URL form encoded
app.use(express.static('upload'));//ACCESS KEY

const cors= require("cors");
app.use(cors());//allow http req local host

//=================REQUIRE MODULES===================
const auth = require("./routes/Auth");
const questions=require("./routes/questions");
const responses=require("./routes/responses");

//=================Run App===================
app.listen(4000,"localhost",()=>{
    console.log(" SERVER RUN");
});

//=================End Point===================
app.use("/auth",auth);
app.use("/questions",questions);
app.use("/responses",responses);