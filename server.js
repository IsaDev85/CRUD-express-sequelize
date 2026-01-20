const express = require("express");

const routeUsers = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use("/api/user", routeUsers);

app.listen(3000, () => console.log("👍 Server corriendo"));
