//Declarations
const dbPassword = 'dbadmin';
const bodyParser = require("body-parser");
const express = require("express");
let ejs = require("ejs");
const { json } = require("body-parser");
const getDate = require("./Date.js");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
var Todos = [];
let requestedId = 0;

mongoose.connect('mongodb+srv://dbAdmin:dbadmin@cluster0.zksvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Connected!")
  }
});
console.log('Connection established with Databse');
const itemsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  }
});
const Item = mongoose.model('item', itemsSchema);

//Setting view engine for rendering ejs
app.set("view engine", "ejs");

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//Routes
app.get("/", (req, res) => {
  let setDate = getDate.getDate();
  let setDay = getDate.getDay();
  Item.find({}, (err, fetchedItems)=>{
    if(err){
      console.log(err);
    }else{
        res.render("days", { currentDay: setDate, addNewTodos: fetchedItems });
    }
  });
  
});
// app.get('/:todoId', (req, res)=>{
//   let paramReq = req.params.todoId;
//   requestedId = paramReq;
//   res.redirect('/');
// });

app.post("/", (req, res) => {
  var newTodo = req.body.addTodo;
  const userInsertedTodo = new Item({
    name: newTodo
  });
  userInsertedTodo.save();
  console.log("New todo added", newTodo);
  res.redirect("/");
});

app.post('/delete', (req, res)=>{
  checkedTodoItem = req.body.checkBox;
  Item.deleteOne({ _id: checkedTodoItem }, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('Selected Todo Item deleted successfully')
    }
  })
  res.redirect('/');
})

//Creating server connection port
app.listen(PORT, () => {
  console.log("Server Started at port", PORT);
});
