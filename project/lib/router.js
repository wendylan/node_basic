// 创建路由表
let router = {
    // 存储get请求的路由
    get:{

    },
    // 存储post请求的路由
    post:{

    }
};

/**
 *添加路由的方法，method为请求方法，url为请求地址，callback为处理该请求的回调函数
 *
 * @param { String } method
 * @param { String } url
 * @param { Function } callback
 */
function addRouter(method, url, callback){
    // 为了方便处理，将method和url统一转换成小写
    method = method.toLowerCase();
    url = url.toLowerCase();
    // 将处理请求的回调函数，按方法名和地址存到路由表中
    router[method][url] = callback;
}

/**
 *查找处理请求的回调函数的方法，method为请求的方法，url为请求的地址，返回处理路由的回调函数
 *
 * @param { String } method
 * @param { String } url
 */
function findRouter(method, url){
    // 为了方便处理，将method和url统一转换成小写
    method = method.toLowerCase();
    url = url.toLowerCase();

    // 找到路由的回调函数，不存在则默认返回null
    const callback = router[method][url] || null;

    // 将回调函数返回
    return callback;
}

module.exports = {
    addRouter,
    findRouter
}