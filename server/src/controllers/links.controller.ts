import { Request, Response } from 'express';
import { links } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { getUserFromToken } from '@/utils/lib/helper/get-user-from-token'

export const createLink = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const { name, url, logo } = req.body;
    const user = await getUserFromToken(token);
    if(!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' })
    } else {
      const data = await db.insert(links).values({ user_id: user.id, name, url, logo, clicks: 0 });
      res.json({ success: true, message: 'Link created successfully' })
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}

export const updateLink = async (req: Request, res: Response) => {
  try {
    const { name, url, logo, linkId } = req.body;
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const user = await getUserFromToken(token, {
      with: {
        links: true
      }
    });
    if(!user) return res.status(401).json({ success: false, message: 'Unauthorized access' });
    const linkData = user.links.find((l) => l.id === linkId);
    if(!linkData) res.status(404).json({ success: false, message: 'Cannot update link that does not belong to you or not exist' });
    
    const feilds = Object.fromEntries(
      Object.entries({ name, url, logo }).filter(([_, v]) => v),
    );
    
    await db.update(links).set(feilds).where(eq(links.id, linkData.id));
    
    res.json({ success: true, message: 'Link updated successfully' })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { linkId } = req.body;
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const user = await getUserFromToken(token, {
      with: {
        links: true
      }
    });
    if(!user) return res.status(401).json({ success: false, message: 'Unauthorized access' });
    const linkData = user.links.find((l) => l.id === linkId);
    if(!linkData) res.status(404).json({ success: false, message: 'Cannot delete link that does not belong to you or not exist' });
    
    await db.delete(links).where(eq(links.id, linkData.id));
    
    res.json({ success: true, message: 'Link deleted successfully' })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}