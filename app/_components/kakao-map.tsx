"use client";

import { useBottomSheetStore } from "@/hooks/useBottomSheetAppearance";
import { useSearchBottomModal } from "@/hooks/useSearchBottomModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export interface LatLng {
    lat: number;
    lon: number;
}

export interface BuildingInfo extends LatLng {
    name?: string;
}

export interface BuildingFacilityInfo extends BuildingInfo {
    facilityNumber?: number;
}

interface KakaoMapProps {
    markers?: BuildingFacilityInfo[];
    markersImage?: string;
    markerModalEvent?: boolean;
    bulidingInfoEvent?: boolean;
    bottomSheetEvent?: boolean;
    markerCurious?: boolean;
}

const KakaoMap = ({
    markers,
    markerModalEvent,
    bulidingInfoEvent,
    bottomSheetEvent,
    markerCurious,
}: KakaoMapProps) => {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.58379268032499, lng: 127.02954409489267 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: true,
        level: 4,
    });
    const {
        setSearchBottomModalOpen,
        setBottomModalSearchBuilding,
        isSearchBottomModalOpen,
        setSearchBottomModalClose,
        bottomModalSearchBuilding,
    } = useSearchBottomModal();
    const {
        isBottomSheetVisible,
        toggleBottomSheet,
        closeBottomSheet,
        openBottomSheet,
    } = useBottomSheetStore(); // Zustand store 사용

    const router = useRouter();
    const [markerImage, setMarkerImage] = useState<string>("/icons/tooltip.svg");
    const [markerWH, setMarkerWH] = useState({ width: 130, height: 74 });
    const params = useSearchParams();
    const queryClient = useQueryClient();

    const moveToBuilding = (buildingName: string) => {
        const locations = queryClient.getQueryData<BuildingInfo[]>(['buildingLocation'])
        if (locations) {
            const target = locations.find((building) => building.name === buildingName);
            console.log(target)
            if (target) {
                setState({ level: 4, isPanto: true, center: { lat: target.lat, lng: target.lon } })
            }
        }
    }

    useEffect(() => {
        const buildingName = params.get('buildingName')
        if (buildingName) {
            moveToBuilding(buildingName);
            closeBottomSheet();
            setBottomModalSearchBuilding(buildingName);
        }
        console.log('params ----------------> ', buildingName);
    }, [params])

    useEffect(() => {
        const isFirstVisit = !Cookies.get("visited");
        const delay = isFirstVisit ? 5000 : 2000;
        console.log("first? ", isFirstVisit);

        const timer = setTimeout(() => {
            setMarkerImage("/pin-copy.png");
            setMarkerWH({ width: 25, height: 35 });
        }, delay);

        Cookies.set("visited", "true", { expires: 1 / 24 });

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Map
                center={state.center}
                isPanto={state.isPanto}
                style={{ width: "100%", height: "100%" }}
                level={state.level}
            // onIdle={() => {
            //   if (!isBottomSheetVisible) {
            //     toggleBottomSheet();
            //     setSearchBottomModalClose();
            //   }
            // }}
            >
                {markers?.map((item, index) => (
                    <MapMarker
                        key={index}
                        image={{
                            src: !markerCurious ? "/pin-copy.png" : markerImage,
                            // typeof item.facilityNumber !== "undefined"
                            //   ? item.facilityNumber >= 0 && item.facilityNumber <= 5
                            //     ? `./result-pin/result-pin-${item.facilityNumber}.png`
                            //     : `./result-pin/result-pin-5+.png`
                            //   : `./black-pin.png`,
                            size: !markerCurious ? { width: 25, height: 35 } : markerWH,
                        }}
                        position={{ lat: item.lat, lng: item.lon }}
                        onClick={() => {
                            setState({
                                center: { lat: item.lat, lng: item.lon },
                                level: 4,
                                isPanto: true,
                            });
                            if (params.get('buildingName')) {
                                router.push('/home');
                            }
                            if (markerModalEvent || bottomSheetEvent) {
                                if (
                                    isSearchBottomModalOpen &&
                                    item.name === bottomModalSearchBuilding
                                ) {
                                    setSearchBottomModalClose();
                                    setBottomModalSearchBuilding("");
                                    if (bottomSheetEvent) {
                                        openBottomSheet();
                                    }
                                } else if (
                                    isSearchBottomModalOpen &&
                                    item.name !== bottomModalSearchBuilding
                                ) {
                                    setBottomModalSearchBuilding(item.name!);
                                    setSearchBottomModalOpen();
                                    if (bottomSheetEvent) {
                                        closeBottomSheet();
                                    }
                                } else {
                                    setSearchBottomModalOpen();
                                    setBottomModalSearchBuilding(item.name!);
                                    if (bottomSheetEvent) {
                                        closeBottomSheet();
                                    }
                                }
                            }
                        }}
                    />
                ))}
            </Map>
        </>
    );
};

export default KakaoMap;
