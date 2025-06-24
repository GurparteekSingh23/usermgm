const express=require('express');

const storage= require('node-persist'); // for storing data in memory
const cors = require('cors'); // for enabling CORS

require('dotenv').config();
storage.init();
const UserController=require('./routes/UserRoutes')

const app=express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors())


app.use('/api/v1/user',UserController);
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
}       )