const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const groupRoutes = require("./routes/groups.routes");
const taskRoutes = require("./routes/tasks.routes");
const sessionRoutes = require("./routes/sessions.routes");


dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRoutes); 
app.use("/api/auth", authRoutes); // login/signup/me
// all below share this prefix (tasks and sessions just add /groupId/tasks on top)
app.use("/api/groups", groupRoutes);
app.use("/api/groups", taskRoutes);
app.use("/api/groups", sessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusConnect backend running on port ${PORT}`);
});