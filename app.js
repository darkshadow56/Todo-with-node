const bodyParser = require("body-parser");
const express = require("express");
let ejs = require("ejs");
const { json } = require("body-parser");
const app = express();
PORT = process.env.PORT  || 3000
var Todos = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
  console.log("Home route");
  var day = new Date();
  var currentDay = day.getDay();
  options = {
      day:"numeric",
      weekday: 'long',
      month: 'long',
      year: 'numeric'
}
    let setDay = day.toLocaleDateString('en-US', options);  
  res.render("days", { currentDay: setDay, addNewTodos: Todos });
});
app.post('/', (req, res)=>{
    var newTodo = req.body.addTodo;
    Todos.push(newTodo);
    res.redirect('/');
})

app.listen(3000, () => {
  console.log("Server Started");
});
