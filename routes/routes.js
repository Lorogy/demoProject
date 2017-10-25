var path=require('path');
var fs = require("fs");

module.exports=function(app){
  app.get('/', function (req, res) {
    console.log('GET:/index.htm')
     res.sendFile( path.resolve(__dirname,"../views/index.htm"));
  });

  app.post('/file_upload', function (req, res) {
     console.log('POST:/file_upload')
     console.log(req.files[0]);  // 上传的文件信息

     var des_file =path.resolve(__dirname,"../tmp/",req.files[0].originalname);
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
};