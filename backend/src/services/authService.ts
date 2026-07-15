import bcryptjs from 'bcryptjs';
import { generateToken } from '../config/jwt';
import prisma from '../config/database';

export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
    },
  });
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = generateToken({
    id: user.id,
    username: user.username,
    isHost: user.isHost,
  });

  return { user, token };
};
