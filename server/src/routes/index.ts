import express from 'express';
import {
  register, 
  login, 
  getSession, 
  requestPlaceholder, 
  googleOAuth, 
  updateUser, 
  getUserPublicProfile, 
  handleOtp
} from '@/controllers/user.controller'
import { 
  createLink, 
  updateLink
} from '@/controllers/links.controller';
const router = express.Router();

// User actions
router.route('/register').post(register).get(requestPlaceholder);
router.route('/get-session').get(getSession);
router.route('/login').post(login).get(requestPlaceholder);
router.route('/update-user').post(updateUser).get(requestPlaceholder);
router.route('/get-user').post(getUserPublicProfile).get(requestPlaceholder);
router.route('/otp').post(handleOtp).get(requestPlaceholder);

//Links actions
router.route('/create-link').post(createLink).get(requestPlaceholder);
router.route('/update-link').post(updateLink).get(requestPlaceholder);


//Google OAuth 
router.route('/oauth').post(googleOAuth).get(requestPlaceholder);

export default router;