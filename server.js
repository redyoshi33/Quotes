var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes');

var AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, "Name must be at least 3 characters"]},
  quotes: [{ quote: {type: String, minlength: [3, "Quote must be at least 3 characters"]}, votes: { type: Number, default: 0}}]
}, { timestamps: true})

mongoose.model('Author', AuthorSchema); 
var Author = mongoose.model('Author') 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/quoteApp/dist')));

app.get('/all', function(req, res) {
  //sort - means descending order
  Author.find({}, null, {sort: "-createdAt"}, function(err, authors){
    if(err){
      res.json(err)
    }
    else {
      res.json({authors: authors})
    }
  })
})
app.get('/edit/:id', function(req,res) {
  Author.findOne({_id: req.params.id}, function(err, author) {
    if(err){
      res.json(err)
    }
    else{
      author.quotes.sort(function(a,b){return b.votes - a.votes})
      res.json({author: author})
    }
  })
})
app.post('/new', function(req, res) {
  let author = new Author({name: req.body.name})
  author.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      res.json(err)
    } 
    else { // else console.log that we did well and then redirect to the root route
      res.json({message: "Success in adding new task", data: author})
    }
  })
})
app.put('/update/:id', function(req, res) {
  Author.findOne({_id: req.params.id}, function(err, author) {
    if(err){
      res.json(err)
    }
    else{
      author.name = req.body.name
      author.save(function(err) {
        if(err) {
          res.json(err)
        } 
        else { // else console.log that we did well and then redirect to the root route
          res.json({data: author})
        }
      })
    }
  })
})
app.post('/newquote/:id', function (req, res) {
  Author.findOne({_id: req.params.id}, function(err, author) {
    if(err){
      res.json(err)
    }
    else{
      console.log(req.body.quote)
      author.quotes.push({quote: req.body.quote})
      author.save(function(err) {
        if(err) {
          res.json(err)
        } 
        else { // else console.log that we did well and then redirect to the root route
          res.json({data: author})
        }
      })
    }
  })
})
app.put('/quote/delete/:id', function( req, res) {
  Author.findOne({_id: req.params.id}, function(err, author) {
    if(err){
      res.json(err)
    }
    else{
      for(let i =0; i<author.quotes.length; i++){
        if(req.body._id == author.quotes[i]._id){
          author.quotes.splice(i, 1)
        }
      }
      author.save(function(err) {
        if(err) {
          res.json(err)
        }
        else{
          res.json({author: author})
        }
      })
    }
    })
  })
app.put('/quote/vote/:id/:num', function(req, res) {
  Author.findOne({_id: req.params.id}, function(err, author) {
    if(err){
      res.json(err)
    }
    else{
      for(let i =0; i<author.quotes.length; i++){
        if(req.body._id == author.quotes[i]._id){
          author.quotes[i].votes += Number(req.params.num)
        }
      }
      //sort -1 is descending
      //author.quotes.sort(function(a,b){return b.votes - a.votes})
      author.save(function(err) {
        if(err) {
          res.json(err)
        }
        else{
          res.json({author: author})
        }
      })
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./quoteApp/dist/index.html"))
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
