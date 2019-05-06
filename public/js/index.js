$(function () {
    //初始化列表
    function initList() {
        //渲染列表数据
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function (data) {
                // 渲染数据列表
                var html = template('indexTpl', {list: data})
                $('#dataList').html(html);
                // 必须在渲染完成内容之后才可以操作dom标签
                $('#dataList').find('tr').each(function (index, element) {
                    var td = $(element).find('td:eq(5)');
                    var id = $(element).find('td:eq(0)').text();
                    // 绑定编辑图书的单击事件
                    td.find('a:eq(0)').click(function () {
                        editBook(id);
                    });
                    // 绑定删除图书的单击事件
                    td.find('a:eq(1)').click(function () {
                        deleteBook(id);
                    });
                    //绑定添加图书的单击事件
                    addBook();

                    // 重置表单
                    var form = $('#addBookForm');
                    form.get(0).reset();
                    form.find('input[type=hidden]').val('');
                });
            }
        });
    }

    initList();

    // 编辑图书信息
    function editBook(id) {
        var form = $('#addBookForm');
        // 先根据数据id查询最新的数据
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                var mark = new MarkBox(600, 400, '编辑图书', form.get(0));
                mark.init();
                //填充表单数据
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);
                //对表单提交按钮重新绑定单击事件
                form.find('input[type=button]').unbind('click').click(function () {
                    //编辑完成数据之后重新提交表单
                    //console.log('111');
                    $.ajax({
                        type: 'put',
                        url: '/books/book',
                        data: form.serialize(),
                        dataType: 'json',
                        success: function (data) {
                            if (data.flag == '1') {
                                // 隐藏弹窗
                                mark.close();
                                //重新渲染数据列表
                                initList();
                            }
                        }
                    });
                });
            }
        });
    }

    function addBook() {
        //添加图书信息
        $('#addBookId').click(function () {
            var form = $('#addBookForm');
            // 实例化弹窗对象
            var mark = new MarkBox(600, 400, '添加图书', form.get(0));
            mark.init();
            form.find('input[type=button]').unbind('click').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/books/book',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.flag == '1') {
                            //关闭弹窗
                            mark.close();
                            // 添加成功之后重新渲染数据列表
                            initList();
                            //window.location.reload();
                        }
                    }
                });
            });
        });
    }

    //删除图书信息
    function deleteBook(id) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + id,
            dataType : 'json',
            success : function (data) {
                //删除图书信息之后重新渲染
                if(data.flag == '1'){
                    initList();
                }
            }
        });
    }

});