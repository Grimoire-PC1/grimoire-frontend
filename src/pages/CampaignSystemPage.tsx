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

export default function CampaignSystemPage(){

    const system = "";
    const campaign = "minha campanha";
    const [openDialogLg, setOpenDialogLg] = useState(false)
    const [isGameMaster,setIsGameMaster] = useState(true); //depois mudar pra uma verificação com o id do mestre e o id do usuario

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

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
                                            <Flex placeContent={"space-between"}>
                                                <div>
                                                    <Text className="subtitle-s">COMO SE JOGA {campaign.toUpperCase()}?</Text>
                                                    <Text className="text">Selecione um dos seus sistemas ou pesquise sistemas disponíveis no Grimoire para contar sua história</Text>         
                                                </div>
                                                <Button onClick={()=> setOpenDialogLg(true)} mt={4}>Escolher sistema</Button>
                                            </Flex>
                                        </div>
                                        :
                                        <div className="margin-right">
                                            <Flex placeContent={"space-between"}>
                                                <div>
                                                    <Text className="subtitle-s">{campaign.toUpperCase()} SE JOGA COM {system.toUpperCase()}!</Text>
                                                    <Text className="text">Meu sistema é muito legal e essa é a descrição dele {/* depois mudar isso pra descrição do sistema */}</Text>         
                                                </div>
                                            </Flex>
                                        </div>
                                    }
                                    <DialogLg title="Defina as leis do seu universo" description="Comece sua nova história com um dos sistemas que você já cadastrou no seu Grimoire, ou procure por sistemas criados pela comunidade!" open={openDialogLg} handleClose={setOpenDialogLg} systems={[]}></DialogLg> {/* depois mudar pra pegar os sistemas do usuario + os sistemas publicos */}
                                    <Box mt={8}>
                                        <SystemPageRulesComponent   title="REGRAS DO SISTEMA" 
                                                                    subtitle="Adicione ou modifique regras para situar os jogadores de como o sistema funciona" 
                                                                    system={""}/>
                                    </Box>
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