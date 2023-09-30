const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const cors = express('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')

//db details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nachi',
  database: 'temp1'
})
connection.connect(function(err) {
  if (err) throw err
  console.log(`'You are now connected to connection...`);
})

//getting data in json form
app.use(express.json());

// static files added to server
app.use(express.static(path.join(__dirname, 'public')));

//using body parser to decode html data received
app.use(bodyParser.urlencoded({
  extended: true
}));

//changing data to json
app.use(bodyParser.json());

// home page push
app.get('/form', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
})

//post res upon fetch req.
app.post('/formPost',(req,res)=>{

  //console.log(req.body);
  const dataReceived = req.body;
  
  connection.query(`SELECT * FROM data WHERE username='${dataReceived.username}'`, function(err,result){
    if (err) throw err;
    let row = Object.values(JSON.parse(JSON.stringify(result)));
    //console.log(row);
    if(row[0].password==dataReceived.password)
      res.sendFile(path.join(__dirname, '/public/thanks.html'));
    else{
        console.log("USERNAME OR PASSWORD IS WRONG, TRY RESETING THE PASSWORD");
  }
  })
  
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/signup.html'));
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})