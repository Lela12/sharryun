if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
//development에 있을 경우는 dev.js가져오기,  production에 있을 경우 prod.js
