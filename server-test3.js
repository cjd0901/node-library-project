/*
*   从服务器主动发送请求调用接口-根据id查询数据
* */

const http = require('http');

let options = {
    protocol : 'http:',
    hostname : "localhost",
    port : 8888,
    path : '/books/book/8',
    method : 'get',
}

let req = http.request(options,(res)=>{
    let info = '';
    res.on('data',(chunk)=>{
        info += chunk;
    });
    res.on('end',()=>{
        console.log(info);
    });
});

req.end();