const express = require('express');
const router = express.Router();
const path = require('path');
const viewsDirPath = path.join(__dirname , '../views')

router.get('/add-product' , (req , res , next)=>{

    
    res.sendFile(path.join(viewsDirPath , 'add-product.html'))
})
router.post('/add-product' , (req , res , next)=>{

    console.log(req.body)
    res.redirect(`/`)
});


module.exports = router;