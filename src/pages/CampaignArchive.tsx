import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {Image} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { useState } from "react";
import { ArchiveGM } from "@/components/ArchiveComponents/ArchiveGM";
import { ArchivePlayer } from "@/components/ArchiveComponents/ArchivePlayer";

export default function CampaignArchive(){
    const campaign = JSON.parse(sessionStorage.getItem('currentCampaign')||'{}');

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
                                    <ArchiveGM campaign={campaign.id}/>
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
                            <Box border="none" outline={"none"} m="0" p="0" w={"full"} h={"100vh"} className="grid content-center text-center gradiente">
                                <Image src={img} w={"100vw"} h={"113vh"} />
                                </Box>
                            <div className="h-[100vh]">
                                <CampaignHeaderPlayer/>
                                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                                    <div className="col-span-2 sticky">
                                        <SidebarPlayer campaign=""></SidebarPlayer>
                                    </div>
                                    <div className="col-span-9">
                                            <ArchivePlayer campaign={campaign.id}/>
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