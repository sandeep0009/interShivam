import mysql from "mysql2"


let connectDb=mysql.createConnection({
    host: "127.0.0.1", 
    port: 3306,
    user: "root",
  password: "",
  database: "",
})

export default connectDb