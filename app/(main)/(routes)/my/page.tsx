"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import MyCurious from "@/public/icons/my_curious.svg";
import { useRouter } from "next/navigation";
import { useTabBarStore } from "@/hooks/useTabBar";
import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./fetch";
import { calculateLevel } from "@/lib/userLevel";

const MyPageMenu = ({ link, children }: { link: string, children: ReactNode }) => {
    return (
        <Link
            href={link}
            className="h-[53px] w-full flex flex-row justify-between items-center cursor-pointer border-t border-[#CCCCCC] px-4">
            {children}
        </Link>
    )

}

const MyPage = () => {
    const { update, data: session, status: statusSession } = useSession();
    const { data: userInfo, status, error } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => getUserInfo(session, update),
        enabled: statusSession === 'authenticated'
    })

    const { setTab } = useTabBarStore();

    useEffect(() => {
        setTab("my");
    }, [setTab]);

    const handleLogin = () => {
        signIn('kakao');
    }

    const handleLogOut = () => {
        signOut();
    }

    if (statusSession != 'authenticated' || !userInfo) {
        return (
            <div className="w-full max-w-[450px] h-full left-0 top-0 flex flex-col">
                <div className="w-auto mt-[72px] mx-4 mb-3 flex flex-col items-center">
                    <Image src='/my/profile.svg' alt="profile icon" width={63} height={63} className="mb-3" />
                    <button onClick={handleLogin} className="w-full h-[50px] bg-[#FEE500] rounded-lg font-bold relative">
                        <Image src='/kakao_logo.png' alt="kakao-logo" width={22} height={22} className="absolute left-[16px] top-[14px]" />
                        카카오 로그인
                    </button>
                </div>
                <div>
                    <MyPageMenu link="https://www.notion.so/FUN-07e34afb8ae844cd9323b49b913b6971?pvs=4">
                        <span className="ml-[10px]">뻔맵이 뭐예요?</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://nebulasw.notion.site/PWA-1136841d652b4c95a6e5414aa1828418">
                        <span className="ml-[10px]">뻔맵 앱 다운로드 방법</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://www.instagram.com/bbun.map/">
                        <span className="ml-[10px]">뻔맵 인스타그램</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://walla.my/survey/8qXP8VwvXGaaVOe7ytdM">
                        <span className="ml-[10px]">뻔맵에게 정보 제보하기</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://docs.google.com/forms/d/e/1FAIpQLSeHcHcLslM3k-e8PsVPB6_GxvXPtPSPnpKPSehug2xBU_PcMQ/viewform?usp=sf_link">
                        <span className="ml-[10px]">뻔맵에게 피드백 주기</span>
                        <MyCurious />
                    </MyPageMenu>
                </div>
            </div >
        )
    }
    else {
        const [level, remain] = calculateLevel(userInfo.numOfRealTimeVote);

        return (
            <div className="w-full max-w-[450px] h-full left-0 top-0 flex flex-col">
                <div className="w-auto h-[105px] mx-4 mb-4 mt-[88px] flex items-center justify-between rounded-[20px] bg-[#F7F8F9] px-3">
                    <div className="flex items-center">
                        <Image src={`/my/mypage-profile/profile-lv${level}.png`} width={72} height={72} alt="current point icon" />
                        <div className="ml-3">
                            <p className="text-[28px] font-bold">Lv{level}.</p>
                            <p className="text-[13px] text-gray-600">실시간 투표 {userInfo.numOfRealTimeVote}회 참여</p>
                        </div>
                    </div>
                    <Link href='/onAir' className="h-[35px] bg-point px-[11px] py-[7px] rounded-[7px] text-[14px] font-bold text-white">투표로 레벨업</Link>
                </div>
                <div>
                    <MyPageMenu link="https://www.notion.so/FUN-07e34afb8ae844cd9323b49b913b6971?pvs=4">
                        <span className="ml-[10px]">뻔맵이 뭐예요?</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://nebulasw.notion.site/PWA-1136841d652b4c95a6e5414aa1828418">
                        <span className="ml-[10px]">뻔맵 앱 다운로드 방법</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://www.instagram.com/bbun.map/">
                        <span className="ml-[10px]">뻔맵 인스타그램</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://walla.my/survey/8qXP8VwvXGaaVOe7ytdM">
                        <span className="ml-[10px]">뻔맵에게 정보 제보하기</span>
                    </MyPageMenu>
                    <MyPageMenu link="https://docs.google.com/forms/d/e/1FAIpQLSeHcHcLslM3k-e8PsVPB6_GxvXPtPSPnpKPSehug2xBU_PcMQ/viewform?usp=sf_link">
                        <span className="ml-[10px]">뻔맵에게 피드백 주기</span>
                        <MyCurious />
                    </MyPageMenu>
                </div>
                <button className="self-center text-[13px] underline text-gray-400 absolute bottom-[88px]" onClick={handleLogOut}>로그아웃</button>
            </div >
        );
    };
}
export default MyPage;
