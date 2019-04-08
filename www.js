const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(req.url);
    if(req.url !='/favicon.ico'){
        fs.readFile(`./www${req.url}`, (err, buffer) =>{
            if(err){
                res.writeHead(404);
                res.write('Not Found');
            }else{
                res.write(buffer);
            }
            res.end();
        });
    }
});

server.listen(8888);