const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// reset articles each time
setArticles(JSON.parse(fs.readFileSync('static/articles-lock.json')));


// root | GET 
app.get('/', function(req, res) {
    console.log('GET root')
    res.redirect('/articles');
})

// /articles | GET
app.get('/articles', function(req, res) {
    console.log('GET /articles')
    res.render('articles', {data: getArticles()})
});

// /articles/:id | GET | PUT | DELETE
app.route('/articles/:id')
    .get(function(req, res) {
        console.log('GET /articles/:id')
        res.render('articles/show', { id: req.params.id, data: getArticles()[req.params.id]});
    })
    .put(function(req, res) {
        console.log('PUT /articles/:id')
        console.log(req.body.title, req.body.body)
        let a = getArticles();
        let i = req.params.id;
        a[i] = ({ title: req.body.title, body: req.body.body })
        setArticles(a)
        res.redirect('/articles/' + i)
    })
    .delete(function(req, res) {
        console.log('DELETE /articles/:id')
        let a = getArticles();
        let i = req.params.id;
        a.splice(i, 1);
        setArticles(a);
        res.redirect('/articles')
    })

// /widgets/new | GET
app.get('articles/new', function(req, res) {

})
