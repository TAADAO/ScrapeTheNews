var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var mongoose = require('mongoose');

var routes = require("./routes/routes.js");

var app = express();

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect("mongodb://localhost/8000", { useNewUrlParser: true });

app.use(express.static("public"));

app.use("/", routes);

var port = process.env.PORT || 8000;

app.listen(port, function()
{
  console.log("Running on port: " + port);
});