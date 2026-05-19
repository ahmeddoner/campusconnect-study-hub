const prisma = require("../config/prisma");

// Checks if user is in the group
const getMembership = (userId, groupId) =>
  prisma.groupMember.findUnique({
    where: { userId_groupId: { userId, groupId } },
  });


// verify membership, return all sessions for that group
const getGroupSessions = async (req, res) => {
  const membership = await getMembership(req.user.id, req.params.groupId);
  if (!membership) return res.status(403).json({ message: "Not a member" });

  const sessions = await prisma.studySession.findMany({
    where: { groupId: req.params.groupId },
  });
  res.json({ sessions });
};


// verify memberships, validate, create sessions and convert time to Date
const createSession = async (req, res) => {
  const membership = await getMembership(req.user.id, req.params.groupId);
  if (!membership) return res.status(403).json({ message: "Not a member" });

  const { title, description, startTime, endTime, location } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!startTime) return res.status(400).json({ message: "startTime is required" });

  const session = await prisma.studySession.create({
    data: {
      title,
      description,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      location,
      groupId: req.params.groupId,
    },
  });
  res.status(201).json({ session });
};

// find session by Id to get group id, verify membership, update only the fields that were sent
const updateSession = async (req, res) => {
  const session = await prisma.studySession.findUnique({ where: { id: req.params.id } });
  if (!session) return res.status(404).json({ message: "Session not found" });

  const membership = await getMembership(req.user.id, session.groupId);
  if (!membership) return res.status(403).json({ message: "Not a member" });

  const { title, description, startTime, endTime, location } = req.body;
  const updated = await prisma.studySession.update({
    where: { id: req.params.id },
    data: {
      title,
      description,
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      location,
    },
  });
  res.json({ session: updated });
};

// find session, verify memberhsip, delete it
const deleteSession = async (req, res) => {
  const session = await prisma.studySession.findUnique({ where: { id: req.params.id } });
  if (!session) return res.status(404).json({ message: "Session not found" });

  const membership = await getMembership(req.user.id, session.groupId);
  if (!membership) return res.status(403).json({ message: "Not a member" });

  await prisma.studySession.delete({ where: { id: req.params.id } });
  res.json({ message: "Session deleted" });
};

// export all 4 functions
module.exports = { getGroupSessions, createSession, updateSession, deleteSession };
