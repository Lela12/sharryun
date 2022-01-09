const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //데이터를 분석해서 가져올 수 있게

//application/json
app.use(bodyParser.json()); //json타입으로 된 것을 분석해서 가져올 수 있게

//모듈에서 몽구스를 가져온다
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다

  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); //오류가 있다면, 오류를
    return res.status(200).json({ success: true }); //성공한다면, sucess:true를 유저에게 전달한다.
  }); //정보들이 유저 모델에 저장
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
