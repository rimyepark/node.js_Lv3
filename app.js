// const express = require("express");
// const { Server } = require("http"); // 1. 모듈 불러오기
// const socketIo = require("socket.io"); // 1. 모듈 불러오기

const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.route");
const postsRouter = require("./routes/post.route");
const commentsRouter = require("./routes/comment.route");
const profilesRouter = require("./routes/profile.route");
const app = express();


// const http = Server(app); // 2. express app을 http 서버로 감싸기
// const io = socketIo(http); // 3. http 객체를 Socket.io 모듈에 넘겨서 소켓 핸들러 생성

const PORT = 3030;

// 4. 소켓 연결 이벤트 핸들링
// io.on("connection", (sock) => {
//   console.log("새로운 소켓이 연결됐어요!");

//   sock.on("disconnect", () => {
//     console.log(sock.id, "연결이 끊어졌어요!");
//   });
// });

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"))

app.use('/api', [usersRouter, postsRouter, profilesRouter , commentsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});