var express = require('express');
var path = require('path');
var fs = require("fs");
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var app=express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(cookieParser());

var server=app.listen(8081,function(){
  var host="127.0.0.1";
  var port=server.address().port;

  console.log("访问地址为 http://%s:%s", host, port);
})

app.get('/', function (req, res) {
  console.log('GET:/index.htm')
   res.sendFile( __dirname + "/views/index.htm" );
});
app.post('/file_upload', function (req, res) {
   console.log('POST:/file_upload')
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/tmp/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
          res.end( JSON.stringify( response ) );
       });
   });
});