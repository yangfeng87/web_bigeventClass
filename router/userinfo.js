const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handler/userinfo');
const expressJoi = require('@escook/express-joi');
const { update_userinfo_schema, update_password_schema, updaye_avatar_schema } = require('../schema/user');



router.get('/userinfo', userinfoHandler.getUserInfo);
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserinfo);
router.post('/updatepwd', expressJoi(update_password_schema), userinfoHandler.updatePassword);
router.post('/update/avatar', expressJoi(updaye_avatar_schema), userinfoHandler.updateAvatar);


module.exports = router;