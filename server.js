//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    controllers = require('./controllers')

const io = require('socket.io')();

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

//*****getting all beaches and 1 beach by Id *****//
// /api/beaches
router.get('/beaches', controllers.beach.getAllBeaches)
router.get('/beaches/:beachId', controllers.beach.getOneBeach)



//******Beach Posts *****//
router.get('/beaches/:beachId/beachPosts', controllers.beachPost.getAllBeachPosts)
router.post('/beaches/:beachId/beachPosts', controllers.beachPost.newBeachPost)

/* router.route('/beaches/:beachId/beachPosts')
    .get(controllers.beachPost.getAllBeaches)
    .post(controllers.beachPost.newBeachPost)
*/
router.get('/beaches/:beachId/beachPosts/:id', controllers.beachPost.getOne)
router.put('/beaches/:beachId/beachPosts/:id', controllers.beachPost.updateBeachPost)
router.delete('/beaches/:beachId/beachPosts/:id', controllers.beachPost.destroy)
/* router.route('/beaches/:beachId/beachPosts/:id')
    .get(controllers.beachPost.getOne)
    .put(controllers.beachPost.updateBeachPost)
    .delete(controllers.beachPost.destroy)
*/

//TODO: Stretch: extract all routes to a separate file called routes.js
/// example: https://github.com/wdi-atx-11/passport-auth-lab/blob/master/solution-code/server.js
//set route path and init API

router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

    ////////////////////////
////////SOCKET IO /////////////
    ////////////////////////


//start server
app.listen(port, function() {
  console.log("API IS RUNNING ON PORT " + port);
})
