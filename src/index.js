const express = require('express');
const routes = require('./routes')
const handlebars = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/petsDb')
.then(() => {
    console.log('DB conected')
})
.catch(err => console.log('DB ERROR', err.message));




app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');



app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser());

app.use(auth)

app.use(routes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})