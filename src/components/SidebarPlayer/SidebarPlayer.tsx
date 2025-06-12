
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react/button";
import { Separator } from "@chakra-ui/react/separator";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Izinho } from "../Izinho/Izinho";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";


export interface SidebarPlayerProps {
    campaign: string; //depois mudar pra Campaign
}

export const SidebarPlayer = ({
    campaign,
}: SidebarPlayerProps) => {
    const navigate = useNavigate();
    
    return(
        <div className="flex col-span-2">
            <div className="w-11/12 overflow-x-hidden">
                <Button onClick={()=>navigate("/campaign")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Campanha</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/system")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Sistema</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/sheet")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Ficha</Button>
                <br></br>
                <Button onClick={()=>navigate("/campaign/archive")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Arquivo</Button>
                <br></br>
                <Button onClick={()=>navigate("/home")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}><LuCornerDownLeft /></Button>
                <Flex flexDir={"column"} h={"52vh"} justifyContent={"end"}>
                    <Flex gap={2}>
                        <ToggleTheme/>
                        <Izinho/>
                    </Flex>
                </Flex>
            </div>
            <div className="w-1/12">
                <Separator h={"80vh"} orientation={"vertical"}></Separator>
            </div>
        </div>
    )
}