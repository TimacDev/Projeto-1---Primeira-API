const getAllTaskUsers = () => {
  return taskUsers;
};

const postTaskUser = (data) => {
  const taskUser = {
    id: id++,
    taskId: data.taskId,
    userId: data.userId,
  };

  taskUsers.push(taskUser);
  return taskUser;
};

const putTaskUser = (taskUserId, data) => {
  const taskUser = taskUsers.find((tu) => tu.id === parseInt(taskUserId));

  if (!taskUser) {
    throw new Error("TaskUser not found");
  }

  taskUser.taskId = data.taskId;
  taskUser.userId = data.userId;
  return taskUser;
};

const deleteTaskUser = (taskUserId) => {
  const taskUser = taskUsers.find((tu) => tu.id === parseInt(taskUserId));

  if (!taskUser) throw new Error("TaskUser not found");

  taskUsers = taskUsers.filter((tu) => tu.id !== parseInt(taskUserId));

  return taskUser;
};

module.exports = { getAllTaskUsers, postTaskUser, putTaskUser, deleteTaskUser };
