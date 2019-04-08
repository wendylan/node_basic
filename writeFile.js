const fs = require('fs');

fs.writeFile('./test.txt', 'test_test_fdaslfa', (err)=>{
    if(err){
        console.log('文件写入失败', err);
    }else{
        console.log('文件写入成功');
    }
});

fs.readFile('./test.txt', (err, data)=>{
    if(err){
        console.log('文件读取失败', err);
    }else{
        console.log('文件读取成功', data.toString());
    }
});