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
    console.log('this is a middleware');
    next();
});
app.use((req, res, next) => {
    console.log('this is a middleware2');
    next();
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json({ limit: "3mb" }));
app.use(cookieParser());

//session and cookie
app.use(session({
    secret: process.env.SESSION_SECRET || "classroom-secret",
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.get('/',(req,res)=>{
    res.cookie('cookieName','thisIsSecret');
    res.send('server is running');
});

app.get('/cookie',(req,res)=>{
    console.log(req.cookies);                
    res.send('Cookie route');
});

//sessions and cookies done

//jwt demo (same technique as final auth, simplified for teaching)
const JWT_SECRET = process.env.JWT_SECRET || "teaching-secret";
app.get('/jwt',(req,res)=>{
    let token = jwt.sign({user:"Srujana"}, JWT_SECRET);
    res.cookie('srujanaToken', token, { httpOnly: true });
    console.log(token);
    res.send('jwt route');
});

app.get('/jwt-verify',(req,res)=>{
    let token = req.cookies.srujanaToken;
    let data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    res.send('jwt verify route');
})
//end of jwt auth middleware

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