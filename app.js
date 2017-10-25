var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');

var app=express();

var port=process.env.PORT||8081;

app.set('views',path.join(__dirname,'/views'));
//app.set('view engine','jade');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer({ dest: './tmp/'}).array('image'));

require('./routes/routes.js')(app);

var server=app.listen(port,function(){
  var host="127.0.0.1";
  var port=server.address().port;

  console.log("访问地址为 http://%s:%s", host, port);
});
