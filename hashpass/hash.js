const bcrypt = require("bcrypt");

const password = "123456";

bcrypt.hash(password, 10)
  .then((hashed) => {
    console.log("Password gốc:", password);
    console.log("Mã hash:", hashed);
  })
  .catch((err) => {
    console.error(err);
  });