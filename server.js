//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    controllers = require('./controllers')
    // cookieParser = require('cookie-parser'),
    // session = require('express-session'),
    // passport = require('passport'),
    // LocalStrategy = require('passport-local').Strategy;
var app = express(),
    router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

// /api/beaches
router.get('/beaches', controllers.beach.getAllBeaches)
router.get('/beaches/:beachId', controllers.beach.getOne)

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

//router.route('/beaches')



// //*******Cities*******//
// router.route('/cities')
//   .get(controllers.city.getAllCities) //GET all cities
//   .post(controllers.city.postCity) //CREATE new city
//
// router.route('/cities/:cityId')
//    .get(controllers.city.getOne)
//    .delete(controllers.city.destroy)
//    .put(controllers.city.update)
//
// //********Posts******//
// router.route('/cities/:cityId/posts')
//   .get(controllers.post.getAllPosts)
//   .post(controllers.post.newPost)
//
// router.route('/cities/:cityId/posts/:postId')
//   .get(controllers.post.getOne)
//   .delete(controllers.post.destroy)
//   .put(controllers.post.updatePost)
//
// //passport routes
// router.route('/login').post(passport.authenticate('local'), function (req, res) {
//   console.log(JSON.stringify(req.user));
//   res.send(req.user);
// });
// router.route('/logout').get(function (req, res) {
//   console.log("BEFORE logout", req);
//   req.logout();
//   res.send(req);
//   console.log("AFTER logout", req);
// });


//start server
app.listen(port, function() {
  console.log("API IS RUNNING ON PORT " + port);
})
