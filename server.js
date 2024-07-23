import express from 'express';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cardRouter from './routes/cardRouter.js';
import connectDB from './configs/db.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

// Set up to use static file serving
app.use(express.static('public'));

// Set view of handlebars
app.engine('.hbs', exphbs.engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views')

// Middleware to parse json file 
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect mongodb database
connectDB()

app.use('/cards', cardRouter)

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

