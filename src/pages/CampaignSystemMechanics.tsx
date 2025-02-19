import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { CampaignPageGM } from "@/components/CampaignPage/CampaignPageGM";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { SystemPageMechanicsComponent } from "@/components/SystemComponents/SystemPageMechanicsComponent";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";

export default function CampaignSystemMechanics(){


    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} maxH={"100vh"} overflowY={"hidden"}>
                    <div>
                        <CampaignHeader  campaign="minha campanha"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM campaign=""></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <SystemPageMechanicsComponent   title="COMO SE JOGA A SUA HISTÓRIA?" 
                                        subtitle="Crie ou modifique mecânicas para diferentes situações que os jogadores podem vir a enfrentar." 
                                        system={"meu sistema"}
                                        maxHeight="66vh"
                                        />
                                </div>
                                <ToggleTheme/>
                            </div>
                        </div>
                    </div>
            </Box>
        </Presence>
    )
}