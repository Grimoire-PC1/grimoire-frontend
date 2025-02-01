
import { Button } from "@chakra-ui/react/button";
import { Separator } from "@chakra-ui/react/separator";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export interface SidebarPlayerProps {
    campaign: string; //depois mudar pra Campaign
}

export const SidebarPlayer = ({
    campaign,
}: SidebarPlayerProps) => {
    const navigate = useNavigate();
    
    return(
        <div className="flex col-span-2">
            <div className="margin-top w-11/12 overflow-x-hidden">
                <Button mt={"2%"} mb={"2%"} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Campanha</Button>
                <br></br>
                <Button disabled textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Sistema</Button>
                <br></br>
                <Button disabled textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Ficha</Button>
                <br></br>
                <Button disabled textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Mecânicas</Button>
                <br></br>
                <Button disabled textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Arquivo</Button>
                <br></br>
                <Button onClick={()=>navigate("/grimoire/home")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}><LuCornerDownLeft /></Button>
            </div>
            <div className="w-1/12">
                <Separator h={"80vh"} orientation={"vertical"}></Separator>
            </div>
        </div>
    )
}