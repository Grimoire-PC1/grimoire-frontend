import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import { SystemHeader } from "@/components/SystemComponents/SystemHeader";
import { SidebarSystem } from "@/components/SystemComponents/SidebarSystem";
import { SystemPageComponent } from "@/components/SystemComponents/SystemPageComponent";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { LuArrowRightLeft } from "react-icons/lu";
import { SystemPageNoEditComponent } from "@/components/SystemNoEditComponents/SystemPageNoEditComponent";
import { System, User } from "@/interfaces/Models";

export default function SystemPage(){

    const [isOwner, setIsOwner] = useState(true);

    const user: User = JSON.parse(sessionStorage.getItem("userObject")||'{}')
    console.log(user)

    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'{}');

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

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
                                        <SystemPageComponent/>
                                        :
                                        <SystemPageNoEditComponent/>

                                    }
                                </div>
                                <ToggleTheme/>
                                
                                <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsOwner(!isOwner)} variant="outline" size="sm">
                                    {<LuArrowRightLeft />}
                                </IconButton>
                            </div>
                        </div>
                    </div>
            </Box>
        </Presence>
    )
}