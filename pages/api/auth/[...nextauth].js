import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const authOptions = {
   // Configure one or more authentication providers
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         // The name to display on the sign-in form (e.g., 'Sign in with...')
         name: 'Credentials',
         // The credentials are used to generate a suitable form on the sign-in page.
         // You can specify whatever fields you are expecting to be submitted.
         // For example, domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
         credentials: {
            username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
            password: { label: 'Password', type: 'password' }
         },
         async authorize(credentials, req) {
            console.log('credentials', credentials);
            // Return null if user data could not be retrieved

            if ('1' === credentials.username && '1' === credentials.password)
               return { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
            return null;
         }
      }),
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
      VkProvider({
         clientId: process.env.VK_CLIENT_ID,
         clientSecret: process.env.VK_CLIENT_SECRET,
      }),
      YandexProvider({
         clientId: process.env.Yandex_CLIENT_ID,
         clientSecret: process.env.Yandex_CLIENT_SECRET,
      })
   ],
};

const resf = NextAuth(authOptions);

export default (...params) => {
   const [req] = params;
   console.log('pages/api/auth/[...nextauth].js ');
   console.log('>> ', req.method, ' запрос на', req.url, req.query);
   return resf(...params);
};