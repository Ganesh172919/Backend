import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("i am up");
});

app.post("/user/register", async (req, res) => {
  const body = req.body;
  const { email, username, password } = body;

  if (!email || !username || !password) {
    return res.status(400).json({
      error: "either of email, username or password was not provided"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    name: username,
    email: email,
    password: hashedPassword,
    createdAt:Math.floor((new Date()).getTime()/1000),
    updatedAt: Math.floor((new Date()).getTime()/1000),
    lastSeen: null,
    privateKey: null,
  };

  res.status(200).json(user);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
