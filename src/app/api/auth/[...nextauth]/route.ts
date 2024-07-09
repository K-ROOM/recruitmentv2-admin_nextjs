import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authOptions } from './auth';

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }