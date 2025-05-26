const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){

  const authHeader = req.headers["authorization"];
  // Check if the authorization head is present
  if (!authHeader) {
    return res.status(401).json({message: "Authorization header missing"});
  }

  const token = authHeader.split(" ")[1]; 
  // Check if the token is present
  if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
  // Verify if token is valid or expired
    jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) {
        return res.status(403).json({message: "Invalid or expired token"});
    }

    req.user = user; // Store decoded payload in req
    next(); // Allow req to move forward
  })  
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
