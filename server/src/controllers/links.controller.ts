import { Request, Response } from 'express';
import { links, users } from '@/db/schema';
import { db } from '@/db';

export const createLink = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const { name, url, logo } = req.body;
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    
    if(result.length == 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' })
    } else {
      const data = await db.insert(links).values({ user_id: result[0].id, name, url, logo });
      res.json({ success: true, message: 'Link created successfully' })
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
} 

export const readLinks = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const { name, url, logo } = req.body;
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    
    if(result.length == 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' })
    } else {
      const listLinks = await db.select().from(links).where(eq(links.user_id, result[0].id));
      
      res.json({ success: true, data: listLinks })
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
} 