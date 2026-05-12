const prisma = require("../config/prisma");

const isValidTaskStatus = (status) => {
  return ["TODO", "IN_PROGRESS", "DONE"].includes(status);
};

const getMembership = async (userId, groupId) => {
  return prisma.groupMember.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });
};

const getTaskWithMembershipCheck = async (taskId, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return {
      error: {
        status: 404,
        message: "Task not found",
      },
    };
  }

  const membership = await getMembership(userId, task.groupId);

  if (!membership) {
    return {
      error: {
        status: 403,
        message: "You must be a group member to access this task",
      },
    };
  }

  return { task };
};

const listGroupTasks = async (req, res) => {
  try {
    const { groupId } = req.params;

    const membership = await getMembership(req.user.id, groupId);

    if (!membership) {
      return res.status(403).json({
        message: "You must be a group member to view tasks",
      });
    }

    const tasks = await prisma.task.findMany({
      where: { groupId },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ tasks });
  } catch (error) {
    console.error("List tasks error:", error);
    return res.status(500).json({
      message: "Server error while listing tasks",
    });
  }
};

const createGroupTask = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { title, description, status } = req.body;

    const membership = await getMembership(req.user.id, groupId);

    if (!membership) {
      return res.status(403).json({
        message: "You must be a group member to create tasks",
      });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (status && !isValidTaskStatus(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const task = await prisma.task.create({
      data: {
        groupId,
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "TODO",
      },
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({
      message: "Server error while creating task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const result = await getTaskWithMembershipCheck(id, req.user.id);

    if (result.error) {
      return res.status(result.error.status).json({
        message: result.error.message,
      });
    }

    if (status && !isValidTaskStatus(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const updateData = {};

    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({
          message: "Task title cannot be empty",
        });
      }

      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({
      message: "Server error while updating task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getTaskWithMembershipCheck(id, req.user.id);

    if (result.error) {
      return res.status(result.error.status).json({
        message: result.error.message,
      });
    }

    await prisma.task.delete({
      where: { id },
    });

    return res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({
      message: "Server error while deleting task",
    });
  }
};

module.exports = {
  listGroupTasks,
  createGroupTask,
  updateTask,
  deleteTask,
};
