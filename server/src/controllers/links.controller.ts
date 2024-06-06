import { Request, Response } from 'express';
import { links, users } from '@/db/schema';
import { db } from '@/db';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

export const createLink = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const fields = req.body;
    const { name, url, logo } = req.body;
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    
    if(result.length == 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' })
    } else {
      const data = await db.insert(links).values({ user_id: result[0].id, name, url, logo, clicks: 0 });
      console.log('success')
      res.json({ success: true, message: 'Link created successfully' })
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}

export const updateLink = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const fields = req.body;
    const { name, url, logo } = req.body;
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    
    if(result.length == 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' })
    } else {
      await db.update(users).set(fields).where(eq(users.id, result[0].id));
      res.json({ success: true, message: 'Link updated successfully', fields })
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}