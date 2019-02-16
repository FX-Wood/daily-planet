const express = require('express');
const app = express();
const fs = require('fs');



app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('root');
})

app.get('/articles', function(req, res) {
    const articles = JSON.parse(fs.readFileSync('static/articles.json'));
    res.render('articles/index', {data: articles})
});



app.listen(3001)