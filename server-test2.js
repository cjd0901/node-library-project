/*
*   从服务器主动发送请求调用接口-添加数据
* */

const http = require('http');
const querystring = require('querystring');
let options = {
    protocol : 'http:',
    hostname : "localhost",
    port : 8888,
    path : '/books/book',
    method : 'post',
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
    }
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
let data = querystring.stringify({
   name : 'cccc',
   author : 'cccc',
   category : 'asdfasdf',
   description : '666'
});
req.write(data);
req.end();