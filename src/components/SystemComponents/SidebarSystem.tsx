import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react/button";
import { Separator } from "@chakra-ui/react/separator";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";
import { Izinho } from "../Izinho/Izinho";
import { Izinho4 } from "../Izinho/Izinho4";
import { systemSideBarText } from "../Izinho/izinhoText";

export const SidebarSystem = () => {
    const navigate = useNavigate();
    
    return(
        <div className="flex col-span-2">
            <div className="w-11/12 overflow-x-hidden">
                <Button onClick={()=>navigate("/system")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Sistema</Button>
                <br></br>
                <Button onClick={()=>navigate("/system/rules")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Regras</Button>
                <br></br>
                <Button onClick={()=>navigate("/system/sheet")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Ficha</Button>
                <br></br>
                <Button onClick={()=>navigate("/system/mechanics")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Mecânicas</Button>
                <br></br>
                <Button onClick={()=>navigate("/home")} textAlign={"left"} fontSize={"18px"} variant={"ghost"}><LuCornerDownLeft /></Button>
                <Flex flexDir={"column"} h={"50vh"} justifyContent={"end"}>
                    <Flex gap={2}>
                        <ToggleTheme/>
                        <Izinho4 texto={systemSideBarText.text1} texto2={systemSideBarText.text2} texto3={systemSideBarText.text3} texto4={systemSideBarText.text4}/>
                    </Flex>
                </Flex>
            </div>
            <div className="w-1/12">
                <Separator h={"80vh"} orientation={"vertical"}></Separator>
            </div>
        </div>
    )
}