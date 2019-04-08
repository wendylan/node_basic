const http = require('http');
const fs = require('fs');
const bufferSplit = require('./bufferSplit.js');

const server = http.createServer((req, res) =>{
    const boundary = `--${req.headers['content-type'].split('; ')[1].split('=')[1]}`
    let arr = [];
    req.on('data', (buffer)=>{
        arr.push(buffer);
    });

    req.on('end', ()=>{
        const buffer = Buffer.concat(arr);
        console.log(buffer.toString());

        
    });
});