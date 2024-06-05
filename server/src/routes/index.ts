import express from 'express';
import {
  register, 
  login, 
  getSession, 
  requestPlaceholder, 
  googleOAuth, 
  updateUser, 
  getUserPublicProfile
} from '@/controllers/user.controller'

const router = express.Router();

// Authentication 
router.route('/get-session').get(getSession);
router.route('/register').post(register).get(requestPlaceholder);
router.route('/login').post(login).get(requestPlaceholder);
router.route('/update-user').post(updateUser).get(requestPlaceholder);
router.route('/get-user').post(getUserPublicProfile).get(requestPlaceholder);

//Google OAuth 
router.route('/oauth').post(googleOAuth).get(requestPlaceholder);

export default router;