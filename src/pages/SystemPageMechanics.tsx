import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import { SystemHeader } from "@/components/SystemComponents/SystemHeader";
import { SidebarSystem } from "@/components/SystemComponents/SidebarSystem";
import { LuArrowRightLeft } from "react-icons/lu";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { SystemPageMechanicsComponent } from "@/components/SystemComponents/SystemPageMechanicsComponent";
import { SystemPageMechanicsNoEditComponent } from "@/components/SystemNoEditComponents/SystemPageMechanicsNoEditComponent";
import { System } from "@/interfaces/Models";

export default function SystemPageMechanics(){

    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'');
    
    const [isOwner, setIsOwner] = useState(true);
    
    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} maxH={"100vh"} overflowY={"hidden"} >
                    <div>
                        <SystemHeader  system="meu sistema"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarSystem system=""></SidebarSystem>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    {
                                        isOwner ?
                                    <SystemPageMechanicsComponent   title="COMO JOGAR USANDO SEU SISTEMA?" 
                                                                subtitle="Crie mecânicas únicas e personalizadas para diferentes situações que os jogadores podem vir a enfrentar." 
                                                                system={String(system.id)}
                                                                maxHeight="66vh"
                                                                />
                                                                :
                                    <SystemPageMechanicsNoEditComponent   title="TENHA TOTAL CONTROLE SOBRE AS MECÂNICAS DO SISTEMA" 
                                                                system={String(system.id)}
                                                                maxHeight="70vh"
                                                                /> 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </Box>
            <ToggleTheme/>
                                                        
            <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsOwner(!isOwner)} variant="outline" size="sm">
                {<LuArrowRightLeft />}
            </IconButton>
        </Presence>
    )
}