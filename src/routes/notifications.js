const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get("/", notificationController.getNotifications);
router.post("/", notificationController.postNotification);
router.put("/:id", notificationController.putNotification);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
