const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

const ProfilesController = require('../controllers/profiles.controller');
const prolfilecontroller = new ProfilesController();


//프로필 조회
router.get('/profiles/:login_id',authMiddleware, prolfilecontroller.getProfileById);


// 프로필 수정
router.put('/profiles/:login_id', authMiddleware, prolfilecontroller.updateProfile );

module.exports = router;
