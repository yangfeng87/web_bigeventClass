const express = require('express');
const router = express.Router();
const expressjoi = require('@escook/express-joi');
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');
const artRouterHandler = require('../router_handler/artcate');
//查询文章分类列表
router.get('/cates', artRouterHandler.getArticleCates);
//新增文章f分类
router.post('/addcates', expressjoi(add_cate_schema), artRouterHandler.addArticleCates);
//根据id删除文章分类
router.get('/deletecate/:id', expressjoi(delete_cate_schema), artRouterHandler.deleteCateById);
//根据id获取文章分类信息
router.get('/cates/:id', expressjoi(get_cate_schema), artRouterHandler.getArticleById);
//根据id更新文章分类信息
router.post('/updatecate', expressjoi(update_cate_schema), artRouterHandler.updateCateById);
module.exports = router;