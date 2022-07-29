const db = require('../db/index');
//获取文章列表
exports.getArticleCates = (req, res) => {
    //获取文章列表
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '查村文章列表成功',
            data: results
        })
    })
}
//添加文章分类
exports.addArticleCates = (req, res) => {
    //检查是否已有名称或者别名
    const sql = 'select * from ev_article_cate where name=? and alias=?';
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')


        //添加文章
        const inserSql = 'insert into ev_article_cate set ?';
        db.query(inserSql, req.body, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('添加文章分类失败');
            res.cc('添加文章分类成功', 0);
        })
    })
}

//根据id删除文章分类
exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败');
        res.cc('删除文章列表成功', 0);
    })
}

//根据id获取文章分类信息
exports.getArticleById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('查询文章分类数据失败');
        if (results[0].is_delete === 1) return res.cc('文章分类已被删除');
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results
        });
    })
}

//根据id更新文章分类
exports.updateCateById = (req, res) => {
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`;
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // TODO：更新文章分类
        const sql = `update ev_article_cate set ? where Id=?`;
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err);

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！');

            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0);
        });

    });
}