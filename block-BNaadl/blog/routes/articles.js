let express = require("express");
let router = express.Router();
let Article = require("../models/articles");

router.get("/", (req, res, next) => {
  let articles = [];
  Article.find({}, (err, docs) => {
    articles = docs;
    console.log(articles);
    res.render("listArticles", {list: articles});
  });
});

router.get("/new", (req, res, next) => {
  res.render("createArticle");
});

router.post("/", (req, res, next) => {
  Article.create({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    author: req.body.author
  }, (err, doc) => {
    err ? next(err) : console.log("Article Saved");
    res.redirect("/articles")
  });
});

router.post("/edit", (req, res, next) => {
    Article.findOne({_id: `${req.body.id}`}, (err, doc) => {
        res.render("createArticle", {message: doc});
        console.log(doc);
    })
});

module.exports = router;
