const router = require("express").Router();
const userRegisterValidation = require("../validation").userRegisterValidation;
const userLoginValidation = require("../validation").userLoginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
	console.log("auth connecting");
	next();
});
router.get("/testAPI", (req, res) => {
	return res.send("connect to auth router...");
});

router.post("/register", async (req, res) => {

    // confirm role
    let {error} = userRegisterValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // confirm email existed
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("此email已被註冊過 ＱＱ");

     // create a new user
    let { name, email, password, role } = req.body;
    let newUser = new User({ name, email, password, role });
    try {
        let userSave = await newUser.save();
        return res.send({
        message: "新用戶建立成功！",
        userSave,
        });
    } catch (e) {
        return res.status(500).send("發生錯誤，無法儲存使用者！");
    }
})

router.post("/login", async (req, res) => {
    // confirm role
    let {error} = userLoginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
  
    // 確認信箱是否被註冊過
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) {
      return res.status(401).send("使用者不存在。請確認信箱是否正確！");
    }

    userFound.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send(err);
    
        if (isMatch) {
          // 可製作json web token
          const tokenObject = { _id: userFound._id, email: userFound.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          return res.send({
            message: "成功登入",
            token: "JWT " + token,
            user: userFound, //該 user 資料庫的資訊
          });
        } else {
          return res.status(401).send("密碼錯誤");
        }
      });
  
});

module.exports = router;
