const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(express.json())

// middleware
const logger = require("./middlewares/loggerMiddleware")
app.use(logger)

// tasks
const taskRoutes = require("./routes/tasks")
app.use("/tasks", taskRoutes)

// users
const userRoutes = require("./routes/users")
app.use("/users", userRoutes)

// tags
const tagsRoutes = require("./routes/tags")
app.use("/tags", tagsRoutes)

// taskTags
const taskTagsRoutes = require("./routes/taskTags")
app.use("/taskTags", taskTagsRoutes)

// notifications
const notificationsRoutes = require("./routes/notifications")
app.use("/notifications", notificationsRoutes)

// taskUsers
const taskUsersRoutes = require("./routes/taskUsers")
app.use("/taskUsers", taskUsersRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))