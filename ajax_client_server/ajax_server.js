const http = require('http');

const server = http.createServer((req, res)=>{
    console.log('req---headers', req.headers.origin);
    console.log(req.headers.origin);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    res.write(`{"resultCode": "200", "msg": "success"}`)
    // res.write("你好啊!");
    res.end();
});

server.listen(8888);