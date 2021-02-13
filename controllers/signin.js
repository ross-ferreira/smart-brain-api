const jwt = require("jsonwebtoken");
const redis = require("redis");

//setup Redis:
// When it get moves to docker or another location you need to update host
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => Promise.reject("unable to get user"));
      } else {
        Promise.reject("wrong credentials");
      }
    })
    .catch((err) => Promise.reject("wrong credentials"));
};

const getAuthTokenId = (req,res) => {
  const {authorization} = req.headers;
  return redisClient.get(authorization,(err,reply)=>{
    if(err || !reply){
      return res.status(400).json('Unauthorized')
    }
    return res.json({id:reply})
  })
};

const signToken = (email) => {
  // we want to keep senstive information out but for now we will be signing a token with users email
  const jwtPayload = { email };
  // The 2nd argument should be protected use envs instead eg: process.env.JWTSECRET
  return jwt.sign(jwtPayload, "JWT_Secret", { expiresIn: "2 days" });
};

// Save token in redis DB
const setToken = (key, value) => {
  // check promises in Redis documentation
  // we need to wrap the it in a promise as the result wont be a promise
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user) => {
  // JWT, return user data
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token: token };
    })
    .catch((err) => console.log(err));
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  // If the user sends an Authorization token otherwise signin
  return authorization
    ? getAuthTokenId(req,res)
    : handleSignin(db, bcrypt, req, res)
        // Extra gaurd Clause to check user credentials exsist
        .then((data) =>
          data.id && data.email ? createSessions(data) : Promise.reject(data)
        )
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleSignin: handleSignin,
  signinAuthentication: signinAuthentication,
  redisClient:redisClient
};
