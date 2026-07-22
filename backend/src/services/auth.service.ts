import bcrypt from 'bcryptjs';
import { User } from '../models/index';
import { RegisterInput } from '../validators/index';
import { AppError } from '../utils/index';
import { HTTP_STATUS } from '../constants/index';

export interface RegisterResult {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export const registerUser = async (input: RegisterInput): Promise<RegisterResult> => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new AppError('Email already registered', HTTP_STATUS.CONFLICT);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(input.password, saltRounds);

  const newUser = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    },
  };
};
