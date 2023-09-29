const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const cors = express('cors');
var bodyParser = require('body-parser');

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


app.post('/formPost',(req,res)=>{

  //console.log(req.body);
  const dataReceived = req.body;
  
  

  if(dataReceived.username == "Nachiket"){
    res.sendFile(path.join(__dirname, '/public/thanks.html'));
  }
  else{
    console.log("Machudao");
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})