const storage= require('node-persist'); 
const bcrypt = require('bcryptjs');
const getallUsers=async function (req,res){
try {
    const values=await storage.values(); // get all values from storage
    res.send(values);
    
} catch (error) {
    console.log(error);
}
}

const getUserById=async function (req,res){
    const id = req.params.id; // capturing the id from url
    try {
        const userData = await storage.getItem(id); // get the user from storage
        if (userData) {
            return res.status(200).send({'message:':'User found.', userData}); // if user found, send the user data
        }
        else
        res.status(404).send({'message': 'User not found.'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
}

const addUser=  (req,res)=>{
    const {id, name, email,country,password} = req.body;
    
    // destructuring the data from request body

    const hashedPassword = bcrypt.hash(password, 10); // hashing the password
 storage.setItem(id, {id,name, email, country,password:hashedPassword}) // storing the data in memory

res.status(201).send('New User Created.');
}
const deleteUser=async (req,res)=>{
    const id = req.params.id; // id i am capturing from url
    const userData=storage.getItem(id)
    if(userData){
        await storage.removeItem(id)
        res.send({message:"user Deleted Successfully"})
    }else{
    res.send({message:`User with ${id} is not registered with us`})
    }
    

}
const updateUser=async (req,res)=>{
    const id = req.params.id;
    const userData = await storage.getItem(id); // get the user data from storage
    if(userData)
    {
        const{name, email, country,password} = req.body; // destructuring the data from request body
        if(name) userData.name = name; // update name if provided
        if(email) userData.email = email; // update email if provided
        if(country) userData.country = country; // update country if provided
        if(password) userData.password = bcrypt.hash(password,10); // update password if provided
        await storage.updateItem(id, userData); // update the user data in storage
        res.status(200).send({message: 'User updated'})
    }
else{
        res.send(`User with ID ${id}  not available updated successfully.`);
}
    
}
const loginUser=async (req,res)=>{
    const {email,password} = req.body; // destructuring the data from request body
    if(!email || !password) 
        return res.status(400).send({message: 'Email and password are required'}); // if email or password is not provided, send error message
    
    const users = await storage.values(); // get all users from storage

    const user = users.find(user => user.email === email); // find the user with the given email
    if(user){
        const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password with the hashed password
        if(isPasswordValid){
            res.status(200).send({message: 'Login successful', user}); // if password is valid, send success message and user data
        }else{
            res.status(401).send({message: 'Invalid password'}); // if password is invalid, send error message
        }
    }else{
        res.status(404).send({message: 'email not registered with us'}); // if user not found, send error message
    }
}
module.exports = {getallUsers,getUserById,addUser,deleteUser,updateUser,loginUser} // exporting the adduser function