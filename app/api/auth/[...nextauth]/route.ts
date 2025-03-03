import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    updateAge: 30 * 60, // session for 30 min
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const { email, name } = user;

        // Check if email is provided
        if (!email) {
          console.error("Sign-in error: Email is required.");
          return false;
        }

        // Check if the user already exists
        const isUserExist = await prisma.user.findUnique({
          where: { email },
        });

        // If the user doesn't exist, create a new user
        if (!isUserExist) {
          await prisma.user.create({
            data: {
              email,
              name: name,
            },
          });
        }

        // Allow sign-in
        return true;
      } catch (e: any) {
        console.error("Sign-in error:", e.message); // Improved error logging
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.image = user.image;
      }

      // Fetch the user from the database to get the ID
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id; // Add the user ID to the JWT token
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        if (token.id) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
          session.user.image = token.image as string;
        }
      }
      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
