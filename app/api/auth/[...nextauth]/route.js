import Request from "@/lib/fetch";
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";

// const fetchBuildingFacilities = async (buildingName) => {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilities?buildingName=${buildingName}`
//     );
//     return response.json();
// };

const authOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_KEY ?? "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const id = user.id;
            const nickName = user.name;
            const email = user.email;
            const kakaoAccessToken = account.access_token;

            const request = new Request();

            try {
                const response = await request.post('/api/signIn', {
                    kakaoAccessToken: kakaoAccessToken,
                    email: email,
                    id: id,
                    nickName: nickName
                });

                const { accessToken, refreshToken } = response;
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        },

        /**
         * JWT Callback
         * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
         * 반환된 값은 암호화되어 쿠키에 저장됨
         */


        async jwt({ token, account, user }) {
            console.error(account, user);
            if (user) {
                // 초기 로그인 시에만 token에 accessToken과 refreshToken 추가
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            else {
                token.accessToken = 'user.accessToken';
                token.refreshToken = 'user.refreshToken';
            }
            // console.log('jwt', token);
            return token;
        },

        /**
         * Session Callback
         * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
         * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
         * JWT 토큰의 정보를 Session에 유지 시킨다.
         */
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken

            console.error('useSession called', session)
            return session;
        }

    },
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };