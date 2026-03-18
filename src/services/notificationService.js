let notifications = [
  { id: 1, userId: 1, message: "New task assigned", read: false },
  { id: 2, userId: 2, message: "Comment added", read: true }
];
let id = 3;

const getAllNotifications = () => {
  return notifications;
};

const postNotification = (data) => {
  const notification = {
    id: id++,
    userId: data.userId,
    message: data.message,
    read: false
  };

  notifications.push(notification);
  return notification;
};

const putNotification = (notificationId, data) => {
  const notification = notifications.find((n) => n.id === parseInt(notificationId));

  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.message = data.message;
  notification.read = data.read;
  return notification;
};

const deleteNotification = (notificationId) => {
  const notification = notifications.find((n) => n.id === parseInt(notificationId));

  if (!notification) throw new Error("Notification not found");

  notifications = notifications.filter((n) => n.id !== parseInt(notificationId));

  return notification;
};

module.exports = { getAllNotifications, postNotification, putNotification, deleteNotification };
