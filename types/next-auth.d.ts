import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;  // Add the id field to the user object
            name?: string | null;
            email?: string | null;
            picture?: string | null;
        };
    }
}
