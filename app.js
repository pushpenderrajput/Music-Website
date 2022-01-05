const express = require("express");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactMusic', {useNewUrlParser: true});
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String, 
    email: String,
    suggest: String,
});
var Contact = mongoose.model('Contact',contactSchema);
app.use('/static', express.static('static'))
app.use(express.urlencoded())


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Saved");
    }).catch(()=>{
        res.status(400).send("Not Saved!");
    });
    //res.status(200).render('contact.pug');
});
app.listen(port, () => {
    console.log('Server running at Port:${port}');
});