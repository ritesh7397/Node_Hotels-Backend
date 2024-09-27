const express = require('express') // npm i express
const app = express();
const db = require('./db');
require('dotenv').config();  // URL .env me hai ab



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const Person = require('./Models/Person')


const bodyParser = require('body-parser'); // npm i body-parser
app.use(bodyParser.json());             // json data bhjre 

const PORT = process.env.PORT || 3000; // q ki port ab .env me hai






//MIDDLEWARE FUNCTION
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest); // APPLY FOR ALL ENDPOINTS BY THIS WAY






// PASSPORT , USERNAME, PASSWORD

passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
    // authentication logic here
    try{
        console.log('Received credentials:'. USERNAME, password);
        const user = await Person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect username'});

        const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null, false,{message: 'Incorrect password'});
        }

    }
    catch(err){
        return done(err);

    }
}))



app.use(passport.initialize());




app.get('/',passport.authenticate('local', {session: false}),function (req, res) {
    res.send('Welcome to our HOTEL');
})




// Import the Router files
const personRoutes = require('./routes/personRoutes');      // export wala yaha accept karna hai // personRoutes require karna hai
const menuItemRoutes = require('./routes/menuItemRoutes');    // menuItemRoutes require karna hai


// Use the routers
app.use('/person',personRoutes);  // we used here /person 
app.use('/menu', menuItemRoutes); // // we used here /menu 




app.listen(PORT, () => {                  // replace 3000 to PORT
    console.log('listening on port 3000')
})

