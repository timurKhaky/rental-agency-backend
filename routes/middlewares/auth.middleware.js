module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const jwt = require("jsonwebtoken");

  if (!authorization) {
    return res.status(401).json("Ошибка авторизации");
  }

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    return res.status(401).json("Ошибка авторизации");
  }
  try {
    req.user = jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json("Ошибка авториции");
  }
};
