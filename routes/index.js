var express = require('express');
var router = express.Router();


const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/app/getVersion',controllers.app.getVersion);
router.post('/app/addVersion',controllers.app.addVersion);
router.post('/app/uploadApp',controllers.app.fileUpload)

module.exports = router;
