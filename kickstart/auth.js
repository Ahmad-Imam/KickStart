import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import { userModel } from "./models/user-model";

import { dbConnect } from "./service/mongo";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // adapter: MongoDBAdapter(mongoClientPromise, {
  //   databaseName: process.env.ENVIRONMENT,
  // }),
  trustHost: true,
  secret: "4d473af750a4b22c2c4ebbf92261f41a",
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user) => {
      try {
        const { name, email } = user.user;

        await dbConnect();

        const userExists = await userModel.findOne({ email });
        if (!userExists) {
          // http://localhost:3000/

          const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
            }),
          });
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
});
