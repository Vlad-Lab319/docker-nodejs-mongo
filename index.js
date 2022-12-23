const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

const { 
  MONGO_USER, 
  MONGO_PASSWORD, 
  MONGO_IP, 
  MONGO_PORT, 
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let RedisClient = redis.createClient({
  url: 'redis://redis:6379',
  legacyMode: true,
  // host: REDIS_URL,
  // port: REDIS_PORT,
});
RedisClient.connect().catch(console.error);


const postsRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose.set('strictQuery', true);

const connectWithRetry = () => {

  mongoose.connect(
    mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("succesfully connected to DB");
    })
    .catch((error) => {
      console.error(error);
      setTimeout(connectWithRetry, 5000);
    })
  }

connectWithRetry();

app.enable("trust proxy");
app.use(cors({

}))
app.use(session({
  store: new RedisStore({
    client: RedisClient
  }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 60000,
  }
}))

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi, test is here</>");
  console.log('Check nginx load balance');
});

app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));