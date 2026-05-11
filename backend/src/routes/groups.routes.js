const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const {
  getGroups,
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  removeMember,
} = require("../controllers/groups.controller");

router.use(requireAuth);

router.get("/", getGroups);
router.post("/", createGroup);
router.get("/:id", getGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);
router.post("/join", joinGroup);
router.delete("/:id/leave", leaveGroup);
router.delete("/:id/members/:userId", removeMember);

module.exports = router;
