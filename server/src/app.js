import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.send("Server Up!");
});

export default app;
