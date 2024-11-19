const mongoose = require("mongoose");
const express = require("express");

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
    const names = ["Liam","Noah","Oliver","James","Elijah","William","Henry","Lucas","Benjamin","Theodore","Mateo","Levi","Sebastian","Daniel","Jack","Michael","Alexander","Owen","Asher","Samuel","Ethan","Leo","Jackson","Mason","Ezra","John","Hudson","Luca","Aiden","Joseph","David","Jacob","Logan","Luke","Julian","Gabriel","Grayson","Wyatt","Matthew","Maverick","Dylan","Isaac","Elias","Anthony","Thomas","Jayden","Carter","Santiago","Ezekiel","Charles","Josiah","Caleb","Cooper","Lincoln","Miles","Christopher","Nathan","Isaiah","Kai","Joshua","Andrew","Angel","Adrian","Cameron","Nolan","Waylon","Jaxon","Roman","Eli","Wesley","Aaron","Ian","Christian","Ryan","Leonardo","Brooks","Axel","Walker","Jonathan","Easton","Everett","Weston","Bennett","Robert","Jameson","Landon","Silas","Jose","Beau","Micah","Colton","Jordan","Jeremiah","Parker","Greyson","Rowan","Adam","Nicholas","Theo","Xavier","Hunter","Dominic","Jace","Gael","River","Thiago","Kayden","Damian","August","Carson","Austin","Myles","Amir","Declan","Emmett","Ryder","Luka","Connor","Jaxson","Milo","Enzo","Giovanni","Vincent","Diego","Luis","Archer","Harrison","Kingston","Atlas","Jasper","Sawyer","Legend","Lorenzo","Evan","Jonah","Chase","Bryson","Adriel","Nathaniel","Arthur","Juan","George","Cole","Zion","Jason","Ashton","Carlos","Calvin","Brayden","Elliot","Rhett","Emiliano","Ace","Jayce","Graham","Max","Braxton","Leon","Ivan","Hayden","Jude","Malachi","Dean","Tyler","Jesus","Zachary","Kaiden","Elliott","Arlo","Emmanuel","Ayden","Bentley","Maxwell","Amari","Ryker","Finn","Antonio","Charlie","Maddox","Justin","Judah","Kevin","Dawson","Matteo","Miguel","Zayden","Camden","Messiah","Alan","Alex","Nicolas","Felix","Alejandro","Jesse","Beckett","Matias","Tucker","Emilio","Xander","Knox","Oscar","Beckham","Timothy","Abraham","Andres","Gavin","Brody","Barrett","Hayes","Jett","Brandon","Joel","Victor","Peter","Abel","Edward","Karter","Patrick","Richard","Grant","Avery","King","Caden","Adonis","Riley","Tristan","Kyrie","Blake","Eric","Griffin","Malakai","Rafael","Israel","Tate","Lukas","Nico","Marcus","Stetson","Javier","Colt","Omar","Simon","Kash","Remington","Jeremy","Louis","Mark","Lennox","Callum","Kairo","Nash","Kyler","Dallas","Crew","Preston","Paxton","Steven","Zane","Kaleb","Lane","Phoenix","Paul","Cash","Kenneth","Bryce","Ronan","Kaden","Maximiliano","Walter","Maximus","Emerson","Hendrix","Jax","Atticus","Zayn","Tobias","Cohen","Aziel","Kayson","Rory","Brady","Finley","Holden","Jorge","Malcolm","Clayton","Niko","Francisco","Josue","Brian","Bryan","Cade","Colin","Andre","Cayden","Aidan","Muhammad","Derek","Ali","Elian","Bodhi","Cody","Jensen","Damien","Martin","Cairo","Ellis","Khalil","Otto","Zander","Dante","Ismael","Angelo","Brantley","Manuel","Colson","Cruz","Tatum","Jaylen","Jaden","Erick","Cristian","Romeo","Milan","Reid","Cyrus","Leonel","Joaquin","Ari","Odin","Orion","Ezequiel","Gideon","Daxton","Warren","Casey","Anderson","Spencer","Karson","Eduardo","Chance","Fernando","Raymond","Bradley","Cesar","Wade","Prince","Julius","Dakota","Kade","Koa","Raiden","Callan","Hector","Onyx","Remy","Ricardo","Edwin","Stephen","Kane","Saint","Titus","Desmond","Killian","Sullivan","Mario","Jay","Kamari","Luciano","Royal","Zyaire","Marco","Wilder","Russell","Nasir","Rylan","Archie","Jared","Gianni","Kashton","Kobe","Sergio","Travis","Marshall","Iker","Briggs","Gunner","Apollo","Bowen","Baylor","Sage","Tyson","Kyle","Oakley","Malik","Mathias","Sean","Armani","Hugo","Johnny","Sterling","Forrest","Harvey","Banks","Grady","Kameron","Jake","Franklin","Lawson","Tanner","Eden","Jaziel","Pablo","Reed","Pedro","Zayne","Royce","Edgar","Ibrahim","Winston","Ronin","Leonidas","Devin","Damon","Noel","Rhys","Clark","Corbin","Sonny","Colter","Esteban","Erik","Baker","Adan","Dariel","Kylo","Tripp","Caiden","Frank","Solomon","Major","Memphis","Quinn","Dax","Hank","Donovan","Finnegan","Nehemiah","Andy","Camilo","Asa","Jeffrey","Santino","Isaias","Jaiden","Kian","Fabian","Callen","Ruben","Alexis","Emanuel","Francis","Garrett","Kendrick","Matthias","Wells","Augustus","Jasiah","Alijah","Alonzo","Koda","Collin","Ford","Frederick","Jaxton","Kohen","Troy","Kason","Seth","Denver","Kyson","Ares","Raphael","Bodie","Sylas","Uriel","Zaiden","Shiloh","Lewis","Kieran","Marcos","Bo","Shepherd","Philip","Zaire","Gregory","Princeton","Roberto","Leland","Eithan","Moshe","Johnathan","Lucca","Kenzo","Mack","Porter","Kolton","Kaison","Valentino","Saul","Shane","Jamari","Rocco","Kylan","Deacon","Dalton","Moses","Callahan","Tadeo","Makai","Amiri","Rowen","Drew","Jalen","Kylian","Sutton","Dominick","Reece","Rodrigo","Soren","Kasen","Ridge","Zachariah","Jamir","Peyton","Omari","Trevor","Morgan","Izaiah","Alessandro","Kaysen","Enrique","Marcelo","Sincere","Lucian","Leandro","Armando","Braylen","Jayson","Julio","Lawrence","Cassius","Raul","Jase","Mohammad","Zain","Jayceon","Jonas","Ronald","Ayaan","Rio","Allen","Bruce","Mohamed","Dorian","Maximilian","Keegan","Shawn","Yusuf","Pierce","Ariel","Ander","Conor","Conrad","Phillip","Arjun","Roy","Moises","Arturo","Johan","Gerardo","Atreus","Nikolai","Braylon","Samson","Hezekiah","Kayce","Scott","Gunnar","Jamison","Samir","Keanu","Ledger","Jaime","Finnley","Cannon","Colby","Nikolas","Emmitt","Kamden","Miller","Boone","Hamza","Ocean","Mac","Anakin","Brixton","Roland","Huxley","Zeke","Danny","Marvin","Otis","Albert","Clay","Emir","Boston","Bruno","Lionel","Ozzy","Taylor","Jamie","Augustine","Chaim","Krew","Rayan","Alden","Bellamy","Amos","Drake","Davis","Dustin","Corey","Ahmad","Conner","Gustavo","Layton","Abram","Axton","Chandler","Azariah","Reese","Benson","Tru","Case","Trey","Mauricio","Westin","Gage","Reign","Creed","Mylo","Dennis","Quentin","Madden","Rome","Julien","Sam","Zaid","Marcel","Maximo","Layne","Ahmed","Kannon","Quincy","Yosef","Aarav","Lennon","Ryland","Skyler","Chris","Eliam","Kareem","Kyree","Dario","Donald","Fletcher","Darius","Duke","Rayden","Salem","Vicente","Vincenzo","Cayson","Eliseo","Issac","Lian","Clyde","Wilson","Santana","Tomas","Dexter","Keith","Houston","Harry","Uriah","Lee","Rex","Tony","Carmelo","Alberto","Loyal","Trace","Alfredo","Riggs","Forest","Raylan","Salvador","Jakari","Zakai","Louie","Flynn","Leonard","Mohammed","Derrick","Musa","Avi","Ty","Westley","Ambrose","Brycen","Aron","Caspian","Gatlin","Harlan","Dillon","Emery","Nixon","Tommy","Watson","Zayd","Azrael","Zyair","Azriel","Legacy","Cillian","Alvin","Bridger","Alec","Edison","Kingsley","Remi","Briar","Jaxxon","Truett","Lachlan","Cal","Landen","Roger","Alonso","Kaiser","Blaze","Jerry","Seven","Kenji","Noe","Quinton","Grey","Jefferson","Marcellus","Ray","Kyro","Benicio","Justice","Neil","Idris","Bear","Kiaan","Wayne","Ben","Junior","Karim","Yehuda","Jimmy","Ramon","Bjorn","Nathanael","Stanley","Hassan","Magnus","Trenton","Brayan","Brock","Jagger","Cason","Dakari","Rey","Abdiel","Abdullah","Casen","Jiraiya","Lance","Misael","Alvaro","Robin","Langston","Nelson","Wes","Khari","Landyn","Jakai","Lochlan","Valentin","Keaton","Amias","Joziah","Thaddeus","Jedidiah","Orlando","Eliel","Hugh","Koen","Calum","Enoch","Mitchell","Rohan","Aryan","Dilan","Aden","Allan","Leighton","Elisha","Evander","Castiel","Curtis","Kellen","Dash","Douglas","Eddie","Melvin","Avyaan","Everest","Zamir","Ricky","Dutton","Yahir","Devon","Franco","Khaza","Dior","Leif","Sevyn","Guillermo","Ira","Emory","Felipe","Titan","Alfred","Azael","Zahir","Kellan","Darren","Rudy","Ayan","Leroy","Anders","Ishaan","Reuben","Boden","Mccoy","Heath","Kase","Wylder","Judson","Khai","Kye","Axl","Crue","Ernesto","Ahmir","Zyon","Aries","Mustafa","Santos","Dane","Damari","Elio","Jadiel","Jovanni","Salvatore","Mathew","Kolson","Nova","Brendan","Murphy","Brodie","Damir","Rocky","Larry","Fisher","Waylen","Byron","Ermias","Joey","Joe","Jon","Arian","Chosen","Jairo","Vihaan","Kylen","Ameer","Dion","Jrue","Kaizen","Yousef","Bryant","Cullen","Kaisen","Kelvin","Zen","Kartier","Randy","Shepard","Alaric","Cain","Jeremias","Alfonso","Brecken","Colten","Gian","Rhodes","Wesson","Duncan","Harold","Henrik","Harley","Alistair","Agustin","Jericho","Talon","Westyn","Cassian","Eugene","Ryatt","Shmuel","Braden","Yahya","Aldo","Dangelo","Ezrah","Korbin","Zavier","Bronson","Teo","Jones","Neo","Stefan","Van","Mekhi","Coleson","Eren","Ignacio","Kristian","Harlem","Zev","Canaan","Cedric","Khalid","Bode","Gary","Rene","Benedict","Maxton","Thatcher","Wallace","Davian","Gordon","Niklaus","Yisroel","Kabir","Osman","Adler","Darian","Terry","Cartier","Osiris","Vance","Demetrius","Kamryn","Lux","Stone","Jaxx","Kooper","Rodney","Aurelio","Darwin","Jakob","Zechariah","Brennan","Marlon","Meir","Yael","Asaiah","Atharv","Imran","Ivaan","Kanan","Kalel","London"]
    
    const dataset = [];
    for (i=0; i<50; i++){
        dataset.push({
            name: names[Math.floor(Math.random()*1000)],
            age: Math.floor(Math.random()*90)+1
        })
    }
    await User.insertMany(dataset);
}

const User = mongoose.model("User", userScheme);

async function main() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/usersdb");

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