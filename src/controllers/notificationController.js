const notificationService = require("../services/notificationService");

const getNotifications = (req, res) => {
  const notifications = notificationService.getAllNotifications();
  res.json(notifications);
};

const postNotification = (req, res) => {
  const notification = notificationService.postNotification(req.body);
  res.status(201).json(notification);
};

const putNotification = (req, res) => {
  try {
    const notification = notificationService.putNotification(req.params.id, req.body);
    res.status(200).json(notification);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteNotification = (req, res) => {
  try {
    const notification = notificationService.deleteNotification(req.params.id);
    res.status(200).json({ message: "Notification deleted", notification });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getNotifications, postNotification, putNotification, deleteNotification };
