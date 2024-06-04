import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { googleOAuthClient, UserRefreshClient } from '@/utils/lib/google-client';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, email, bio, avatar, password } = req.body;
    const result = await db.select().from(users);
    //Check if email already in used
    const em = result.find((u) => u.email === email);
    if(em) {
      res.status(409).send({ success: false, message: 'User with that email already exists' })
      return;
    }
    
    //Check if username already in used
    const un = result.find((u) => u.email === email);
    if(un) {
      res.status(409).send({ success: false, message: 'User with that username already exists' })
      return;
    }
    
   const salt = bcryptjs.genSaltSync(10);
   const hashedPassword = await bcryptjs.hash(password, salt);
    const data = await db.insert(users).values({ name, username, bio, email, avatar, password: hashedPassword, povider: 'email' });
    res.json({ success: true, message: 'Successfully created account' })
  } catch (error: any) {
    console.log("Account creation error:", error);
    res.status(400).json({ success: false, message: 'Failed to create account' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await db.select().from(users);
    
    const user = result.find((u) => u.email === email || u.username === username);
    if(!user) {
      res.status(404).json({ success: false, message: 'User not found', jwt_token: null });
      return;
    } else {
      if(!user.password) {
        res.status(401).json({ success: false, message: 'Incorrect password', jwt_token: null });
        return;
      }
    const isCorrectPass = await bcryptjs.compare(password, user.password);
    if(!isCorrectPass) {
      res.status(401).json({ success: false, message: 'Incorrect password', jwt_token: null });
      return;
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
    res.json({ success: true, message: 'Successfully logged in', jwt_token: token })
    } 
  } catch (error: any) {
    console.log("Account creation error:", error);
    res.status(400).json({ success: false, message: 'Failed to create account' })
  }
}

export const getSession = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    res.send(result[0]);
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Unauthorized access' })
  }
}

export const googleOAuth = async (req: Request, res: Response) => {
  try {
    const flow = req.body.flow;
    const code = ((req.headers['authorization'])?.split('Bearer ')).join("");
    
    console.log('Flow:', flow);
    
    let name, email, picture, sub;
    
    if(flow == 'auth-code') {
      const { tokens } = await googleOAuthClient.getToken(code);
      const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`);
      name = data.name;
      email = data.email;
      picture = data.picture;
      sub = data.sub;
    } else {
      const ticket = await googleOAuthClient.verifyIdToken({
        idToken: code, 
        audience: process.env.GOOGLE_CLIENT_ID!
      })
      const data = ticket.getPayload();
      name = data.name;
      email = data.email;
      picture = data.picture;
      sub = data.sub;
    }
    
    
    console.log("User email:", email);
    /* Find user email if its already exists */
    /* This code isn't a final yet, because google email can change at any time, i will change it soon into google id */
    const user = await db.select().from(users).where(eq(users.email, email));
    
    /* Check if there's user */
    if(user.length == 0) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
      const data = await db.insert(users).values({ name, username: null, bio: "", email, avatar: picture, password: null, provider: 'google' });
      res.json({ success: true, token, message: 'Signed in successfully [10283]' });
    } else {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
      res.json({ success: true, token, message: 'Signed in successfully [10282]' })
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, token: false, message: "Failed to login using google oauth" })
  }
}

export const requestPlaceholder = (_req: Request, res: Response) => {
  res.status(400).json({ message: 'Cannot GET, perform a POST request instead' })
}