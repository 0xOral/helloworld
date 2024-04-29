
const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql2")

var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('.'))

app.listen("8080", ()=>{
    console.log("server up")
})


let database_auth = {
    host: "192.168.43.200",
    user: "anas",
    password: "palestine",
    database: "users"
}

const connection = mysql.createConnection(database_auth)

connection.connect((err)=>{
    if (err){
        console.log(err)
        return;
    }
    console.log(`mysql connected to ${database_auth.database} via ${database_auth.user}`)
})



let sql_del = "DELETE FROM creds WHERE id='8';"

// connection.end(()=>{
//     console.log("connection ended.")
// })

app.get("/", (req, res)=>{
    res.sendFile(__dirname.slice(0, -2) + "/index.html")
    console.log("resposed.")
})

app.post("/signup", (req, res)=>{

    let sql_post = "INSERT INTO creds (username,password) VALUES (?, ?);"
    let user = req.body.username
    let pass = req.body.password
    connection.query(sql_post, [user, pass], (err, results)=>{
        (err ? console.error("Error inserting data:", err) : console.log("Data inserted successfully."));
    })
    console.log(`a new user has been added{
        username ${req.body.username},
        password: ${req.body.password}
    }`)

    res.sendFile(__dirname.slice(0, -2) + "/index.html")
})

app.post("/login", (req, res)=>{

    let user = req.body.username
    let pass = req.body.password
    connection.query("SELECT * FROM creds WHERE username='" + user + "';", (err, results)=>{
        if (err) {
            console.error(err)
            return res.status(500).send("Internal server error")
        }if (results.length === 0){
            console.error("user not found.")
            return res.status(401).setHeader('massage', 'user not found').sendFile(__dirname.slice(0, -2) + "/login.html");
        }if (results[0].password == pass){
            console.log("login successful.")
            return res.status(200).set({'user-agant': 'f156', 'Content-Type': 'text/html'}).sendFile(__dirname.slice(0, -2) + "/index.html")
        }
        console.error("wrong password.")
        return res.status(401).setHeader('massage', 'wrong password').sendFile(__dirname.slice(0, -2) + "/login.html");
    })
})

app.get("/api/:name", (req, res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send("done")
})
