import express from 'express';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
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

// Method override 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// Connect mongodb database
connectDB()

app.use('/cards', cardRouter)

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

