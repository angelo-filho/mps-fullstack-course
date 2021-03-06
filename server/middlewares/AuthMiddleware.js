const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
  const acessToken = req.header("accessToken");

  if (!acessToken) {
    return res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(acessToken, "importantsecret");
    req.user = validToken;
    
    if (validToken) {
      return next();
    }
  }
  catch (err) {
    return res.json({ error: err });
  }
}

module.exports = { validateToken };