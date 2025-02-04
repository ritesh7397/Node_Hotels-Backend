const mongoose = require('mongoose'); // install moongose // npm i moongoose
require('dotenv').config();  // URL .env me hai ab


// 1). Define the MongoDB connection URL


//THIS IS LOCAL URL
const mongoURL = 'mongodb://localhost:27017/apnahotel' // Replace mydatabase(hotels) with ur databse name
// const mongoURL = process.env.MONGODB_URL_LOCAL;
 



// THIS IS ONLINE MONGODB CLUSTER AVAILABLE
//  const mongoURL = process.env.MONGODB_URL;

 



 
// 2). Set up MongoDB Connection

   mongoose.connect(mongoURL)

// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// aisa krna bhi pad skta hai


// mongoose.connect('mongodb://localhost:27017/hotels',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });



// 3). Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.

const db = mongoose.connection;



// 4). Define Event Listeners for database connection and  
// 5). Start Listening for Events: 

db.on('connected', () => {
    console.log("Connected to MongoDB server")
});

db.on('error', (err) => {
    console.log("MongoDB connection error", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});




// 6). Export the Database Connection

module.exports = db;
