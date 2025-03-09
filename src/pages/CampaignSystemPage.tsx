import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {IconButton, Text,Image} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { SystemPageRulesComponent } from "@/components/SystemComponents/SystemPageRulesComponent";
import { DialogLg } from "@/components/Dialog/DialogLg";
import { SystemPageRulesNoEditComponent } from "@/components/SystemNoEditComponents/SystemPageRulesNoEditComponent";
import { useUserStore } from "@/stores/user/user.store";
import { Campaign } from "@/interfaces/Models";

export default function CampaignSystemPage(){

    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'');

    const [openDialogLg, setOpenDialogLg] = useState(false)
    const [isGameMaster,setIsGameMaster] = useState(true); //depois mudar pra uma verificação com o id do mestre e o id do usuario

    const [img,setImg] = useState("")
    
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${campaign.id_foto}`, {
            method:"GET",
            headers: {
                "content-type" : "application/json"
            }
            })
            const data = await res.json()
            setImg(data.image)
            console.log(data)
    }

    if(!img || img == "") {
        getImage()
    }

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}>

                {isGameMaster ?
                    <div className="max-h-[100vh] overflow-y-hidden">
                        <CampaignHeader/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div className="grid h-[85vh] grid-cols-1 content-between">
                                    <DialogLg title="Defina as leis do seu universo" description="Comece sua nova história com um dos sistemas que você já cadastrou no seu Grimoire, ou procure por sistemas criados pela comunidade!" open={openDialogLg} handleClose={setOpenDialogLg} systems={[]}></DialogLg> {/* depois mudar pra pegar os sistemas do usuario + os sistemas publicos */}
                                    <Box mt={6}>
                                        <SystemPageRulesComponent   title="REGRAS DO SISTEMA" 
                                                                    subtitle="Adicione ou modifique regras para situar os jogadores de como o sistema funciona" 
                                                                    system={String(campaign.id_sistema)}
                                                                    maxHeight="64.3vh"
                                                                    />
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
                            <Box border="none" outline={"none"} m="0" p="0" w={"full"} h={"100vh"} className="grid content-center text-center gradiente">
                                <Image src={img} w={"100vw"} h={"113vh"} />
                                <Text p={"12"} className="title agreloy" lineClamp={1} lineHeight={"taller"}>campanha muito legal dos meus amigos</Text>
                            </Box>
                            <div className="h-[100vh]">
                                <CampaignHeaderPlayer/>
                                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                                    <div className="col-span-2 sticky">
                                        <SidebarPlayer campaign=""></SidebarPlayer>
                                    </div>
                                    <div className="col-span-9">
                                        <div className="h-[80vh]">
                                                <SystemPageRulesNoEditComponent   
                                                                            title="REGRAS DO SISTEMA"
                                                                            subtitle={"Explore as regras que "+campaign.titulo+" utiliza para contar sua história!"}
                                                                            system={""}
                                                                            maxHeight="67vh"
                                                                            />
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