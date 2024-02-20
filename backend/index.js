import express from "express";

import connectDb from "./db.js";
import cors from "cors";
import route from "./route.js";


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

connectDb.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to server");
    
    const sqlQuery = `
      CREATE TABLE IF NOT EXISTS shivam (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fname VARCHAR(20),
        lname VARCHAR(20),
        address VARCHAR(30),
        email VARCHAR(30),
        password VARCHAR(200),
        confirmPassword VARCHAR(200),
        phone INT
      );
    `;

    connectDb.query(sqlQuery, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table created");
      }
    });
  }
});


app.use('/api',route);


app.listen(PORT, () => {
  console.log(`Server connected at port: ${PORT}`);
});
