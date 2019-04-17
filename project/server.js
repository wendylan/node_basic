const connection = require('./lib/database');
const http = require('./lib/http');

;(async ()=>{
    // 查询item_table表中的数据
    const res = await connection.query(`SELECT * FROM item_table`);
    console.log(res);
})();