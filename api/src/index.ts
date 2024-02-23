require("dotenv").config();
import express from "express";
import { protectedRouter, publicRouter } from "./routes/v1/userRoutes";
import bodyParser from "body-parser";
import { verifyToken } from "./routes/v1/verifyToken";

const app = express();
const port = 3004;

app.use(
  bodyParser.json({ inflate: true, limit: "100kb", type: "application/json" })
);

app.use("/api", publicRouter);
app.use("/api", verifyToken, protectedRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
