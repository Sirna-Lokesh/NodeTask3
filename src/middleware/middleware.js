const users = require('../../db/database');
const express=require('express');

function isUserAlreadyPresentWithSameID(req,res,next){
    const id=req.body.id;
    let foundUserWithSameID=false;
    for(user of users){
        if(user.id==id){
            foundUserWithSameID=true;
        }
    }
    if(!foundUserWithSameID){
        next();
    }
    else{
        res.send("You cannot have a duplicate id")
    }
}

module.exports=isUserAlreadyPresentWithSameID;
