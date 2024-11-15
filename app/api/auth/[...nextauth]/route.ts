import NextAuth, { Account, AuthOptions, Session, User } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import Request from "@/lib/fetch";
import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const authOptions: AuthOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_KEY ?? "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        /**
         * signIn 콜백
         * Kakao 로그인 후 서버와 통신하여 accessToken만 가져오기
         */
        async signIn({
            user,
            account,
        }: {
            user: User;
            account: Account | null;
        }): Promise<boolean> {
            if (!account) {
                console.error("Account is null");
                return false;
            }

            const kakaoAccessToken = account.access_token;
            const request = new Request();

            try {
                const response = await request.post("/api/signIn", {
                    kakaoAccessToken: kakaoAccessToken,
                    email: user.email,
                    id: user.id,
                    nickName: user.name,
                });

                const { accessToken, refreshToken } = response;

                user.accessToken = accessToken; // User에 저장
                user.refreshToken = refreshToken;
                return true;
            } catch (err) {
                console.error("Sign-in error:", err);
                return false;
            }
        },


        /**
         * JWT 콜백
         * 로그인 시 받은 accessToken과 refreshToken을 token에 저장
         */
        async jwt({ token, user }: {
            token: JWT;
            user?: User;
        }): Promise<JWT> {
            if (user) {
                token.accessToken = user.accessToken; // User에서 가져옴
                token.refreshToken = user.refreshToken;
            }

            // AccessToken 없을 경우 로그 출력
            if (!token.accessToken) {
                console.error("No accessToken in token:", token);
            }

            return token;
        },

        /**
         * Session 콜백
         * JWT에서 accessToken과 refreshToken을 session에 저장
         */
        async session({ session, token, }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            session.accessToken = token.accessToken; // JWT에서 가져옴
            session.refreshToken = token.refreshToken;
            session.userId = token.userId; // 사용자 ID 추가
            return session;
        },
    },
};


// App Router용 NextAuth 핸들러
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };