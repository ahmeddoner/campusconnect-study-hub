const prisma = require("../config/prisma");
const { randomBytes } = require("crypto");  // this for generating random characters for join code

const generateJoinCode = () => randomBytes(3).toString("hex").toUpperCase();  // generates 3 random bytes whu´hich are then converted ti 6 hex characters

const getGroups = async (req, res) => {
  const memberships = await prisma.groupMember.findMany({
    where: { userId: req.user.id },
    include: { group: true },
  });
  res.json({ groups: memberships.map((m) => m.group) });
};

const createGroup = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const joinCode = generateJoinCode();

  const group = await prisma.studyGroup.create({
    data: {
      name,
      description,
      joinCode,
      createdById: req.user.id,
      members: {
        create: { userId: req.user.id, role: "OWNER" },
      },
    },
  });
  res.status(201).json({ group });
};

const getGroup = async (req, res) => {
  const group = await prisma.studyGroup.findUnique({
    where: { id: req.params.id },
    include: {
  members: {
    include: {
      user: { select: { id: true, name: true, email: true, createdAt: true } },
    },
  },
},

  });
  if (!group) return res.status(404).json({ message: "Group not found" });

  const isMember = group.members.some((m) => m.userId === req.user.id);
  if (!isMember) return res.status(403).json({ message: "Not a member" });

  res.json({ group });
};

const updateGroup = async (req, res) => {
  const { name, description } = req.body;
  const member = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: req.params.id } },  //
  });
  if (!member || member.role !== "OWNER")
    return res.status(403).json({ message: "Only the owner can update this group" });

  const group = await prisma.studyGroup.update({
    where: { id: req.params.id },
    data: { name, description },
  });
  res.json({ group });
};

const deleteGroup = async (req, res) => {
  const member = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: req.params.id } },
  });
  if (!member || member.role !== "OWNER")
    return res.status(403).json({ message: "Only the owner can delete this group" });

  await prisma.studyGroup.delete({ where: { id: req.params.id } });
  res.json({ message: "Group deleted" });
};

const joinGroup = async (req, res) => {
  const { joinCode } = req.body;
  const group = await prisma.studyGroup.findUnique({ where: { joinCode } });
  if (!group) return res.status(404).json({ message: "Invalid join code" });

  const existing = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: group.id } },
  });
  if (existing) return res.status(409).json({ message: "Already a member" });

  await prisma.groupMember.create({
    data: { userId: req.user.id, groupId: group.id, role: "MEMBER" },
  });
  res.status(201).json({ message: "Joined successfully", group });
};

const leaveGroup = async (req, res) => {
  const member = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: req.params.id } },
  });
  if (!member) return res.status(404).json({ message: "Not a member" });
  if (member.role === "OWNER")
    return res.status(400).json({ message: "Owner cannot leave — delete the group instead" });

  await prisma.groupMember.delete({ where: { id: member.id } });
  res.json({ message: "Left group" });
};

const removeMember = async (req, res) => {
  const requester = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: req.params.id } },
  });
  if (!requester || requester.role !== "OWNER")
    return res.status(403).json({ message: "Only the owner can remove members" });

  const target = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: req.params.userId, groupId: req.params.id } },
  });
  if (!target) return res.status(404).json({ message: "Member not found" });

  await prisma.groupMember.delete({ where: { id: target.id } });
  res.json({ message: "Member removed" });
};

module.exports = {
  getGroups, createGroup, getGroup, updateGroup,
  deleteGroup, joinGroup, leaveGroup, removeMember,
};
