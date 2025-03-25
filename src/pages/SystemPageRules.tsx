import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import { SystemHeader } from "@/components/SystemComponents/SystemHeader";
import { SidebarSystem } from "@/components/SystemComponents/SidebarSystem";
import { SystemPageRulesComponent } from "@/components/SystemComponents/SystemPageRulesComponent";
import { IconButton } from "@chakra-ui/react";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { SystemPageRulesNoEditComponent } from "@/components/SystemNoEditComponents/SystemPageRulesNoEditComponent";
import { System, User } from "@/interfaces/Models";

export default function SystemPageRules(){

    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'{}');
    const user: User = JSON.parse(sessionStorage.getItem("userObject")||'{}');
    
    const [isOwner, setIsOwner] = useState(true);

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} maxH={"100vh"} overflowY={"hidden"} >
                    <div>
                        <SystemHeader/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarSystem></SidebarSystem>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    {
                                        system.id_criador == user?.id ?
                                    <SystemPageRulesComponent   title="COMO SEU SISTEMA CONTA UMA HISTÓRIA?" 
                                                                subtitle="Adicione regras para situar o mestre e os jogadores de como utilizar seu sistema" 
                                                                system={String(system.id)}
                                                                maxHeight="66vh"
                                                                />
                                                                :
                                    <SystemPageRulesNoEditComponent   title="DESCUBRA COMO ESTE SISTEMA CONTA UMA HISTÓRIA" 
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
        </Presence>
    )
}