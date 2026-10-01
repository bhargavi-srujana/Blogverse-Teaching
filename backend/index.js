const express=require('express');
const cors=require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app=express();
//middleware example
app.use((req, res, next) => {
    console.log('this is a middlware');
    next();
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('ISHQAVE CHADIYA THU KAK DAAVI SAANU');
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
};

startServer();