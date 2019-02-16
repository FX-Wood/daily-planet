const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override')


// helpers
const path = 'static/articles.json'
const getArticles = function() {
    return JSON.parse(fs.readFileSync(path))
}
const setArticles = function(obj) {
    fs.writeFileSync(path, JSON.stringify(obj), )
}


// init
const app = express();
app.listen(3000, function() {
    console.log('Daily Planet serving on port 3000')
})

// middleware
app.use(express.static('static'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


// root | GET 
app.get('/', function(req, res) {
    res.redirect('/articles');
});

// /articles | GET | PUT
app.get('/articles', function(req, res) {
    res.render('articles', {data: getArticles()})
});

app.post('/articles', function(req, res) {
    
    res.redirect('/articles');
});

// /articles/:id | GET | PUT | DELETE
app.get('/articles/:id', function(req, res) {
    res.render('articles/show');
});

app.put('/articles/:id', function(req, res) {
    
});

app.delete('/articles/:id', function(req, res) {

});

// /widgets/new | GET

