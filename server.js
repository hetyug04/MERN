import express from "express";
const app = express();
dotenv.config();
import notFound from "./middleware/NotFound.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js"
import userRouter from "./routes/userRouter.js"
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import morgan from 'morgan'
if(process.ENV!=='production'){
  app.use(morgan('dev'))
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/feed", postRouter)
app.use('/api/v1/user', userRouter)
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
