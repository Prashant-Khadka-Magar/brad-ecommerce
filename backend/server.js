import express from 'express';
import {products} from './data/allProducts.js'
import connectDb from './config/db.js';
//SETTING UP .env
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 5000;

//connect to mongoDB using mongoose
connectDb() 
const app=express();

app.get('/api/products', (req, res) =>{
    res.json(products)
})
app.get('/api/products/:id', (req, res) =>{
    const product=products.find((product)=>product._id===req.params.id)
    res.json(product)
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})