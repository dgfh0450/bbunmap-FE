"use client";

import { Button } from "@/components/ui/button";
import { useTabBarStore } from "@/hooks/useTabBar";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import OnAirPlaceCard from "../../_components/onair-place/onair-place-card";
import { useOnAirModal } from "@/hooks/useOnAirModal";
import OnAirPlaceModal from "../../_components/onair-place/onair-place-modal";
import { useStoreLoginState } from "@/hooks/useStoreLoginState";
import Request from "@/lib/fetch";
import { TypesOnAirPlace } from "./onAir";
import { useSession } from "next-auth/react";
import SelectedButton from "../../_components/recommand-button/selected";
import TopLinkBar from "../../_components/top-tab-bar/top-link-bar";




const OnAir = () => {

    return (

        <div className="w-full flex-1  px-[15px] overflow-y-scroll scrollbar-hide">
        </div>
    );
};

export default OnAir;