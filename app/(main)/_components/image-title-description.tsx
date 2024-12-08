import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ImageTitleDescriptionProps {
    title: string;
    description: string;
    image: string;
    buildingName?: string;
    urlType?: string;
    facFloor?: string;
    route?: string;
    recommandTitle?: string;
}

export const ImageTitleDescription = ({
    title,
    description,
    image,
    buildingName,
    urlType,
    facFloor,
    route,
    recommandTitle,
}: ImageTitleDescriptionProps) => {
    const { setKeyword } = usePlaceRecommand();

    const router = useRouter();
    useEffect(() => {
        console.log("image loading... ", image);
    }, []);
    return (
        <div
            className="flex-col flex items-start justify-start w-[48%] overflow-hidden cursor-pointer mb-9"
            onClick={() => {
                if (recommandTitle) setKeyword(recommandTitle);
                if (route) {
                    router.push(route);
                } else {
                    router.push(
                        `f/detail?building=${buildingName}&facName=${title}&type=${koreanToEnglish(
                            description
                        )}&facFloor=${facFloor}`
                    );
                }
            }}
        >
            <div className="relative w-full h-[120px] rounded-[5px] overflow-hidden mb-2">
                <Image
                    src={image}
                    sizes="(max-width: 600px) 100vw"
                    fill
                    className="cover"
                    alt="Documents"
                />
            </div>
            <p className="text-[17px] font-medium overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {title}
            </p>
            <p className="font-regular text-[#A0A4A8]">
                {description}
            </p>
        </div>
    );
};

export function koreanToEnglish(type: string) {
    switch (type) {
        case "카페":
            return "cafe";
        case "편의점":
            return "convenience";
        case "라운지":
            return "lounge";
        case "독서실":
            return "readingRoom";
        case "식당":
            return "restaurant";
        case "수면실":
            return "sleepingRoom";
        case "문구점":
            return "stationery";
        case "그룹스터디룸":
            return "studyRoom";
        case "스터디룸":
            return "studyRoom";
        case "캐럴":
            return "carrel";
        case "식사":
            return "restaurant";
        case "그룹룸":
            return "studyRoom";
        case "열람실":
            return "readingRoom";
        default:
            return type; // 알 수 없는 type에 대해서는 그대로 반환
    }
}
