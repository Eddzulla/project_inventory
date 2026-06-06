const express = require('express');
const path = require('node:path');
const app = express();
const port = 3000;
const assetsPath = path.join(__dirname,"public");


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const shopRouter = require('./routes/shopRoutes.js');

app.use(express.urlencoded({ extended: true }));

// Admin middleware
const admin = require('./controllers/adminController');
app.use((req, res, next) => {
  res.locals.isAdmin = admin.getAdmin();
  next();
})

const db = require("./db/queries");
app.use(async (req, res, next) => {
  res.locals.categories = await db.getCategories(); 
  res.locals.brands = await db.getBrands();
  next();
});

app.use('/', shopRouter);

app.listen(port, (error) => {
  if(error){
    throw(error);
  }
  console.log(`Server running at http://localhost:${port}`);
});