const express = require('express');
const router = express.Router();

const MenuItem = require('../Models/MenuItem');






// POST ROUTE TO ADD THE MENU

router.post('/',async(req,res)=>
{
    try
    {
        const menuItemData = req.body;
        const newmenuItem = new MenuItem(menuItemData);

        const menu_data = await newmenuItem.save();
        console.log('Menu Item Saved');
        res.status(200).json(menu_data);


    }
    catch(err)
    {
        console.log("Error creating menu Item",err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})






//GET METHOD TO GET THE MENU
router.get('/', async(req,res)=>
{
    try
    {
        const menuItemData = await MenuItem.find();
        console.log('Menu Item Fetched Successfully');
        res.status(200).json(menuItemData);

    }
    catch(error)
    {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})








// Parametrised API CALLS : /:taste like sweet OR sour OR spicy

router.get('/:taste', async (req, res) =>{
    try{

            const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
            if(tasteType == 'sweet' || tasteType == 'sour' || tasteType =='spicy' )
            {
                const response = await MenuItem.find({taste: tasteType});
                console.log('response fetched');
                res.status(200).json(response);
            }
            else
            {
                res.status(404).json({error: 'Invalid Taste type'});
            }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;