import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { Soundtrack } from "@/components/SoundtrackComponents/Soundtrack";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";

export default function CampaignSoundtrack(){

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
                                    <Soundtrack title="CRIE A AMBIENTAÇÃO PERFEITA PARA A SUA HISTÓRIA!" 
                                                subtitle="Faça playlists de ambientação para diferentes momentos da sua campanha e deixe a experiência da sua história ainda mais imersiva" 
                                                campaign={campaign||''}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </Box>
        </Presence>
    )
}