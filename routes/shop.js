const express = require('express');
const router = express.Router();
const path = require('path');
const viewsDirPath = path.join(__dirname , './../views');
const shopHtmlPath = path.join(viewsDirPath , '/shop.html')



router.get('/' , (req , res , next)=>{
    res.sendFile(shopHtmlPath)
})



module.exports = router;