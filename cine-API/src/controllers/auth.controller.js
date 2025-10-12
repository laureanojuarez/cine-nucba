import { validateLoginUser } from "../helpers/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Usuario o contraseña inválidos" });
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(400).json({ message: "Email y/o contraseña incorrecta" });
  }

  const secretKey = "laureanojuarez";

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  res.json({ token });
};

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
