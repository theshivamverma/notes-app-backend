const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

const { initializeDBConnection } = require("./db/db.config");

const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { routeNotFound } = require("./middlewares/routeNotFound.middleware");

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route");

initializeDBConnection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
