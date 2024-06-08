import jwt from 'jsonwebtoken';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import type { User } from '@/types';

export const getUserFromToken = async (token: string, options): Promise<User | null> => {
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const user = await db.query.users.findFirst({
      where: ((users, { eq }) => eq(users.id, id)),
      ...options
    });
    console.log("[Success] GET Session:", id)
    return user;
  } catch (error: any) {
    console.log('Error getting user:', error)
    return null;
  }
}