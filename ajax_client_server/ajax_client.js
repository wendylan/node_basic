const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    console.log('req---url', req.url);
    console.log('req---headers', req.headers.origin);
    if (req.url != '/favicon.ico') {
        fs.readFile(`./${req.url}`, (err, buffer) => {
            if (err) {
                // res.writeHead(404);
                res.write('Not Found');
            } else {
                res.write(buffer);
            }
            res.end();
        });
    }
    // if(req.url == '/login'){
    //     console.log('req---headers', req.headers.origin);
    //     console.log(req.headers.origin);
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    //     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //     res.setHeader("X-Powered-By",' 3.2.1');
    //     res.setHeader("Content-Type", "application/json;charset=utf-8");

    //     res.write(`{"resultCode": "200", "msg": "success"}`)
    //     // res.write("你好啊!");
    //     res.end();
    // }
});

server.listen(8866);