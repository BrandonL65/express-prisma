import express from "express";
import { PrismaClient } from "@prisma/client";
const userRouter = express.Router();

const prisma = new PrismaClient({ log: ["query"] });

//get all users
userRouter.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

//create user
userRouter.post("/", async (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    name,
    age,
  };
  const createdUser = await prisma.user.create({
    data: newUser,
  });
  res.json(createdUser);
});

//get single user
userRouter.get("/:id", async (req, res) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json(foundUser);
});

//update user
userRouter.put("/:id", async (req, res) => {
  const idToUpdate = req.params.id;
  const { name, age } = req.body;

  const updatedVersion = {
    name,
    age,
  };

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(idToUpdate),
    },
    data: updatedVersion,
  });

  res.json(updatedUser);
});

//delete single user
userRouter.delete("/:id", async (req, res) => {
  const { id: idToDelete } = req.params;

  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(idToDelete),
    },
  });

  res.json(deletedUser);
});

export default userRouter;
