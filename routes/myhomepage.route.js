const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");


connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// 전체 게시글 목록 조회 API
router.get("/myhome", async (req, res) => {
  const getMyHomePageQuery = "SELECT title, nickname, date FROM myhomepage ORDER BY date DESC";
  connection.query(getMyHomePageQuery, (err, results) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 오류",
      });
    }

    res.json({
      success: true,
      myhomepage: results,
    });
  });
});

// 게시글 조회 API
router.get("/myhome/:id", async (req, res) => {
  const { id } = req.params;

  const getMyHomePageQuery = "SELECT title, nickname, date, content FROM myhomepage WHERE id = ?";
  connection.query(getMyHomePageQuery, [id], (err, results) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 오류",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글을 찾을 수 없습니다.",
      });
    }

    const { title, nickname, date, content } = results[0];

    res.json({
      success: true,
      title,
      nickname,
      date,
      content,
    });
  });
});

// 게시글 작성 메서드 (토큰 검사 필요)
router.post("/myhome", authMiddleware, async (req, res) => {
  const { title, date, content } = req.body;
  const { nickname } = res.locals.user;

  const createMyHomePageQuery = "INSERT INTO myhomepage (title, nickname, date, content) VALUES (?, ?, ?, ?)";
  connection.query(createMyHomePageQuery, [title, nickname, date, content], (err) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 오류",
      });
    }

    res.json({ success: true });
  });
});

// 게시글 수정 메서드 (토큰 및 작성자 검사 필요)
router.put("/myhome/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, date, content } = req.body;
  const { nickname } = res.locals.user;

  const getMyHomePageQuery = "SELECT nickname FROM myhomepage WHERE id = ?";
  connection.query(getMyHomePageQuery, [id], (err, results) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 오류",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글을 찾을 수 없습니다.",
      });
    }

    const existingNickname = results[0].nickname;

    if (existingNickname !== nickname) {
      return res.status(403).json({
        success: false,
        errorMessage: "작성자만 게시글을 수정할 수 있습니다.",
      });
    }

    const updateMyHomePageQuery = "UPDATE myhomepage SET title = ?, date = ?, content = ? WHERE id = ?";
    connection.query(updateMyHomePageQuery, [title, date, content, id], (err) => {
      if (err) {
        console.error("Failed to execute MySQL query: ", err);
        return res.status(500).json({
          success: false,
          errorMessage: "서버 오류",
        });
      }

      res.json({ success: true });
    });
  });
});

// 게시글 삭제 메서드 (토큰 및 작성자 검사 필요)
router.delete("/myhome/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nickname } = res.locals.user;

  const getMyHomePageQuery = "SELECT nickname FROM myhomepage WHERE id = ?";
  connection.query(getMyHomePageQuery, [id], (err, results) => {
    if (err) {
      console.error("Failed to execute MySQL query: ", err);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 오류",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글을 찾을 수 없습니다.",
      });
    }

    const existingNickname = results[0].nickname;

    if (existingNickname !== nickname) {
      return res.status(403).json({
        success: false,
        errorMessage: "작성자만 게시글을 삭제할 수 있습니다.",
      });
    }

    const deleteMyHomePageQuery = "DELETE FROM myhomepage WHERE id = ?";
    connection.query(deleteMyHomePageQuery, [id], (err) => {
      if (err) {
        console.error("Failed to execute MySQL query: ", err);
        return res.status(500).json({
          success: false,
          errorMessage: "서버 오류",
        });
      }

      res.json({ success: true });
    });
  });
});

module.exports = router;
