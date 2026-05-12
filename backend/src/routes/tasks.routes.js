const express = require("express");
const {
  listGroupTasks,
  createGroupTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const requireAuth = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/groups/:groupId/tasks", requireAuth, listGroupTasks);
router.post("/groups/:groupId/tasks", requireAuth, createGroupTask);
router.put("/tasks/:id", requireAuth, updateTask);
router.delete("/tasks/:id", requireAuth, deleteTask);

module.exports = router;
