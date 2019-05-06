/*
*   get     http://localhost:8888/books
*   get     http://localhost:8888/books/book
*   post    http://localhost:8888/books/book
*   get     http://localhost:8888/books/book/1
*   put     http://localhost:8888/books/book
*   delete  http://localhost:8888/books/book/1
*
* */
const express = require('express');
const service = require('./service.js');
const router = express.Router();
// 提供所有的图书信息
router.get('/books',service.allBooks);
// 添加图书信息时提交数据
router.post('/books/book',service.addBook);
// 编辑图书时根据id查询相应的信息
router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
router.put('/books/book',service.editBook);
// 删除图书信息
router.delete('/books/book/:id',service.deleteBook);

module.exports = router;