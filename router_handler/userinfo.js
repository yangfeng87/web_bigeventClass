const db = require('../db/index');
const bcrypt = require('bcryptjs');
exports.getUserInfo = (req, res) => {
    const sql = 'select username,nickname,email,user_pic from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败');
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
    // res.send('ok');
}
exports.updateUserinfo = (req, res) => {

    const sql = 'update ev_users set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err.message);
        //数据量操作失败
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败');
        res.cc('更新用户信息成功');
    })
}

exports.updatePassword = (req, res) => {
    //查询数据是否存在
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在');


        //旧密码是否正确

        const compare = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compare) return res.cc('旧密码不正确');

        //更新密码

        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        const updateSql = 'update ev_users set password=? where id=?';
        db.query(updateSql, [newPwd, req.user.id], (err, results) => {
            if (err) res.cc(err);
            if (results.affectedRows !== 1) return res.cc('修改密码失败');
            res.cc('修改密码成功');
        })
    })

}
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?';
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新头像失败');
        res.cc('更新头像成功');
    })
}