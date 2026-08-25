const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200);
    res.send("Welcome to Ecommerce Backend API");
})

app.use('/api/user',userRoutes);



/*Notice that we don't call app.listen() here.*/

module.exports=app;
