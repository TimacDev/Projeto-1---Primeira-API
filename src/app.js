const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

// middleware
const logger = require("./middlewares/loggerMiddleware");
app.use(logger);

// tasks
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// users
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// tags
const tagRoutes = require("./routes/tagRoutes");
app.use("/tags", tagRoutes);

// taskUsers
const taskUsersRoutes = require("./routes/taskUsersRoutes");
app.use("/taskUsers", taskUsersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`),
);
