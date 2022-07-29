const express = require('express');
const app = express();
const cors = require('cors');
const joi = require('joi')

//跨域
app.use(cors());
//解析表单数据(application/x-www-form-urlencoded )
app.use(express.urlencoded({ extended: false }));

//封装错误返回函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})


//身份认证中间件
const exxpressJwt = require('express-jwt');
const config = require('./router_handler/config');
app.use(exxpressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//添加路由
const userouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const artCatesRouter = require('./router/artcate');
//挂载路由
app.use('/api', userouter);
app.use('/my', userinfoRouter);
app.use('/my/article', artCatesRouter);


//全局错误函数
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError)
        return res.cc(err);

    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    res.cc(err);
})
app.listen(3007, () => {
    console.log('server is running 127.0.0.1:3007');

})