import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import Request from '@/lib/fetch';

export const authOptions = {
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
        async signIn({ user, account }) {
            const kakaoAccessToken = account.access_token;
            const request = new Request();

            try {
                // 서버와 통신하여 accessToken만 받아오기
                const response = await request.post('/api/signIn', {
                    kakaoAccessToken: kakaoAccessToken,
                    email: user.email,
                    id: user.id,
                    nickName: user.name,
                });

                const { accessToken, refreshToken } = response;
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                return true;
            } catch (err) {
                console.log(err);
                return false; // 오류 시 로그인 실패
            }
        },

        /**
         * JWT 콜백
         * 로그인 시 받은 accessToken을 token에 저장
         */
        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            if (!token.accessToken) {
                console.error('No accessToken in token:', token);
            }
            return token;
        },

        /**
         * Session 콜백
         * JWT에서 accessToken을 session에 저장
         */
        async session({ session, token }) {
            console.log(session, token)
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.userId = token.userId;
            return session;
        }
    },
};

const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };