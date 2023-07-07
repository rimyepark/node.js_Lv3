const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.route");
const postsRouter = require("./routes/post.route");
const commentsRouter = require("./routes/comment.route");
const profilesRouter = require("./routes/profile.route");
const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"))

app.use('/api', [usersRouter, postsRouter, profilesRouter , commentsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});