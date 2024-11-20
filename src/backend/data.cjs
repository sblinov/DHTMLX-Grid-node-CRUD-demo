const mongoose = require("mongoose");
const express = require("express");
const newname = require("./namegen.cjs")

const Schema = mongoose.Schema;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");   
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.static("public"));
app.use(express.json());

const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
// Duplicate the ID field.
userScheme.virtual('id').get(function(){
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
userScheme.set('toJSON', {
    virtuals: true
});

async function populate(){
        
    const dataset = [];
    for (i=0; i<50; i++){
        dataset.push({
            name: newname.randName(),
            age: Math.floor(Math.random()*60)+12
        })
    }
    await User.insertMany(dataset);
}

const User = mongoose.model("User", userScheme);

async function main() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/dhxTest");

        const UsersNum = await User.estimatedDocumentCount()
        if (UsersNum==0){
            populate()
        }

        app.listen(3000);
        console.log("listening 127.0.0.1:3000");
    }
    catch(err) {
        return console.log(err);
    }
}
 
//loading data
app.get("/api/users", async (req, res)=>{
    const users = await User.find({});
    res.send(users);
});
  
//adding a record
app.post("/api/users", async (req, res) =>{
    if(!req.body) return res.sendStatus(400);
         
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});
    await user.save();
    
    res.send(user);
});
  
//removing a record
app.delete("/api/users", async(req, res)=>{
    const id = req.body.id;
    const user = await User.findByIdAndDelete(id);

    if(user) res.send(user);
    else res.sendStatus(404);
});

//updating a record
app.put("/api/users", async (req, res)=>{
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};
    const user = await User.findOneAndUpdate({_id: id}, newUser, {new: true});
    
    if(user) res.send(user);
    else res.sendStatus(404);
});
 
main();

process.on("SIGINT", async() => {
    await mongoose.disconnect();
    console.log("service stopped");
    process.exit();
});