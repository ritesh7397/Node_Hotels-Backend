const express = require('express') // npm i express
const app = express();
const db = require('./db');
const cors = require('cors');
require('dotenv').config();  // URL .env me hai ab


// whenever someone sends data in the JSON format to your server, the server will automatically understand and convert 
// that data into a JavaScript object
app.use(express.json());


app.use(cors());


const PORT = process.env.PORT || 3000; // q ki port ab .env me hai


// BASIC CODE

app.get('/', function (req, res) {
    res.send('Welcome to our HOTEL');
})


// Import the Router files


const personRoutes = require('./routes/personRoutes');         // export wala yaha accept karna hai // personRoutes require karna hai
const menuItemRoutes = require('./routes/menuItemRoutes');    // menuItemRoutes require karna hai

// Use the routers
app.use('/person', personRoutes);  // we used here /person  
app.use('/menu', menuItemRoutes); // // we used here /menu 



app.listen(PORT, () => {                            // replace 3000 to PORT
    console.log('listening on port 3000')
})


