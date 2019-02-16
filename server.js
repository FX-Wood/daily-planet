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
})

// /articles | GET
app.get(function(req, res) {
    res.render('articles', {data: getArticles()})
});

// /articles/:id | GET | PUT | DELETE
app.route('/articles/:id')
    .get(function(req, res) {
        res.render('articles/show', {data: getArticles()[req.params.id]});
    })
    .put(function(req, res) {
        
    })

    .delete(function(req, res) {

    })

// /widgets/new | GET
app.get('articles/new', function(req, res) {

})
