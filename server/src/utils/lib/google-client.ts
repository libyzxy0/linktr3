import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
const googleOAuthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!, 
      "postmessage"
    )
export { UserRefreshClient, googleOAuthClient } 