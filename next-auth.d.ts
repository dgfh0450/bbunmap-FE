import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
        user: {
            name: string;
            email: string;
            image?: string | null;
        };
    }

    interface User {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
        name: string;
        email: string;
        image?: string | null;
    }
}