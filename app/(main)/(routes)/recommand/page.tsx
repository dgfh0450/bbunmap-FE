"use client";

import { useEffect, useState } from "react";
import SelectedButton from "../../_components/recommand-button/selected";
import { useTabBarStore } from "@/hooks/useTabBar";
import { useSpaceBarStore } from "@/hooks/useRecommandButton";
import TitleImage from "../../_components/title-image";

type RecommandAnchor = "move" | "place";

const Recommand = () => {
  const { setTab } = useTabBarStore();
  const { currentSpace, setSpace } = useSpaceBarStore();

  useEffect(() => {
    setTab("recommand");
  }, [setTab]);

  const data = {
    route: [
      {
        title: "문캠 실내 루트",
        imageSrc: "/sample1.jpg",
      },
    ],
    place: [
      {
        title: "문캠 실내 공간",
        imageSrc: "/sample1.jpg",
      },
    ],
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-row justify-start items-center mt-6">
        <SelectedButton
          title="이동 꿀팁"
          selected={currentSpace === "move"}
          className="ml-6"
          onclick={() => setSpace("move")}
        />

        <SelectedButton
          title="공간 추천"
          selected={currentSpace === "place"}
          className="ml-6"
          onclick={() => {
            setSpace("place");
          }}
        />
      </div>
      {currentSpace === "move" &&
        data.route.map((value, index) => {
          return (
            <TitleImage
              key={index}
              title={value.title}
              imageSrc={value.imageSrc}
            />
          );
        })}
      {currentSpace === "place" &&
        data.place.map((value, index) => {
          return (
            <TitleImage
              key={index}
              title={value.title}
              imageSrc={value.imageSrc}
            />
          );
        })}
    </div>
  );
};

export default Recommand;
