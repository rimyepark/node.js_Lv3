const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();


connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// 로그인 API
router.post("/auth", async (req, res) => {
  const { nickname, password } = req.body;

  // 닉네임과 비밀번호를 이용하여 사용자 조회
  const getUserQuery = `SELECT * FROM users WHERE nickname = ?`;
  connection.query(getUserQuery, [nickname], async (err, results) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        errorMessage: "서버 오류",
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        errorMessage: "닉네임 또는 비밀번호를 확인해주세요.",
      });
    }

    const user = results[0];

    // 비밀번호 일치 여부 확인
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        errorMessage: "닉네임 또는 비밀번호를 확인해주세요.",
      });
    }

    const token = jwt.sign({ userId: user.userId }, "customized-secret-key");

    // JWT를 Cookie로 할당
    res.cookie("Authorization", `Bearer ${token}`);
    res.status(200).json({});
  });
});

module.exports = router;
