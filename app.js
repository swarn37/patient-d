
var express = require('express');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/project");
const app = express();
app.use(express.urlencoded())
var session=require('express-session');
app.use(express.json());
app.use(express.static('public'));
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));
var flag=0;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');


 mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
  });
  
  mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
  });

  
var Schema=mongoose.Schema;
let User=new Schema({
    name:String,
    address:String,
    mobile:Number,
    email:String,
   dob:Date,
   card:Number,
   carde:Date
});



var user = mongoose.model("pros",User);





app.get("/",function(req,res)
       {
    res.render('adminPanel');
});


app.get('/add', function (req, res, next) {
 
  res.render('adminPanel');

});

app.get('/search', function (req, res, next) {
 
  res.render('searchPanel');

});


function getTest() {
  console.log(test);
}

app.post("/adduser", (req, res) => {
    var myData = new user(req.body);
    var verify=myData.mobile;
    console.log(myData);
   if(myData.name=='' || myData.mobile==null || myData.email=='' || myData.dob==null || myData.card==null || myData.carde==null || myData.address=='')
   {
    res.render('errorPanel2');
   }
  
   user.findOne({ mobile: req.body.mobile}).exec(function(err, user){

    if (user) 
    {
      res.render('errorPanel');  
    }
    else 
    {
      myData.save()
      .then(item => {
        res.render('adminPanel');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
    }
  
  });
 
    
 });
    
    
    
 

 

 


app.get('/display',function(req,res){
  
  user.find().sort('name').exec(function(err,users){
    if(err)
    {
      console.log(error);
    }
    else{
      res.render('display-table',{users:users});
      //console.log(pros);
    }
  });
});

/*app.get('/searchuser',function(req,res){

  
 
  user.find({mobile:req.query.umobile},(function(err,users){
    if(err)
    {
      console.log(error);
    }
    else{
      //console.log(users);
      res.render('display-table',{users:users});
      
    }
  })
  );
});



app.get('/edit/:id',function(req,res){
  user.findById(req.params.id,function(err,users){
    if(err){
      console.log(err);
    }
    else{
      res.render('edit-form',{users:users});
    }
  });
});*/

app.get('/searchuser',function(req,res){

  
 
  user.find({mobile:req.query.umobile},(function(err,users){
    if(err)
    {
      console.log(error);
    }
    else{
      //console.log(users);
      res.render('dis',{users:users});
      
    }
  })
  );
});



app.get('/edit/:id',function(req,res){
  user.findById(req.params.id,function(err,users){
    if(err){
      console.log(err);
    }
    else{
      res.render('edit-form',{users:users});
    }
  });
});


app.get('/delete/:id',function(req,res){
  user.findOneAndDelete(req.params.id,function(err,users)
  {
    if(err){
      res.redirect('../display'); 
    }
    else{
      res.redirect('../display');
    }
  });
});



app.post('/edit/:id',function(req,res){
  const mydata={
    name:req.body.name,
    address:req.body.address,
    mobile:req.body.mobile,
    email:req.body.email,
    dob:req.body.dob,
    card:req.body.card,
    carde:req.body.carde,
   
  }
 user.findByIdAndUpdate(req.params.id,mydata,function(err){
    if(err){
      res.redirect('/edit/'+req.params.id);
    }else{
        res.redirect('../display');
      }
    
  });
});





app.listen(8000);