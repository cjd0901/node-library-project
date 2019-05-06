/*
* 实现图书管理系统后台接口
* */

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')
const app = express();

app.use('/www',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);
app.listen(8888,()=>{
   console.log('running');
});