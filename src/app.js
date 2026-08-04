const express = require('express');

const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200);
    res.send("Welcome to Ecommerce Backend API");
})

/*Notice that we don't call app.listen() here.*/

module.exports=app;
