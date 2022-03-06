import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient({ log: ["query"] });
import userRouter from "./routes/userRoutes";
const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.listen(3004, () => {
  console.log("STARTED");
});
