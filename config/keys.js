if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_proj");
} else {
  module.exports = require("./keys_dev");
}
