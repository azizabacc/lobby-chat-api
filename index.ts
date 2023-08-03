// import needed libraries
import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './route';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
// get express application
const app = express();
// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// EJS setup
app.use(expressLayouts);
// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

// Setting the view engine
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
  });
  
/* Home route */
app.get("/home", (req ,res) => {
	res.render('index.ejs')
});
// applying the routes to the basepath '/api'
app.use('/api', routes);
// define app port
const port = process.env.PORT || 3000;
// starts the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})