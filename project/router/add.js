
const connection = require('../lib/database');

module.exports = async (res, query, post, files)=>{
    res.setHeader('content-type', 'application/json;charset=UTF-8');    
    let {
        title,
        price,
        count
    } = post;
    
    // 判断是否有参
    if(!title || !price || !count){
        res.write(JSON.stringify({
            error: 1,
            msg: '参数不合法'
        }));
    }else{
        // 将价格和数量转为数字
        price = Number(price);
        count = Number(count);

        // 判断价格和数量是否非数字
        if(isNaN(price) || isNaN(count)){
            res.write(JSON.stringify({
                error: 1,
                msg: '参数不合法'
            }));
        }else{
            try {
                // 使用占位符?代替需要插入数据库的参数，第二个数组参数中3个值会按顺序填充占位符，该方法可以避免大部分注入攻击
                await connection.query(`INSERT INTO item_table (title, price, count) VALUES(?, ?, ?)`, [title, price, count]);

                res.write(JSON.stringify({
                    error: 0,
                    msg: '添加商品成功'
                }));
            } catch (error) {
                console.log(error);
                res.write(JSON.stringify({
                    error: 1,
                    msg: '数据库内部错误'
                }));
            }
        }
    }
    res.end();
}