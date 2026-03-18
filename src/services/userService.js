let users = [
  { id: 1, name: "Tiago", email: "tiago@example.com", active: true },
  { id: 2, name: "Rui", email: "rui@example.com", active: true }
];
let id = 3;

const getAllUsers = (search, sort) => {
  let result = [...users];

  if (search) {
    result = result.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  return result;
};

const getUserStats = () => {
  const total = users.length;
  const active = users.filter((u) => u.active).length;
  const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;

  return { total, active, activePercentage };
};

const postUser = (data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }

  if (!data.email || !data.email.includes("@")) {
    throw new Error("Invalid email");
  }

  const user = {
    id: id++,
    name: data.name,
    email: data.email,
    active: true
  };

  users.push(user);
  return user;
};

const putUser = (userId, data) => {
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) {
    throw new Error("User not found");
  }

  if (data.email && !data.email.includes("@")) {
    throw new Error("Invalid email");
  }

  user.name = data.name;
  user.email = data.email;
  return user;
};

const deleteUser = (userId) => {
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) throw new Error("User not found");

  users = users.filter((u) => u.id !== parseInt(userId));

  return user;
};

const toggleUserActive = (userId) => {
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) {
    throw new Error("User not found");
  }

  user.active = !user.active;
  return user;
};

const getUserById = (userId) => {
  return users.find((u) => u.id === parseInt(userId));
};

module.exports = { getAllUsers, postUser, putUser, deleteUser, toggleUserActive, getUserStats, getUserById };
