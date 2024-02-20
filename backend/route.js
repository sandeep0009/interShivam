import { Router } from "express";
import connectDb from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import tokenVerify from "./tokenVerify.js";

const secret="1234!@#$sad"

const route = Router();

route.post('/singup', async (req, res) => {
    try {
        const { fname, lname, address, email, password, confirmPassword, phone } = req.body;

        if (!(fname && lname && address && email && password && confirmPassword && phone)) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlQuery = `
            INSERT INTO shivam (fname, lname, address, email, password, phone)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        connectDb.query(sqlQuery, [fname, lname, address, email, hashedPassword, phone], (error, result) => {
            if (error) {
                console.error("Error while executing SQL query:", error);
                return res.status(500).json({ message: "Internal server error" });
            }

            console.log("User registered successfully");
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


route.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const sqlQuery = `SELECT * FROM shivam WHERE email = ?`;
        connectDb.query(sqlQuery, [email], async (error, results) => {
            if (error) {
                console.error("Error while executing SQL query:", error);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid email or password" });
            }


            const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

            res.status(200).json({ message: "Login successful", token });
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




route.get('/',tokenVerify,async(req,res)=>{
    try{
  
      const sql=`
      Select id,Fname,Lname,address from shivam ;
      
      `;
  
      connectDb.query(sql,(err,result)=>{
        if(err){
          return res.status(500).json({message:"error"})
  
        }
        res.status(200).json({ data: result })
      })
  
    }
  
    catch(error){
      console.log(error)
    }
  })





  route.put('/update/:id', async (req, res) => {
    try {
      const { Fname, Lname, email, address } = req.body;
      const userId = req.params.id;
      console.log(userId)
  
      const sql = `
        UPDATE shivam
        SET Fname=?, Lname=?, email=?, address=?
        WHERE id=?;
      `;
  
      connectDb.query(sql, [Fname, Lname, email, address, userId], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        res.status(200).json({ message: "Record updated" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  route.delete('/delete/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      const sql = `
        DELETE FROM shivam
        WHERE id = ?;
      `;
  
      connectDb.query(sql, [userId], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        res.status(200).json({ message: "Record deleted" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default route;
