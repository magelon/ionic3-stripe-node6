var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());



app.post('/charge', function (req, res) {
 
    console.log(req.body.token);
var token = req.body.token;//.body.token; // Using Expres


  var stripe = require("stripe")(
  "sk_test_8zTKgfF4nsEoYt9QRxkXSPSD"
);
    
stripe.charges.create({
  amount: 2000,
  currency: "usd",
  source:token, // obtained with Stripe.js "tok_1ABxSjI6UHL0Mvw5U3MAfAKZ"
  description: "Charge for anthony.jones@example.com"
}, function(err, charge) {
  // asynchronously called
});
res.send('just spend 20 for noreason')
    
}
)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})