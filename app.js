// App.js

/*
    SETUP
*/
var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
const cors = require('cors');

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3029);
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));
app.use(cors())

app.get('/',function(req,res){
  res.render('home.handlebars') 
});

app.get('/locations',function(req,res){
  res.render('locations.handlebars', {userDisease: JSON.stringify(req.query.disease), userStay: JSON.stringify(req.query.stay)}) 
});

app.get('/diseases',function(req,res){
  res.render('diseases.handlebars') 
});

app.get('/treatments',function(req,res){
  res.render('treatments.handlebars') 
});

app.get('/hospitals',function(req,res){
  res.render('hospitals.handlebars') 
});

app.get('/pediatrics',function(req,res){
  res.render('pediatrics.handlebars') 
});

app.get('/showTreatments',function(req,res){
  res.render('showTreatments.handlebars', {userState: JSON.stringify(req.query.state)}) 
});


app.listen(app.get('port'), function(){
	console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
