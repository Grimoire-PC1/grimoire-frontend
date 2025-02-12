import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import { SystemHeader } from "@/components/SystemComponents/SystemHeader";
import { SidebarSystem } from "@/components/SystemComponents/SidebarSystem";
import { SystemPageSheetComponent } from "@/components/SystemComponents/SystemPageSheetComponent";

export default function SystemPageSheet(){

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}  maxH={"100vh"} overflowY={"hidden"} >
                    <div>
                        <SystemHeader  system="meu sistema"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarSystem system=""></SidebarSystem>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <SystemPageSheetComponent   title="COMO SEUS JOGADORES PODEM CONSTRUIR PERSONAGENS ÚNICOS?" 
                                                                subtitle="Crie um modelo de ficha para dar vida aos personagens dentro do seu sistema" 
                                                                system={"meu sistema"}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </Box>
            <ToggleTheme/>
        </Presence>
    )
}