// Config the config:
require("dotenv").config()
console.log(process.env.CLAVE_SUPER_SECRETA);

// Connects to the database... if we had one :(           
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/my-first-db")
.then(() => {
  console.log("Server connected to DB");
})
.catch((error) => {
  console.log(error);
})

// Handles http requests (express is node js framework)
const express = require('express');
const app = express();


// Handles the handlebars
const hbs = require("hbs");


// This part runs most pieces of middleware
app.use(express.static("public"))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/' )
const morgan = require("morgan")
app.use(morgan("dev"))
const favicon = require("serve-favicon")
app.use(favicon(__dirname + "/public/images/favicon.ico"))

// Local Variables 
// TODO           

const Movie = require("./models/Movie.model")

// 👇 Start handling routes here
app.get('/', (req, res, next) => {
  res.render("home.hbs")
})

app.get('/about', (req, res, next) => {
  res.render("about.hbs")
})

app.get('/movies', (req, res, next) => {
  Movie.find()
  .then((response) => {
    // console.log(response);
    res.render("movies.hbs", {
      allMovies: response
    })
  })
  .catch((error) => {
    // console.log(error);
    // Go to error handler type 500:
    next(error);
  })
  
})


// To handle errors.
// 404 Not Found:
app.use((req, res, next) => {
  res.status(404).render("not-found.hbs")
})
// 500:
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render("error.hbs")
})


// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});