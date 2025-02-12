import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {Button, Flex, IconButton, Text} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { CampaignSystemPageGM } from "@/components/CampaignSystemPage/CampaignSystemPageGM";
import { CampaignSystemPagePlayer } from "@/components/CampaignSystemPage/CampaignSystemPagePlayer";
import { SystemPageComponent } from "@/components/SystemComponents/SystemPageComponent";
import { SystemPageRulesComponent } from "@/components/SystemComponents/SystemPageRulesComponent";
import { DialogLg } from "@/components/Dialog/DialogLg";
import { SystemPageSheetComponent } from "@/components/SystemComponents/SystemPageSheetComponent";

export default function CampaignSystemSheet(){

    const system = "meu sistema";
    const campaign = "minha campanha";
    const [openDialogLg, setOpenDialogLg] = useState(false)
    const [isGameMaster,setIsGameMaster] = useState(true); //depois mudar pra uma verificação com o id do mestre e o id do usuario

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}  maxH={"100vh"} overflowY={"hidden"} >

                {isGameMaster ?
                    <div>
                        <CampaignHeader  campaign="minha campanha"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM campaign=""></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    {
                                        system == "" ?
                                        <div className="margin-right">
                                            <Text className="subtitle-s">ESCOLHA OU CRIE UM SISTEMA PARA {campaign.toUpperCase()} PRIMEIRO!</Text>
                                            <Text className="text">A ficha de um personagem deve estar de acordo com as regras do seu sistema. Antes de pensar no modelo da ficha, crie ou escolha um sistema.</Text>         
                                        </div>
                                        :
                                        <SystemPageSheetComponent   title="CRIE PERSONAGENS ÚNICOS!" 
                                                                    subtitle="Crie ou modifique um modelo de ficha para dar vida aos personagens dentro da sua história" 
                                                                    system={"meu sistema"}/>
                                    }
                                </div>
                                
                                <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsGameMaster(!isGameMaster)} variant="outline" size="sm">
                                    {<LuArrowRightLeft />}
                                </IconButton>
                                <ToggleTheme/>
                            </div>
                        </div>
                    </div>
                    
                    :           //mostre a visão do jogador
                    
                    <div>
                        <div>
                            <Box border="none" outline={"none"} m="0" p="0" w={"full"} h={"100vh"} className="grid content-center text-center bg-linear-to-b from-purple-900 to-transparent">
                                {/* na box vai ser a imagem da campanha */}
                                <Text p={"12"} className="title agreloy" lineClamp={1} lineHeight={"taller"}>campanha muito legal dos meus amigos</Text>
                            </Box>
                            <div className="h-[100vh]">
                                <CampaignHeaderPlayer  campaign="campanha muito legal dos meus amigos"/>
                                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                                    <div className="col-span-2 sticky">
                                        <SidebarPlayer campaign=""></SidebarPlayer>
                                    </div>
                                    <div className="col-span-9">
                                        <div className="h-[80vh]">
                                            <CampaignSystemPagePlayer user={'Usuario de teste'} campaign={'campanha muito legal dos meus amigos'}></CampaignSystemPagePlayer>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsGameMaster(!isGameMaster)} variant="outline" size="sm">
                            {<LuArrowRightLeft />}
                        </IconButton>
                        <ToggleThemeXL/>
                    </div>
                }
            </Box>
        </Presence>
    )
}