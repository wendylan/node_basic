const http = require('http');
const url = require('url');
const fs = require('fs');
const mysql = require('mysql');

// 1.链接服务器
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test'
});


    /* const username = 'lily';
    const password = '888888';

    // 向数据库插入数据
    connection.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });

    // 查询user_table表的数据
    db.query(`SELECT * FROM user_table`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    }); */

    // 2.与http模块配合使用
    const server = http.createServer((req, res)=>{
        const {
            pathname,
            query
        } = url.parse(req.url, true);
        if(pathname == '/reg'){
            // 获取get请求数据
            const {
                username,
                password
            } = query;
            
            // 校验参数是否正确
            if(!username || !password){
                res.write(JSON.stringify({
                    error: 1,
                    msg: '用户密码不可为空'
                }));
                res.end();
            }else if(username.length >32){
                res.write(JSON.stringify({
                    error: 1,
                    msg: '用户名的长度不能超过32位'
                }));
                res.end();
            }else if(password.length >32){
                res.write(JSON.stringify({
                    error: 1,
                    msg: '密码的长度不能超过32位'
                }));
                res.end();
            }else{   //校验通过, 开始注册流程
                // 检查用户是否已经存在
                connection.query(`SELECT ID FROM user_table WHERE username='${username}'`, (err, data)=>{
                    if(err){
                        res.writeHead(500);
                        res.end();
                    }else{
                        if(data.length){
                            res.write(JSON.stringify({
                                error: 1,
                                msg: '此用户名已被占用'
                            }));
                            res.end();
                        }else{
                            // 将密码和用户名插入数据库
                            connection.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`, (err, data)=>{
                                if(err){
                                    res.writeHead(500);
                                    res.end();
                                }else{
                                    res.write(JSON.stringify({
                                        err: 0,
                                        msg: '注册成功'
                                    }));
                                    res.end();
                                }
                            });
                        }
                    }
                });
            }
        }else if(pathname == '/login'){
            let arr = [];

            req.on('data', (buffer)=>{
                // 获取post请求的buffer数据
                arr.push(buffer);
            });

            req.on('end', ()=>{
                // 将buffer数据合并
                let buffer = Buffer.concat(arr);

                // 处理接收到的post数据
                const post = JSON.parse(buffer.toString());

                // 获取post请求数据
                const {
                    username,
                    password
                } = post;

                // 根据用户查询
                connection.query(`SELECT username, password FROM user_table WHERE username='${username}'`, (err, data)=>{
                    if(err){
                        console.error(err);
                    }else{
                        if(!data.length){
                            // 用户不存在
                            res.write(JSON.stringify({
                                error: 1,
                                msg: '用户名或密码错误'
                            }));
                            res.end();
                        }else if(data[0].password !== password){
                            // 密码不正确
                            res.write(JSON.stringify({
                                error: 1,
                                msg: '用户名或密码错误'
                            }));
                            res.end();
                        }else{
                            res.write(JSON.stringify({
                                error: 0,
                                msg: '登录成功'
                            }));
                            res.end();
                        }
                    }
                });
            });
        }else{
            // 若请求不为接口，则默认为请求文件
            if(pathname !=='/favicon.ico' ){
                fs.readFile(`.${pathname}`, (err, buffer)=>{
                    if(err){
                        res.writeHead(404);
                    }else{
                        res.write(buffer);
                    }
                    res.end();
                });
            }else{
                res.writeHead(404);
                res.end();
            }
        }
    });

server.listen(8888);
