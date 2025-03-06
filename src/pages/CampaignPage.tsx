import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { CampaignPageGM } from "@/components/CampaignPage/CampaignPageGM";
import { CampaignPagePlayer } from "@/components/CampaignPage/CampaignPagePlayer";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {IconButton, Image, Text} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { useUserStore } from "@/stores/user/user.store";
import { Campaign } from "@/interfaces/Models";

export default function CampaignPage(){

    const [isGameMaster,setIsGameMaster] = useState(true); //depois mudar pra uma verificação com o id do mestre e o id do usuario

    const curCampaign = sessionStorage.getItem('currentCampaignId');

    const allCreatedCampaign = useUserStore.getState().createdCampaigns;
    let campaignInformation: Campaign = allCreatedCampaign[0];
    console.log(allCreatedCampaign)

    for(let i = 0; i < allCreatedCampaign.length; i++) {
        if(allCreatedCampaign[i].id == sessionStorage.getItem('currentCampaignId')) {
            campaignInformation = allCreatedCampaign[i];
            console.log(campaignInformation)
            sessionStorage.setItem('currentCampaign',JSON.stringify(campaignInformation))
            break
        } 
    }

    const [img,setImg] = useState("")
    
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${campaignInformation?.foto_url}`, {
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
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

                {isGameMaster ? //mostre a visão do mestre
                    <div>
                        <CampaignHeader/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <CampaignPageGM></CampaignPageGM>
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
                                <CampaignHeaderPlayer  campaign="campanha muito legal dos meus amigos"/>
                                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                                    <div className="col-span-2 sticky">
                                        <SidebarPlayer campaign=""></SidebarPlayer>
                                    </div>
                                    <div className="col-span-9">
                                        <div className="h-[80vh]">
                                            <CampaignPagePlayer user={'Usuario de teste'} campaign={campaignInformation}></CampaignPagePlayer>
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