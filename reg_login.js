const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    const method = req.method;
    let path = '';
    let get = {};
    let post = {};

    if(method === 'GET'){
        const {pathname, query} = url.parse(req.url, true);
        path = pathname;
        get = query;
        complete();
    }else if(method === 'POST'){
        path = req.url;
        let arr = [];

        req.on('data', (buffer)=>{
            arr.push(buffer);
        });
        req.on('end', ()=>{
            let buffer = Buffer.concat(arr);
            post = JSON.parse(buffer.toString());
            complete();
        });
    }

    function complete(){
        try {
            if(path == '/reg'){
                const {
                    username,
                    password
                } = get;
                fs.readFile('./users.json', (err, data)=>{
                    if(err){
                        res.writeHead(404);
                        res.end();
                    }else{
                        const users = JSON.parse(data.toString());
                        const usernameIndex = users.findIndex((item)=>{
                            return username == item.username;
                        });
                        if(usernameIndex >= 0){
                            res.write(JSON.stringify({
                                error: 1,
                                msg: '此用户名已存在'
                            }));
                            res.end();
                        }else{
                            users.push({
                                username,
                                password
                            });

                            fs.writeFile('./users.json', JSON.stringify(users), (error)=>{
                                if(error){
                                    res.writeHead(404);
                                }else{
                                    res.write(JSON.stringify({
                                        error: 0,
                                        msg: '注册成功'
                                    }));
                                }
                                res.end();
                            });
                        }
                    }
                });
            }else if(path == '/login'){
                const {
                    username,
                    password
                } = post;

                fs.readFile('./users.json', (error, data)=>{
                    if(error){
                        res.writeHead(404);
                    }else{
                        const users = JSON.parse(data.toString());
                        const usernameIndex = users.findIndex((item)=>{
                            return username == item.username;
                        });
                        if(usernameIndex >= 0){
                            if(users[usernameIndex].password === password){
                                res.write(JSON.stringify({
                                    error: 0,
                                    msg: '登录成功'
                                }));
                            }else{
                                res.write(JSON.stringify({
                                    error: 1,
                                    msg: '密码错误'
                                }));
                            }
                        }else{
                            res.write(JSON.stringify({
                                error: 1,
                                msg: '该用户不存在'
                            }));
                        }
                    }
                    res.end();
                });
            }else{
                if(path !== '/favicon.ico'){
                    fs.readFile(`./${path}`, (error, data)=>{
                        if(error){
                            res.writeHead(404);
                        }else{
                            res.write(data);
                        }
                        res.end();
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

server.listen(8888);