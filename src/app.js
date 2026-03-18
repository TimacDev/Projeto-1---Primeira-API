const express = require("express")
const app = express()

app.use(express.json())

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


app.listen(3000)