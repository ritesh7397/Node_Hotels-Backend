const express = require('express') // npm i express
const app = express();
const db = require('./db');
require('dotenv').config();  // URL .env me hai ab
const passport = require('./auth');



const bodyParser = require('body-parser'); // npm i body-parser
app.use(bodyParser.json());             // json data bhjre 

const PORT = process.env.PORT || 3000; // q ki port ab .env me hai




//MIDDLEWARE FUNCTION
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest); // APPLY FOR ALL ENDPOINTS BY THIS WAY

// FOR ONLY ONE ROUTE (/) 
// app.get('/',logRequest,function (req, res) {
//     res.send('Welcome to our HOTEL');
// })





app.use(passport.initialize());         // PASSPORT CODE
const localAuthMiddleware = passport.authenticate('local', { session: false }); // authorization


app.get('/', function (req, res) {
    res.send('Welcome to our HOTEL');
})




// Import the Router files
const personRoutes = require('./routes/personRoutes');      // export wala yaha accept karna hai // personRoutes require karna hai
const menuItemRoutes = require('./routes/menuItemRoutes');    // menuItemRoutes require karna hai


// Use the routers
// app.use('/person', localAuthMiddleware, personRoutes);  // we used here /person  // AUTHORIZATION
 app.use('/person', personRoutes);  // we used here /person 
app.use('/menu', menuItemRoutes); // // we used here /menu 




app.listen(PORT, () => {                  // replace 3000 to PORT
    console.log('listening on port 3000')
})


