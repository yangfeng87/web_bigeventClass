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
//添加文章
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
            if (results.affectedRows !== 1) return res.cc('添加文章失败');
            res.cc('添加文章成功', 0);
        })
    })
}