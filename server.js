const express = require("express");
const cors = require("cors")

const routeUsers = require("./src/routes/user.route");
require("dotenv").config()


const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/user", routeUsers);

app.listen(process.env.SERVER_PORT, () => console.log("👍 Server corriendo"));
