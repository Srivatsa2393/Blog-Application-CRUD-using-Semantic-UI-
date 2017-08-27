var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");

//title,image,body,created

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//work on mongoose schema 
//schema //MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//model
var Blog = mongoose.model('Blog', blogSchema);

/* Blog.create({
    title: 'Test Blog',
    image: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
    body: 'Hello this is a blog post'
}); */

//RESTFUL ROUTES
//Index route
app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/blogs', (req, res) => {
    Blog.find({}, function(err, blogs){
        if (err){
            console.log('error');
        }else{
            res.render('index', {blogs: blogs});
        }
    });
});

//New route
app.get('/blogs/new', (req, res) => {
    res.render('new');
});


//create route
app.post('/blogs', (req, res) => {
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render('new');
        }else{
            //then redirect to the index 
            res.redirect('/blogs');
        }
    });
});

//Show route
app.get('/blogs/:id', (req, res) => {
    //res.send('Show page');
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect('/blogs');
        }else {
            res.render('show', {blog: foundBlog})
        }
    });
});

app.listen(3000,() => {
    console.log('Your blog app server is started');
})