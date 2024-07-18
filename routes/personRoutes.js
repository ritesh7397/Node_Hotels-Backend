const express = require('express'); // express require hi hai
const router = express.Router();  // router bhi chahiye

const Person = require('../Models/Person'); // Models => Person.js  accept karega yaha






// POST ROUTE TO ADD A PERSON
router.post('/', async(req, res) => 
{
    try{
        const data = req.body;  // Assuming the request body contains the person data.
        // req.body me data save hora hai


        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data); // data fill kiya

        // Save the new Person to the database
        const response = await newPerson.save(); // wait kiya jab tak save na ho jaye
        console.log('Data Saved');
        res.status(200).json(response);
    
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})







//GET METHOD TO GET THE PERSON

router.get('/',async(req,res)=>
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
            // object id pass karege, dusra jo update karna hai
            new: true,              // Return the updated document
            runValidators: true,    // Run Mongoose validation
        })

        if (!response) {
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
    







// DELETE ROUTE TO DELETE THE PERSON

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
        return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data deleted");
        // Send a success message as a JSON response
        res.status(200).json({ message: 'Person deleted successfully' });
    } 
    catch (error) 
    {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router; // sb krne ke bad export karna hai