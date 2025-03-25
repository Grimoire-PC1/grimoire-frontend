import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import { SystemHeader } from "@/components/SystemComponents/SystemHeader";
import { SidebarSystem } from "@/components/SystemComponents/SidebarSystem";
import { SystemPageSheetComponent } from "@/components/SystemComponents/SystemPageSheetComponent";
import { IconButton } from "@chakra-ui/react";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { SystemPageSheetNoEditComponent } from "@/components/SystemNoEditComponents/SystemPageSheetNoEditComponent";
import { System, User } from "@/interfaces/Models";

export default function SystemPageSheet(){
 
    const [isOwner, setIsOwner] = useState(true);

    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'{}');
    const user: User = JSON.parse(sessionStorage.getItem("userObject")||'{}');

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}  maxH={"100vh"} overflowY={"hidden"} >
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
                                    <SystemPageSheetComponent   title="COMO SEUS JOGADORES PODEM CONSTRUIR PERSONAGENS ÚNICOS?" 
                                                                subtitle="Crie um modelo de ficha para dar vida aos personagens dentro do seu sistema" 
                                                                system={system}/>

                                                                :
                                                                
                                    <SystemPageSheetNoEditComponent   title="DESCUBRA COMO CRIAR PERSONAGENS ÚNICOS"
                                                                system={system}/>                                    
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