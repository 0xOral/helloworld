
const express = require('express')
const bodyParser = require('body-parser')
var app = express()
app.listen(8080)
// app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// app.get('/', (request, response)=>{
    
//     console.log(request.body)
//     response.sendFile()
// })

// app.get('/login', (request, response)=>{  
//     response.sendFile("login.html")
//     console.log(request.body)
// })

// app.post('/login', (request, response)=>{
    
//     response.end()
//     console.log(request.body)
// })