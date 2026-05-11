const express = require("express");
const router = express.Router();      // mini router onyl for group routes
const requireAuth = require("../middleware/auth.middleware");   // checks Jwt
const {              // This imports functions from controller
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
router.post("/join", joinGroup);    // post bcs request is sending data (join code) in request body
router.delete("/:id/leave", leaveGroup);
router.delete("/:id/members/:userId", removeMember);

module.exports = router;
