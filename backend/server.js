const express = require('express');
const dotenv = require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000

app.get('/', (req,res)=>{ 
    res.status(200).json({message:'Welcome to hell'})
})

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))