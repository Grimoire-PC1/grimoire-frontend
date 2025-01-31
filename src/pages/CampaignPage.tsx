import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { CampaignPageGM } from "@/components/CampaignPage/CampaignPageGM";
import { CampaignPagePlayer } from "@/components/CampaignPage/CampaignPagePlayer";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";

export default function CampaignPage(){

    const isGameMaster = true; //depois mudar pra uma verificação com o id do mestre e o id do usuario

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slow"
        >
            <Box className="overflow-y-hidden" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

                {isGameMaster ? //mostre a visão do mestre
                    <div>
                        <CampaignHeader  campaign="minha campanha"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2">
                                <SidebarGM campaign=""></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <CampaignPageGM user={'meu nome'} campaign={'minha campanha'}></CampaignPageGM>
                                <ToggleTheme/>
                            </div>
                        </div>
                    </div>
                    
                    :           //mostre a visão do jogador
                    
                    <div>
                        <CampaignPagePlayer user={''} campaign={''}></CampaignPagePlayer>
                    </div>
                }
            </Box>
        </Presence>
    )
}