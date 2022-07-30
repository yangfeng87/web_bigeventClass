const db = require('../db/index');
const path = require('path');
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img')
        return res.cc('请上传文章封面');
    const articleInfo = {
        //标题，内容，发布状态，所属分类id
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id

    }

    const sql = 'insert into ev_articles set ?';
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('文章发布失败');
        res.cc('文章发布成功', 0);
    })


}