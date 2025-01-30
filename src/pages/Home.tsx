/*
import { useState } from "react";
import { useUserStore } from "../stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
*/

import { CampaignCard } from "@/components/CampaignCard/CampaignCard";
import { Avatar } from "@/components/ui/avatar";
import { useColorMode } from "@/components/ui/color-mode";
import { DialogCloseTrigger, DialogRoot } from "@/components/ui/dialog";
import { ClientOnly, Skeleton, IconButton, Separator, Button, Presence, Dialog, DialogContent, DialogTrigger, DialogBody } from "@chakra-ui/react";
import { Box} from "@chakra-ui/react/box";
import { CardBody, CardRoot, CardTitle } from "@chakra-ui/react/card";
import { LuSun, LuMoon, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    /*
    const user = useUserStore((state) => useState(false));

    const {data} = useQuery({
        queryKey: ["userCreatedCampaigns"]
        
    })
    */

    const { toggleColorMode, colorMode } = useColorMode()
    const username = 'User'
    const campanhaInserida = false;

    function logout(){
        navigate("/grimoire/");
      }

      function showUserSettings(){
        alert('user settings')
      }

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slow"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

                <div className="header margin-sides flex place-content-between items-center" >
                    <span className="header-title agreloy">{username}'s Grimoire</span>
                    <div className="grid grid-cols-2 gap-x-4">
                        <Avatar className="cursor-pointer" onClick={()=>showUserSettings()} size={"lg"} name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

                        <ClientOnly fallback={<Skeleton boxSize="8" />}>
                            <IconButton onClick={()=>logout()} variant="ghost" size="lg">
                                {<LuLogOut />}
                            </IconButton>
                        </ClientOnly>
                    </div>
                </div>
                <Separator></Separator>
                <div className="place-content-around grid grid-cols-3 gap-x-8 content-spacing">
                        <CardRoot className="h-[75vh]" overflowY={"scroll"}>
                            <CardBody>
                                <CardTitle className="text-center padding-bottom">SUAS CAMPANHAS</CardTitle>
                                <Separator></Separator>
                                <CampaignCard></CampaignCard> {/*depois mudar pra ser uma lista de CampaignCard*/}
                                <CampaignCard></CampaignCard> {/*depois mudar pra ser uma lista de CampaignCard*/}
                                <CampaignCard></CampaignCard> {/*depois mudar pra ser uma lista de CampaignCard*/}
                            </CardBody>
                        </CardRoot>
                        <CardRoot className="h-[75vh]" overflowY={"scroll"}>
                            <CardBody>
                                <CardTitle className="text-center padding-bottom">SUAS AVENTURAS</CardTitle>
                                <Separator></Separator>
                                <CampaignCard></CampaignCard> {/*depois mudar pra ser uma lista de CampaignCard*/}
                            </CardBody>
                        </CardRoot>
                        <div>
                            <div className="h-[15vh] place-content-between content-start grid grid-cols-2 gap-y-2 gap-x-4">
                                
                                <Button>CRIAR UMA CAMPANHA</Button>
                                <Button>CRIAR UM SISTEMA</Button>
                                <Button>ENTRAR EM UMA CAMPANHA</Button>
                                <Button>PESQUISAR SISTEMAS</Button>
                            </div>

                            <CardRoot overflowY={"scroll"} className="w-full h-[35vh]">
                                <CardBody>
                                    <CardTitle className="text-center padding-bottom">SEUS PERSONAGENS</CardTitle>
                                    <Separator></Separator>
                                </CardBody>
                            </CardRoot>
                        </div>
                </div>
                <div className="text-right right-bottom">
                        
                    <ClientOnly fallback={<Skeleton boxSize="8" />}>
                    <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                        {colorMode === "light" ? <LuSun /> : <LuMoon />}
                    </IconButton>
                    </ClientOnly>
                    
                </div>
            </Box>
        </Presence>
    )
}