const express = require('express');
const router = express.Router();
const fs = require('fs');
const log = require('../public/javascripts/log')
const News = require('../mongo')
const User = require('../user')
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'TEST'})
});

router.get('/news', function(req, res, next) {
  log.info('GET request')

  News.find({}, (err, docs) => {
    res.send(docs)
  })
});

router.get('/news/:id', function(req, res, next) {
  log.info('GET request with ID')
  News.findById(req.params.id, (err, news) => {
    res.send(news)
  })
});

router.post('/news', function(req, res, next) {
  log.info('POST request')
  let news = new News(req.body)
  news.save()
  .then(function(doc){
      console.log("Сохранен объект", doc);
  })
  .catch(function (err){
      console.log(err);
  });
  res.send(`POST request with BODY: ${JSON.stringify(req.body)}`)
});

router.post('/register', function(req, res, next) {
  let user = new User({ username: req.body.email, password: req.body.password});
  user.save()
  .then(function(doc){
      console.log("Сохранен пользователь", doc);
  })
  .catch(function (err){
      console.log(err);
  })
  res.redirect('/')
});

router.put('/news/:id', function(req, res, next) {
  log.info('PUT request')
  News.findByIdAndUpdate(req.params.id, req.body)
  .then(function(news){
    res.send(news)
  })
  .catch(function (err){
      console.log(err);
  });

  res.send(`PUT request with ID: ${req.params.id} and BODY: ${JSON.stringify(req.body)}`)
});

router.delete('/news/:id', function(req, res, next) {
  log.info('DELETE request')
  News.findById(req.params.id, (err, news) => {
    news.remove()
  })
  res.send(`DELETE document ID: ${req.params.id}`)
});

module.exports = router;