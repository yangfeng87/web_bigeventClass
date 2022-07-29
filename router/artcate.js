const express = require('express');
const router = express.Router();
const expressjoi = require('@escook/express-joi');
const { add_cate_schema } = require('../schema/artcate');
const artRouterHandler = require('../router_handler/artcate');
//查询文章列表
router.get('/cates', artRouterHandler.getArticleCates);
//新增文章
router.post('/addcates', expressjoi(add_cate_schema), artRouterHandler.addArticleCates);
module.exports = router;