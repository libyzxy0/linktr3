import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { users, otps } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { googleOAuthClient, UserRefreshClient } from '@/utils/lib/google-client';
import { sendOtp } from '@/utils/mailer/sendOtp';
import { getUserFromToken } from '@/utils/lib/helper/get-user-from-token'
import { generateAvatarUrl } from '@/utils/random-avatar'

export const register = async (req: Request, res: Response) => {
 try {
    const { name, username, email, bio, avatar, password } = req.body;
    
    /* Fetch all users from database  */
    const result = await db.select().from(users);
    
    /* Check if email already in used */
    const em = result.find((u) => u.email === email);
    if(em) {
      res.status(409).send({ success: false, message: 'User with that email already exists' })
      return;
    }
    
    /* Check if username already in used */
    const un = result.find((u) => u.email === email);
    if(un) {
      res.status(409).send({ success: false, message: 'User with that username already exists' })
      return;
    }
    
    /* Let's hash password using bcryptjs */
   const salt = bcryptjs.genSaltSync(10);
   const hashedPassword = await bcryptjs.hash(password, salt);
   
   /* Insert all data to database */
    const data = await db.insert(users).values({
      name,
      username, 
      bio,
      email,
      avatar, 
      password: hashedPassword,
      provider: 'email',
      visits: 0,
      cover: '', 
      email_verified: false 
    }).returning({ insertedId: users.id });
    
    /* Auto generate gravatar after account creation */
    await db.update(users).set({
      avatar: generateAvatarUrl(data[0].insertedId)
    }).where(eq(users.id, data[0].insertedId));
    
    /* Generate JWT */
    const token = jwt.sign({ 
      id: data[0].insertedId, 
      email: email 
    }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
    
    /* Generate a random 6 digit integer */
    const otp_code = Math.floor(100000 + Math.random() * 900000);
    
    /* Send OTP code into user's email */
    await sendOtp({
      name, 
      email, 
      otp: otp_code
    })
    
    /* Write otp code into database */
    await db.insert(otps).values({ email, code: otp_code });
    
    res.json({ success: true, message: 'Successfully created account', jwt_token: token });
  } catch (error: any) {
    console.log("Account creation error:", error);
    res.status(400).json({ success: false, message: 'Failed to create account' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    /* Select all users from database */
    const result = await db.select().from(users);
    
    /* Check if user exist by finding its email or username into users database */
    const user = result.find((u) => u.email === email || u.username === email);
    
    /* If user didn't found throw a 404 error */
    if(!user) return res.status(404).json({ success: false, message: 'User not found', jwt_token: null });
    
    /* 
    If no user password setted, reject login 
    =======================================
    This means user are not used login provider such as 'email', instead they used oauth like 'google' or 'github'.
    */
    if(!user.password) return res.status(401).json({ success: false, message: 'Incorrect password [11002]', jwt_token: null });
    
    /* Compare hashed password using bcryptjs */
    const isCorrectPass = await bcryptjs.compare(password, user.password);
    
    /* If it's not match reject login */
    if(!isCorrectPass) return res.status(401).json({ success: false, message: 'Incorrect password', jwt_token: null });
    
    /* This part is success */
    
    /* Generate a new JWT */
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
    
    /* Send the token into our client */
    res.json({ success: true, message: 'Successfully logged in', jwt_token: token })
  } catch (error: any) {
    console.log("Login failed:", error);
    res.status(400).json({ success: false, message: 'Failed to login' })
  }
}

export const getSession = async (req: Request, res: Response) => {
  try {
    const token = ((req.headers['authorization'])?.split('Bearer ')).join("");
    
    const user = await getUserFromToken(token, {
      with: {
        links: req.query.links === 'true', 
        cards: req.query.cards === 'true', 
      }
    })
    
    if(!user) {
      res.status(401).json({ success: false, message: 'Unauthorized access' })
      return;
    }
    
    res.send(user);
  } catch (error: any) {
    console.log('Error verifying user:', error)
    res.status(400).json({ success: false, message: 'Something went wrong' })
  }
}

export const googleOAuth = async (req: Request, res: Response) => {
  try {
    /* Get authentication flow if its 'auth-code' or 'credentials' */
    const flow = req.body.flow;
    
    /* Get the 'code' or 'credentials' */
    const code = ((req.headers['authorization'])?.split('Bearer ')).join("");
    
    /* Initialize empty details */
    let name, email, picture, sub;
    
    if(flow == 'auth-code') {
      const { tokens } = await googleOAuthClient.getToken(code);
      
      const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`);
      
      /* Set values to our initialized variables */
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
      
      /* Set values to our initialized variables */
      name = data.name;
      email = data.email;
      picture = data.picture;
      sub = data.sub;
    }
    
    
    /* Find user email if its already exists */
    /* This code isn't a final yet, because google email can change at any time, i will change it soon into google id */
    const user = await db.select().from(users).where(eq(users.email, email));
    
    /* Generate a JWT */
    const token = jwt.sign({ id: data[0].insertedId, email }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' });
    
    /* Check if there's user */
    if(user.length == 0) {
      
      /* Write data into 'users' table */
      const data = await db.insert(users).values({
        name, 
        username: null, 
        bio: "", 
        email, 
        avatar: picture, 
        password: null,
        provider: 'google', 
        visits: 0, 
        cover: '',  
        email_verified: true
      }).returning({ insertedId: users.id });
      
      res.json({ success: true, token, message: 'Signed in successfully [10283]' });
    } else {
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
    
    const user = await getUserFromToken(token);
    
    /* If not user throw a 401 response */
    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized access' });
      return;
    }
    
    /* Used for validating email or username duplicates */
    const isExistE = listUsers.find((u) => u.email === fields?.email);
    const isExistU = listUsers.find((u) => u.username === fields?.username);
    
    /* Check is email want to update is being used */
    if (isExistE && isExistE.id !== user.id) {
      res.status(409).json({ success: false, message: 'User already used that email' });
      return;
    }
    
     /* Check is username want to update is being used */
    if (isExistU && isExistU.id !== user.id) {
      res.status(409).json({ success: false, message: 'User already used that username' });
      return;
    }
    
    /* Check if password is updated */
    if (fields.password) {
      /* Make the updated password to be hashed */
      const salt = await bcryptjs.genSalt(10);
      fields.password = await bcryptjs.hash(fields.password, salt);
    }
    
    await db.update(users).set(fields).where(eq(users.id, user.id));
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
  res.status(400).json({ message: 'Hello this is linktr3.vercel.app Backend API.' })
}

export const handleOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (req.body.f == 'verify') {
      const listOtps = await db.select().from(otps);
      const otpData = listOtps.find((u) => u.email == email);

      /* If otp not exist on table throw an error */
      if (!otpData) {
        res.status(404).send({ success: false, message: "OTP isn't valid, please enter it correctly" });
        return;
      }

      if (otpData.code === parseInt(otp)) {
        /* Make user verified */
        await db.update(users).set({ email_verified: true }).where(eq(users.email, otpData.email));
        
        /* Delete otp code after using */
        await db.delete(otps).where(eq(otps.id, otpData.id));
        
        res.send({ success: true, message: "OTP verified successfully" });
      } else {
        res.status(401).send({ success: false, message: "OTP isn't valid, please enter it correctly" });
      }

    } else if (req.body.f == 'regenerate') {
      console.log('Regenerating OTP');
      const listOtps = await db.select().from(otps);
      const otpData = listOtps.find((u) => u.email == email);
      const otp_code = Math.floor(100000 + Math.random() * 900000);

      try {
        /* Send OTP code into user's email */
        await sendOtp({
          name: email,
          email,
          otp: otp_code
        });
      } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).send({ success: false, message: "Failed to send OTP email" });
        return;
      }
        
      /* Check if OTP is already exists */
      try {
        if (otpData) {
          /* If exist just update it */
          await db.update(otps).set({ code: otp_code }).where(eq(otps.email, email));
          console.log(`OTP ${otp_code} updated for email ${email}`);
        } else {
          /* If not exist write a new otp code */
          await db.insert(otps).values({ email, code: otp_code });
          console.log(`OTP ${otp_code} inserted for email ${email}`);
        }
      } catch (error) {
        console.error("Error updating/inserting OTP in Database:", error);
        res.status(500).send({ success: false, message: "Failed to save OTP" });
        return;
      }

      res.send({ success: true, message: "OTP sent to your email" });
    } else {
      res.send({ success: false, message: 'Invalid method' });
    }
  } catch (error) {
    console.log('Error handling OTP:', error);
    res.status(400).json({ success: false, message: "OTP isn't valid, please enter it correctly" });
  }
}
