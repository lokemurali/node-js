const express = require('express');
const rout = express.Router(); // to config router
const mongoPost = require('../Models/post');
const cors = require('cors');
rout.use(cors());

// rout.get('/posts', (req,res)=>{ 

rout.post('/auth', async (req,res)=>{
        console.log(req.body);    // jus to check the incoming msg body
        const user = await mongoPost.findOne({Username: req.body.Username, Password: req.body.Password});
        try{
            if(user)
            {
            console.log(req.body);
            console.log('User and password is correct', user.UserName);
            res.json({'user':user.Username});
            }
            else{
                console.log('Invalid Username && Password');
                res.status(401).send('Invalid User');
            }
        }
        catch(err){
        console.log("data not found");
        res.json({message:err});
        }

});

rout.post('/', async (req,res)=>{

        console.log(req.body);    // jus to check the incoming msg body
        const post = new mongoPost({
            Username: req.body.UserName,
            Password: req.body.Password,
            EmailId:req.body.EmailId,
            Team: req.body.Team,
            Mobile: req.body.Mobile});
            try{
                const savedPost = await post.save();
                res.json(savedPost);
            }catch(err){
                res.json({message:err});
            }
});



rout.get('/child', (req,res)=>{
    res.send('we are at first child');
});


module.exports = rout;