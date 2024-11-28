import TabBar from "../../../_components/tab-bar/tab-bar";
import TopLinkBar from "../../../_components/top-tab-bar/top-link-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-[450px] h-full py-[15px] relative flex flex-col justify-start mb-[68px]" >
            <div className="w-full px-[15px] pl-[22px] mt-14">
                <h1 className="text-[24px] font-bold">실시간</h1>
            </div>

            <div className="w-auto flex flex-row justify-start items-center mt-3 ml-5">
                <TopLinkBar />
            </div>

            {children}

            <TabBar />
        </div >
    );
}
