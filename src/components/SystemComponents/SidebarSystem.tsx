
import { Button } from "@chakra-ui/react/button";
import { Separator } from "@chakra-ui/react/separator";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export interface SidebarSystemProps {
    system: string;
}

export const SidebarSystem = ({
    system,
}: SidebarSystemProps) => {
    const navigate = useNavigate();
    
    return(
        <div className="flex col-span-2">
            <div className="margin-top w-11/12 overflow-x-hidden">
                <Button onClick={()=>navigate("/grimoire/system")} mt={"2%"} mb={"2%"} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Sistema</Button>
                <br></br>
                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Regras</Button>
                <br></br>
                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Ficha</Button>
                <br></br>
                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Mecânicas</Button>
                <br></br>
                <Button onClick={()=>navigate("/grimoire/home")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}><LuCornerDownLeft /></Button>
            </div>
            <div className="w-1/12">
                <Separator h={"80vh"} orientation={"vertical"}></Separator>
            </div>
        </div>
    )
}