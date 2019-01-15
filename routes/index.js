var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  throw new Error("Error in request");
});

router.get('/news', function(req, res, next) {
  fs.readFile('public/news/articles.json', 'utf8', function (err, data) {
    if (err) throw err
    let news = JSON.parse(data);
    res.send(news);
  });
});

router.get('/news/:id', function(req, res, next) {
  console.log(`GET request with ID: ${req.params.id}`)
  res.send(`GET request with ID: ${req.params.id}`)
});

router.post('/news', function(req, res, next) {
  console.log(`POST request with BODY: ${JSON.stringify(req.body)}`)
  res.send(`POST request with BODY: ${JSON.stringify(req.body)}`)
});

router.put('/news/:id', function(req, res, next) {
  console.log(`PUT request with ID: ${req.params.id} and BODY: ${JSON.stringify(req.body)}`)
  res.send(`PUT request with ID: ${req.params.id} and BODY: ${JSON.stringify(req.body)}`)
});

router.delete('/news/:id', function(req, res, next) {
  console.log(`DELETE request with ID: ${req.params.id}`)
  res.send(`DELETE request with ID: ${req.params.id}`)
});

module.exports = router;
