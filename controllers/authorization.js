const redisClient = require("./signin").redisClient;

// "next" is an express argument, that allows it to move donw to the next part of the chain
// require Auth is a middleware making sure the criteria's are met before proceeding with next()
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Unauthorised");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("Unauthorized");
    }
    console.log('you shall pass')
    return next();
  });
};

module.exports = {
    requireAuth:requireAuth
}
