const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('../db/index');
exports.regUser = (req, res) => {
    const userinfo = req.body;
    // console.log(userinfo);


    //用户名或密码是否为空
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或者密码不能为空');
    // }

    //是否已经存在

    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.cc('用户名已存在');
        // console.log(results.length);
        //密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        const insertSql = 'insert into ev_users set ?';
        db.query(insertSql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('注册用户失败');
            res.cc('注册成功', 0);
        })
    });


}
exports.login = (req, res) => {
    const userinfo = req.body;
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('登陆失败');
        //判断密码
        const compareResults = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResults) return res.cc('密码错误');

        //生成token字符串
        //剔除密码和头像
        const user = { ...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        // console.log(tokenStr);
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
    })

    // res.send('login ok');
}