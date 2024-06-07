import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { users, otps } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { googleOAuthClient, UserRefreshClient } from '@/utils/lib/google-client';
import { sendOtp } from '@/utils/mailer/sendOtp';

const salt = bcryptjs.genSaltSync(10);

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
    
   const hashedPassword = await bcryptjs.hash(password, salt);
    const data = await db.insert(users).values({ name, username, bio, email, avatar, password: hashedPassword, provider: 'email', visits: 0, cover: '', email_verified: false }).returning({ insertedId: users.id });
    
    const token = jwt.sign({ id: data[0].insertedId, email: email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
    
    const otp_code = Math.floor(100000 + Math.random() * 900000);
    
    // Send otp inti user email
    await sendOtp({
      name, 
      email, 
      otp: otp_code
    })
    
    //Write otp code into database
    await db.insert(otps).values({ email, code: otp_code });
    
    res.json({ success: true, message: 'Successfully created account', jwt_token: token })
  } catch (error: any) {
    console.log("Account creation error:", error);
    res.status(400).json({ success: false, message: 'Failed to create account' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await db.select().from(users);
    
    const user = result.find((u) => u.email === email || u.username === email);
    if(!user) {
      res.status(404).json({ success: false, message: 'User not found', jwt_token: null });
      return;
    } else {
      if(!user.password) {
        res.status(401).json({ success: false, message: 'Incorrect password [G]', jwt_token: null });
        return;
      }
    const isCorrectPass = await bcryptjs.compare(password, user.password);
    if(!isCorrectPass) {
      res.status(401).json({ success: false, message: 'Incorrect password [E]', jwt_token: null });
      return;
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
    res.json({ success: true, message: 'Successfully logged in', jwt_token: token })
    } 
  } catch (error: any) {
    console.log("Login failed:", error);
    res.status(400).json({ success: false, message: 'Failed to login' })
  }
}

export const getSession = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    
    const q = req.query;
    
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const user = await db.query.users.findFirst({
      where: ((users, { eq }) => eq(users.id, info.id)),
      with: {
        links: req.query.links === 'true', 
        cards: req.query.cards === 'true', 
      }
    });
    
    if(!user) {
      res.status(401).json({ success: false, message: 'Unauthorized access' })
    }
    res.send(user);
  } catch (error: any) {
    console.log('Error verifying user:', error)
    res.status(401).json({ success: false, message: 'Unauthorized access' })
  }
}

export const googleOAuth = async (req: Request, res: Response) => {
  try {
    const flow = req.body.flow;
    const code = ((req.headers['authorization'])?.split('Bearer ')).join("");
    
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
    
    
    /* Find user email if its already exists */
    /* This code isn't a final yet, because google email can change at any time, i will change it soon into google id */
    const user = await db.select().from(users).where(eq(users.email, email));
    
    /* Check if there's user */
    if(user.length == 0) {
      const data = await db.insert(users).values({ name, username: null, bio: "", email, avatar: picture, password: null, provider: 'google',  visits: 0, cover: '',  email_verified: true }).returning({ insertedId: users.id });
      
      const token = jwt.sign({ id: data[0].insertedId, email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
      res.json({ success: true, token, message: 'Signed in successfully [10283]' });
    } else {
      const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
      res.json({ success: true, token, message: 'Signed in successfully [10282]' })
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, token: false, message: "Failed to login using google oauth" })
  }
}

export const updateUser = async (req, res) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    const fields = req.body;
    const listUsers = await db.select().from(users);
    
    const info = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await db.select().from(users).where(eq(users.id, info.id));
    
    const isExist = listUsers.find((u) => u.email === fields?.email || u.username === fields?.username);
    
    if (isExist && isExist.id !== info.id) {
      res.status(409).json({ success: false, message: 'User already used that value' });
      return;
    }
    
    if (!result) {
      res.status(401).json({ success: false, message: 'Unauthorized access' });
      return;
    }

    if (fields.password) {
      const salt = await bcryptjs.genSalt(10);
      fields.password = await bcryptjs.hash(fields.password, salt);
    }
    
    await db.update(users).set(fields).where(eq(users.id, info.id));
    res.json({ success: true, fields });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
};

export const getUserPublicProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(404).json({ success: false, message: "Missing parameter 'username'" });
      return;
    }

    const user = await db.query.users.findFirst({
      where: ((users, { eq }) => eq(users.username, username)),
      with: {
        links: true
      }
    });
    if (!user) {
      res.status(404).json({ success: false, message: `User ${username} is not found` });
    } else {
      await db.update(users).set({ visits: user.visits + 1 }).where(eq(users.id, user.id));
      const publicProfile = {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        cover: user.cover,
        visits: user.visits + 1, //Add 1 because cant read latest update of visits
        links: user.links,
        cards: user.cards
      };
      res.json({ success: true, user: publicProfile });
    }
  } catch (error: any) {
    console.log("Error getting user public profile:", error);
    res.status(400).json({ success: false, message: 'Something went wrong' });
  }
};


export const requestPlaceholder = (_req: Request, res: Response) => {
  res.status(400).json({ message: 'Cannot GET, perform a POST request instead' })
}

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body)
    if(req.body.f == 'verify') {
      const listOtps = await db.select().from(otps);
      const resu = listOtps.find((u) => u.email == email);
      console.log(resu)
      if(!resu) {
        res.status(404).send({ success: false, message: 'Otp not found on database' })
        return;
      }
      
      if(resu.code === parseInt(otp)) {
        await db.update(users).set({ email_verified: true }).where(eq(users.email, resu.email));
        res.send({ success: true, message:"Otp verified successfully" })
      } else {
        res.status(401).send({ success: false, message: 'Incorrect OTP, double check your otp'})
      }
      
    } else if (req.body.f == 'regenerate') {
      const listOtps = await db.select().from(otps);
      
      const resu = listOtps.find((u) => u.email == email);
      const otp_code = Math.floor(100000 + Math.random() * 900000);

        // Send otp into user email
        await sendOtp({
          name: email,
          email,
          otp: otp_code
        });

        if (resu) {
          await db.update(otps).set({ code: otp_code }).where(eq(otps.email, email));
        } else {
          await db.insert(otps).values({ email, code: otp_code });
        }
        res.send({ success: true, message: "OTP sent to your email" });
    } else {
      res.send({ success: false, message: 'Invalid method' })
    }
  } catch (error) {
    console.log('Error verifying otp:', error);
    res.status(400).json({ success: false, message: 'OTP not valid, type it correctly' })
  }
}