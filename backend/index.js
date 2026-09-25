const express=require('express');
const cors=require('cors');
require("dotenv").config();

const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

const app=express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('ISHQAVE CHADIYA THU KAK DAAVI SAANU');
});

app.use("/api/posts", postRoutes);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

