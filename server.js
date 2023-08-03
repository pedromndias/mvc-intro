// Connects to the database... if we had one :( 
// TODO                                        


// Handles http requests (express is node js framework)
const express = require('express');
const app = express();


// Handles the handlebars
const hbs = require("hbs");


// This part runs most pieces of middleware
app.use(express.static("public"))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/' )


// Local Variables 
// TODO           


// 👇 Start handling routes here
app.get('/', (req, res, next) => {
  res.render("home.hbs")
})

app.get('/about', (req, res, next) => {
  res.render("about.hbs")
})

app.get('/movies', (req, res, next) => {
  res.render("movies.hbs")
})


// To handle errors.
// TODO            


// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000

app.listen(3000, () => {
  console.log(`Server listening on port http://localhost:${3000}`);
});