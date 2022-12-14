const joi = require('joi')

const name = joi.string().required();
const alias = joi.string().alphanum().required();
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

//根据id删除文章分类的规则
const id = joi.number().integer().min(1).required();
exports.delete_cate_schema = {
    params: {
        id
    }
}
exports.get_cate_schema = {
    params: {
        id
    }
}


exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}
