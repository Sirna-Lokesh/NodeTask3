const express = require('express');
const users = require('../../db/database');
const middleware=require('../../src/middleware/middleware.js');
const userSchema=require("../schema/schema")
const app = express();

const router = express.Router();

router.use(express.json());


router.post('/createUser',middleware,async(req, res) => {
    let user = req.body;
    try{
        const status=await userSchema.validateAsync(req.body);
        console.log(status);
    }
    catch(error){
        console.log(error)
        res.send(error.details[0].message);
        return;
    }
    user.isDeleted = false;
    user.age = parseInt(user.age, 10);
    users.push(user);
    console.log(users);
    res.send("User successfully created");
});


router.get('/getUsers/:id', (req, res) => {
    const { id } = req.params;
    let user;
    for (item of users) {
        if (item.id == id)
            user = item;
    }

    if (!user || user.isDeleted)
        res.status(404).json({ message: "User not found!" });
    else
        res.status(200).json(user);
});

router.delete('/removeUser/:id', (req, res) => {
    const { id } = req.params;
    let removedStatus = false;
    for (let index = 0; index < users.length; index++) {
        if (id == users[index].id) {
            users[index].isDeleted = true;
            removedStatus = true;
        }
    }
    console.log(users);
    if (!removedStatus)
        res.send("The user You are trying to remove is not present , or already deleted");
    else
        res.send(`user with id = ${id} has been removed successfully`);
})

router.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    let elementFoundAt = -1;
    for (let index = 0; index < users.length; index++) {
        if (id == users[index].id) {
            elementFoundAt = index;
        }
    }
    if (elementFoundAt === -1 || users[elementFoundAt].isDeleted)
        res.status(400).json({ message: `user with id =  ${id} is not present` });
    else {
        users[elementFoundAt] = req.body;
        console.log(users);
        res.status(200).json({ message: `user with id =  ${id} is updated successfully` });
    }
});

router.get('/getAutoSuggestUsers/:loginSubstring/:limit', (req, res) => {
    const { limit } = req.params;
    const { loginSubstring } = req.params;
    let autoSuggest = [];
    for (user of users) {
        if (user.login.includes(loginSubstring)) {
            autoSuggest.push(user.login);
        }
    }
    res.send(autoSuggest);
});

module.exports = router;
