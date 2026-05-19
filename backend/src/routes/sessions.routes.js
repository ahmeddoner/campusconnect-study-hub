const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const {
  getGroupSessions,
  createSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessions.controller");

router.use(requireAuth); // So no ununauthenticated user can touch sessions

router.get("/:groupId/sessions", getGroupSessions);
router.post("/:groupId/sessions", createSession);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);

module.exports = router;
