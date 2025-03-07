import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { Journal } from "@/components/JournalComponents/Journal";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";

export default function CampaignJournal(){

    const campaign = sessionStorage.getItem('currentCampaignId');


    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} maxH={"100vh"} overflowY={"hidden"}>
                    <div>
                        <CampaignHeader/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <Journal campaign={campaign||''}/>
                                </div>
                                <ToggleTheme/>
                            </div>
                        </div>
                    </div>
            </Box>
        </Presence>
    )
}