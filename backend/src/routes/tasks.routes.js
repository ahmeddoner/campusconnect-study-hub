const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const {
    getGroupTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks.controller");

router.use(requireAuth);

router.get("/:groupId/tasks", getGroupTasks);
router.post("/:groupId/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;