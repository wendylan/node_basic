const connection = require('../lib/database');

module.exports = async (res, query, post, files)=>{
    res.setHeader('content-type', 'application/json;charset=UTF-8');    
    try {
        const data = await connection.query(`SELECT * FROM item_table`);
        
        res.setHeader('content-type', 'application/json;charset=UTF-8');
        res.write(JSON.stringify({
            error: 0,
            data
        }));
    } catch (error) {
        console.log(error);
        res.write(JSON.stringify({
            error: 1,
            msg: '数据库出错'
        }));
    }
    res.end();
}