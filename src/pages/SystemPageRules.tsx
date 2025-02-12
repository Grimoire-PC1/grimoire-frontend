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

export default function SystemPageRules(){

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
                                    <SystemPageRulesComponent   title="COMO SEU SISTEMA CONTA UMA HISTÓRIA?" 
                                                                subtitle="Adicione regras para situar o mestre e os jogadores de como utilizar seu sistema" 
                                                                system={"meu sistema"}
                                                                maxHeight="66vh"
                                                                />
                                                                :
                                    <SystemPageRulesNoEditComponent   title="DESCUBRA COMO ESTE SISTEMA CONTA UMA HISTÓRIA" 
                                                                system={"sistema de outra pessoa"}
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