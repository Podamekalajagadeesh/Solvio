import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solveRoute from "./routes/solve.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/solve", solveRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
