import { useSearchBottomModal } from "@/hooks/useSearchBottomModal";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SearchBottomModalProps {
  searchType: string;
  buttonNumber?: number;
  searchContext?: boolean;
  searchText?: string;
}

const SearchBottomModal = ({
  searchType,
  buttonNumber,
  searchContext,
  searchText = "default",
}: SearchBottomModalProps) => {
  const router = useRouter();
  const { bottomModalSearchBuilding, setSearchBottomModalClose } =
    useSearchBottomModal();
  const buttonAvailable = buttonNumber !== undefined && buttonNumber >= 2;

  const data = {
    buildingName: bottomModalSearchBuilding,
    // 이 아로는 bulidingName을 이용해서 해당 건물의 정보를 가져올 수 있음
    availableTime: {
      start: "09:00",
      end: "18:00",
    },
    facilityList: [
      "알파라운지",
      "정수기",
      "자판기",
      "스터디룸",
      "캐럴",
      "카페",
      "연구실",
    ],
    bulidingPic:
      "https://assets.community.lomography.com/be/5540dbb5b3571ef8ecf8ebcc9ff3654bb3a866/1216x1216x2.jpg?auth=dfd8dedf54f05b4c42b9dffddcc5528080edfdec",
  };

  useEffect(() => {
    console.log(searchText, data.facilityList);
  }, [data.facilityList, searchText]);

  return (
    <div
      className={cn(
        buttonAvailable ? "h-[280px]" : "h-[320px]",
        "bottom-0 z-20 fixed bg-white max-w-[450px] w-full rounded-t-2xl"
      )}
    >
      <div className="flex flex-col justify-start">
        <div className="flex flex-row items-center justify-around mt-6">
          <div className="flex flex-col items-start justify-start">
            <span className="text-3xl text-[#1B1D1F] font-medium">
              {data.buildingName}
            </span>
            <div className="flex flex-row justify-start items-center mt-3">
              <span className="font-bold text-[#1B1D1F]">평일</span>
              <span className=" ml-4 text-[#1B1D1F]">
                {data.availableTime.start} ~ {data.availableTime.end}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center mt-1">
              <span className="font-bold text-[#1B1D1F]">주말</span>
              <span className=" ml-4 text-[#1B1D1F]">
                {data.availableTime.start} ~ {data.availableTime.end}
              </span>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-md overflow-hidden">
            <Image
              src={data.bulidingPic}
              sizes="(max-width: 600px) 100vw"
              fill
              className="object-contain"
              alt="Documents"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          {data.facilityList
            .sort((a, b) =>
              a.includes(searchText) && !b.includes(searchText) ? -1 : 1
            )
            .map((facility, index) => (
              <span
                key={index}
                className={
                  facility.includes(searchText) ? "text-main" : "text-[#1B1D1F]"
                }
              >
                {facility}
                {index < data.facilityList.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>

        <div className="flex flex-row items-center justify-evenly mt-8">
          <Button
            size="xlg"
            className={cn(
              "bg-[#FFE7EC] hover:bg-white hover:border-[1px] hover:border-main",
              !buttonAvailable && "w-full ml-8 mr-8"
            )}
            onClick={() => {
              if (searchContext) {
                router.push(
                  `/b?type=${searchType}&building=${data.buildingName}`
                );
              } else {
                router.push(`/b/detail?building=${data.buildingName}`);
              }
            }}
          >
            <span className="text-main text-lg font-semibold">
              상세정보 보기
            </span>
          </Button>
          {buttonAvailable && (
            <Button
              size="xlg"
              className="bg-white border-main border-[2px] hover:bg-[#FFE7EC]"
              onClick={() => {
                router.push(
                  `/floor?type=${searchType}&building=${data.buildingName}`
                );
              }}
            >
              <span className="text-main text-lg font-semibold">
                층별 안내도 보기
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBottomModal;
