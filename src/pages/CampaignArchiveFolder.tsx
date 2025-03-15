import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {IconButton, Text} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { ArchiveFolderGM } from "@/components/ArchiveComponents/ArchiveFolderGM";
import { ArchiveFolderPlayer } from "@/components/ArchiveComponents/ArchiveFolderPlayer";
import { getUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export default function CampaignArchiveFolder(){
    
    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'');
    console.log(campaign);

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
    const isGameMaster = sessionStorage.getItem('isGameMaster');
    
    //const [isGameMaster,setIsGameMaster] = useState((user?.id === parseInt(campaign.id_mestre)));
    
    const folder = JSON.parse(sessionStorage.getItem('pastaAtual')||'');

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

                {isGameMaster === "true" ? //mostre a visão do mestre
                    <div>
                        <CampaignHeader/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <ArchiveFolderGM folder={folder} campaign={campaign.id}/>
                                </div>
                                
                                {
                            /*
                            <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsGameMaster(!isGameMaster)} variant="outline" size="sm">
                                {<LuArrowRightLeft />}
                            </IconButton>
                            */
                        }
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
                                <CampaignHeaderPlayer/>
                                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                                    <div className="col-span-2 sticky">
                                        <SidebarPlayer campaign=""></SidebarPlayer>
                                    </div>
                                    <div className="col-span-9">
                                        <ArchiveFolderPlayer folder={folder} campaign={campaign.id}/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        {
                            /*
                            <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsGameMaster(!isGameMaster)} variant="outline" size="sm">
                                {<LuArrowRightLeft />}
                            </IconButton>
                            */
                        }
                        <ToggleThemeXL/>
                    </div>
                }
            </Box>
        </Presence>
    )
}