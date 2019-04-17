const connection = require('../lib/database');

module.exports = async (res, query, post, files) =>{
    const ID = query.id;
    res.setHeader('content-type', 'application/json;charset=UTF-8');    
        
    if(!ID){
        res.write(JSON.stringify({
            error: 1,
            msg: '参数不合法'
        }));
    }else{
        await connection.query(`DELETE FROM item_table WHERE ID=${ID}`);

        res.write(JSON.stringify({
            error: 0,
            msg: '删除成功'
        }));
    }
    res.end();
}