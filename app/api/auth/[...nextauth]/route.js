import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExist = await User.findOne({
          email: profile.email,
        });

        // if not, create a new document and save user in MongoDB
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

/* Go to https://console.cloud.google.com to get GoogleProvider credentials.
 Create a new project in that, select the project, go to lest menu, under APIs & Services section, select OAuth Consent Screen and click create.
 Enter project name, continue button. Goto Credentials section(left pannel), click create credentials->Create OAuth client ID. Web Application -> Enter http://localhost:3000 in both fields. Create.
*/

/* We have to add this to solve Redirect URI Mismatch errror: https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider */

/** Remember: Every NextJs route is a serverless route.-> Which means it is a lambda function, which opens only when it's called. Hence the server dont have to run constantly,E.g. while connecting to database.*/
//refresh everysecond.
