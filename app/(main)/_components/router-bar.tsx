"use client";

import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Arrow from '@/public/Arrow.svg';

interface RouterBarProps {
    share?: boolean | null;
    fullRecommand?: boolean | null;
    fromRecommend?: boolean;
}

const RouterBar = ({ share, fullRecommand, fromRecommend }: RouterBarProps) => {
    const router = useRouter();
    const { setFullRecommandClose, refreshKeyword, setFullRecommandOpen } =
        usePlaceRecommand();

    return (
        <div className="flex flex-row justify-start items-center">
            <button
                onClick={() => {
                    if (share) {
                        router.push("/home");
                    } else if (fullRecommand) {
                        setFullRecommandClose();
                        refreshKeyword();
                    } else {
                        if (fromRecommend) {
                            setFullRecommandOpen();
                        }
                        router.back();
                    }
                }}
            >
                <Arrow stroke='#000000' width={12} height={16} strokeWidth={0.6} className='rotate-180' />
            </button>
        </div>
    );
};

export default RouterBar;
