const prisma = require("../config/prisma");

// helper — returns the membership row or null
const getMembership = (userId, groupId) =>
  prisma.groupMember.findUnique({
    where: { userId_groupId: { userId, groupId } },
  });


const getGroupTasks = async (req, res) => {
  const membership = await getMembership(req.user.id, req.params.groupId);
  // Checks if the caller is a member of the group
  if (!membership) return res.status(403).json({ message: "Not a member" });

  // Fetches all tasks where groupId matches and returns them
  const tasks = await prisma.task.findMany({
    where: { groupId: req.params.groupId },
  });
  res.json({ tasks });
};

const createTask = async (req, res) => {
  const membership = await getMembership(req.user.id, req.params.groupId);
  // Same membership check
  if (!membership) return res.status(403).json({ message: "Not a member" });

  // Validates that title was sent in the body
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  // Creates the task, status is hardcoded since it's default for new tasks
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: "TODO",
      groupId: req.params.groupId,  // groupId comes from the URL param
      assignedToId: req.user.id,
    },
  });
  res.status(201).json({ task });
};

const updateTask = async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  // Finding the task by id
  if (!task) return res.status(404).json({ message: "Task not found" });

  const membership = await getMembership(req.user.id, task.groupId);
  // Checking if the caller is a member
  if (!membership) return res.status(403).json({ message: "Not a member" });

  // Updates whatever fields were sent
  const { title, description, status } = req.body;
  const updated = await prisma.task.update({
    where: { id: req.params.id },
    data: { title, description, status },
  });
  res.json({ task: updated });
};
 // same functionality as updateTask below
const deleteTask = async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ message: "Task not found" });

  const membership = await getMembership(req.user.id, task.groupId);
  if (!membership) return res.status(403).json({ message: "Not a member" });

  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ message: "Task deleted" });
};

module.exports = { getGroupTasks, createTask, updateTask, deleteTask };
