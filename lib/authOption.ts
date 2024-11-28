import NextAuth, { Account, NextAuthOptions, Session, User } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import Request from "@/lib/fetch";
import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authOptions: NextAuthOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_KEY ?? "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User; account: Account | null }): Promise<boolean> {
            if (!account) {
                console.error("Account is null");
                return false;
            }

            const kakaoAccessToken = account.access_token;
            const request = new Request();

            try {
                const response = await request.post("/api/signIn", {
                    kakaoAccessToken,
                    email: user.email,
                    id: user.id,
                    nickName: user.name,
                });

                const { accessToken, refreshToken } = response;
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                return true;
            } catch (err) {
                console.error("Sign-in error:", err);
                return false;
            }
        },

        async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            if (!token.accessToken) {
                console.error("No accessToken in token:", token);
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.userId = token.userId;
            return session;
        },
    },
};

export default authOptions