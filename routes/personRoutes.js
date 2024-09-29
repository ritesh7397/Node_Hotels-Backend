const express = require('express'); // express require hi hai
const router = express.Router();  // router bhi chahiye

const Person = require('../Models/Person'); // Models => Person.js  accept karega yaha // pehle server.js me accept kara tha

const {jwtAuthMiddleware, generateToken} = require('../jwt');





// POST ROUTE TO ADD A PERSON // SIGNUP
router.post('/signup', async(req, res) => 
{
    try{
        const data = req.body;  // Assuming the request body contains the person data.
        // req.body me data save hora hai


        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data); // data fill kiya

        // Save the new Person to the database
        const response = await newPerson.save(); // wait kiya jab tak save na ho jaye
        console.log('Data Saved');

        
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is :", token);

        res.status(200).json({response: response, token: token});
    
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})




// LOGIN ROUTE 

router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // reTurn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




//GET METHOD TO GET THE PERSON

router.get('/',jwtAuthMiddleware, async(req,res)=>
{
    try
    {
        const data = await Person.find(); // data get krne me time lag skta hai isliye await
                                          // PErson.find() person me jeetne record hai sb dikhayega
        console.log('Person Fetched Successfully');
        res.status(200).json(data);

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})







// PARAMETRISED API CALLS /: worktype like chef OR manager OR waiter

router.get('/:workType',async(req,res)=>{
    try
    {
        const workType = req.params.workType;    //  Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else
        {
            res.status(404).json({error: 'Invalid work Type'});
        }


    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})






// PUT ROUTE TO UPDATE THE PERSON



// id(unique hai) ke through apun data lege update karne le liye

router.put('/:id', async (req, res) => {     // id ke bdle kuch bhi le skte
    try {
        const personId = req.params.id;     // Extract the person's ID  from the URL parameter
        const updatedPersonData = req.body; //jo bhi data client bhj raha hai use body parser me save karta Updated data for the person
        // Assuming you have a Person model

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            //personID = object id pass karege,  updatedPerson = dusra jo update karna hai
            new: true,              // Return the updated document
            runValidators: true,    // Run Mongoose validation
        })

        if (!response) {            // response is null
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log("Data Updated");
        res.status(200).json(response);
        } 
    
    catch (error) 
    {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
    

// localhost:3000/person/ give id





// DELETE ROUTE TO DELETE THE PERSON

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
        return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data Deleted");
        // Send a success message as a JSON response
        res.status(200).json({ message: 'Person deleted Successfully' });
    } 
    catch (error) 
    {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router; // sb krne ke bad export karna hai
