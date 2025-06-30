const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();
const bcrypt = require("bcrypt");
const {Pool} = require("pg");
const jwt = require("jsonwebtoken")


const  jwtSecret =  "shoaib"

const pool = new Pool({
    user:"postgres",
    database:"HASSAN",
    host:"localhost",
    password:"shoaib@#9140",
    port:"5432"
})


app.use(express.json());
app.use(cors())

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.post("/signup" ,async (req,res)=>{
    const {name,email,password} =  req.body;
    try {
         const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
    if(user.rows.length>0){
      return  res.status(401).json({
            message:"User already register"
        })
    }

const salt = 10;
const genSalt = await bcrypt.genSalt(salt);
const bcryptpassword = await bcrypt.hash(password,genSalt)


    const insertUser = await pool.query("INSERT INTO users (user_name,user_email,user_password)  VALUES ($1,$2,$3) RETURNING *",[name,email,bcryptpassword])



    const token = jwt.sign(
        {email:insertUser.rows[0].user_email,
         bcryptpassword: insertUser.rows[0].user_password,},
        jwtSecret,
        {expiresIn:"1h"}

    )


return res.status(200).json({
    message:"Register successfully",
    token:token
})

    } 
     catch (error) {
        console.log(error);
      return  res.status(500).json({
            message:"Server error"
        })
    }
   
})



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (check.rowCount === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, check.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }

    const token = jwt.sign(
      { email: check.rows[0].user_email, bcryptpassword: check.rows[0].user_password },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


app.get("/protected", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to the protected route!",
    user: req.user.email,
    user:req.user.password,
  });
});


app.get("/dashboard", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your dashboard!",
    email: req.user.email,
    bcryptpassword: req.user.bcryptpassword,
  });
});


app.post("/update", verifyToken, async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if (user.rowCount === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.rows[0].user_password);
    if (!validPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE users SET user_password = $1 WHERE user_email = $2", [
      hashedPassword,
      email,
    ]);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});




app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

