const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    if(req.url !='/favicon.ico'){
        fs.readFile(`./${req.url}`, (err, buffer) =>{
            if(err){
                res.writeHead(404);
                res.write('Not Found');
            }else{
                // res.write(buffer);
            }
            // res.end();
        });
    }
    // console.log(req.url);
    let bufferArray = [];

    req.on('data', (buffer)=>{
        bufferArray.push(buffer);
    });

    req.on('end', ()=>{
        const buffer = Buffer.concat(bufferArray);
        const post = querystring.parse(buffer.toString());
        console.log('post---', post);
    })
});

server.listen(8888);