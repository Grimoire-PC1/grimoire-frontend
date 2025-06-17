
import { Button } from "@chakra-ui/react/button";
import { Separator } from "@chakra-ui/react/separator";
import { useState } from "react";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { DialogCampaignCode } from "../Dialog/DialogCampaignCode";
import { Flex } from "@chakra-ui/react";
import { Izinho } from "../Izinho/Izinho";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";


export interface SidebarGMProps {
    campaign: string; //depois mudar pra Campaign
}

export const SidebarGM = () => {
    const navigate = useNavigate();
    const [getId,setGetId] = useState(false);
    
    return(
        <div className="flex col-span-2">
            <div className="w-11/12 overflow-x-hidden">
                <Button onClick={()=>navigate("/campaign")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Campanha</Button>
                <br></br>
                <Button onClick={()=>setGetId(true)} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Compartilhar</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/system")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Sistema</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/sheet")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Ficha</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/mechanics")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Mecânicas</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/journal")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Diário</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/archive")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Arquivo</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/soundtrack")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Trilha Sonora</Button>
                <br></br>
                <Button onClick={()=>navigate("/home")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}><LuCornerDownLeft /></Button>
                <Flex flexDir={"column"} justifyContent={"end"} h={"30vh"}>
                    <Flex gap={2}>
                        <ToggleTheme/>
                        <Izinho/>
                    </Flex>
                </Flex>
            </div>
            <div className="w-1/12">
                <Separator h={"full"} orientation={"vertical"}></Separator>
            </div>

            <DialogCampaignCode handleClose={setGetId} open={getId} />
        </div>
    )
}