const http = require('http');
const fs = require('fs');
const multiparty = require('multiparty');

const server = http.createServer((req, res) =>{
    if (req.url != '/favicon.ico') {
        fs.readFile(`./${req.url}`, (err, buffer) => {
            if (err) {
                res.writeHead(404);
                res.write('Not Found');
            } else {
                res.write(buffer);
            }
            res.end();
        });
    }
    if(req.url == '/upload'){
        const form = new multiparty.Form({
            uploadDir: './upload'
        });
    
        form.parse(req);
    
        form.on('field', (name, value)=>{
            console.log(name, value);
        });
    
        form.on('file', (name, file, ...rest)=>{
            console.log(name, file);
        });
    
        form.on('close', ()=>{
            console.log('表单数据解析完成');
        });
    }
});

server.listen(8888);