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
            // const response = await fetch("http://localhost:3000/api/test", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         user: user,
            //         account: account,
            //         profile: profile,
            //     }),
            // });

            return true;
        },

        /**
         * JWT Callback
         * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
         * 반환된 값은 암호화되어 쿠키에 저장됨
         */


        async jwt({ token, account, user }) {
            // 초기 로그인시 User 정보를 가공해 반환
            if (account && user) {
                token.access_token = account.access_token;
                token.accessTokenExpires = account.expires_at;
                token.refreshToken = account.refresh_token;
                token.user = user;
            }
            return token;
        },

        /**
         * Session Callback
         * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
         * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
         * JWT 토큰의 정보를 Session에 유지 시킨다.
         */
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        }

    },
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
