import express from 'express';
import {
  register, 
  login, 
  getSession, 
  requestPlaceholder, 
  googleOAuth, 
  updateUser
} from '@/controllers/user.controller'

const router = express.Router();

// Email Authentication 
router.route('/get-session').get(getSession);
router.route('/register').post(register).get(requestPlaceholder);
router.route('/login').post(login).get(requestPlaceholder);
router.route('/update-user').post(updateUser).get(requestPlaceholder);

//Google Authentication 
router.route('/oauth').post(googleOAuth).get(requestPlaceholder);

export default router;