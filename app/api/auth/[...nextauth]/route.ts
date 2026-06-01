import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@nkhr.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { employee: true }
        });

        if (!user) {
          return null;
        }

        let isPasswordValid = false;
        
        if (credentials.password === user.password) {
          isPasswordValid = true; // Temporary support for existing dev.db plain passwords
        } else {
          try {
            isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          } catch (e) {
            isPasswordValid = false;
          }
        }

        // Allow demo bypass
        if (!isPasswordValid && credentials.password === 'admin123' && credentials.email === 'admin@nkhr.com') {
           isPasswordValid = true;
        }

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.employee ? `${user.employee.firstName} ${user.employee.lastName}` : 'Admin User',
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
         (session.user as any).role = token.role;
         (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret_for_local_dev"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
