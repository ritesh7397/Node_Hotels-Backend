const express = require('express') // npm i express
const app = express();
const db = require('./db');
require('dotenv').config();  // URL .env me hai ab

const bodyParser = require('body-parser'); // npm i body-perser
app.use(bodyParser.json());             // json data bhjre 


const PORT = process.env.PORT || 3000; // q ki port ab .env me hai



app.get('/', function (req, res) {
    res.send('ye be hotel madh, THUS');
})






// Import the Router files
const personRoutes = require('./routes/personRoutes');      // export wala yaha accept karna hai // personRoutes require karna hai
const menuItemRoutes = require('./routes/menuItemRoutes');    // menuItemRoutes require karna hai


// Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);




app.listen(PORT, () => {                  // replace 3000 to PORT
    console.log('listening on port 3000')
})

