import { CampaignHeader } from "@/components/CampaignPage/CampaignHeader";
import { SidebarGM } from "@/components/SidebarGM/SidebarGM";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { Box } from "@chakra-ui/react/box";
import { Presence } from "@chakra-ui/react/presence";
import {Flex, For, IconButton, Text} from "@chakra-ui/react"
import { SidebarPlayer } from "@/components/SidebarPlayer/SidebarPlayer";
import { CampaignHeaderPlayer } from "@/components/CampaignPage/CampaignHeaderPlayer";
import { ToggleThemeXL } from "@/components/ToggleTheme/ToggleThemeXL";
import { LuArrowRightLeft } from "react-icons/lu";
import { useState } from "react";
import { SystemPageSheetComponent } from "@/components/SystemComponents/SystemPageSheetComponent";
import { SystemPagePlayerSheetComponent } from "@/components/SystemNoEditComponents/SystemPagePlayerSheetComponent";
import { CharacterProfile } from "@/components/CharacterProfile/CharacterProfile";
import { AddNewCharacterProfile } from "@/components/CharacterProfile/AddNewCharacterProfile";
import { ArchiveCharacterSheet } from "@/components/ArchiveComponents/ArchiveCharacterSheet";

export default function CampaignCharacterSheet(){

    const system = "meu sistema";
    const campaign = "minha campanha";
    const characterId = sessionStorage.getItem('fichaAtual');

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slower"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}  >
                    
            <div className="max-h-[100vh] overflow-y-hidden">
                        <CampaignHeader  campaign="minha campanha"/>
                        <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                            <div className="col-span-2 sticky">
                                <SidebarGM campaign=""></SidebarGM>
                            </div>
                            <div className="col-span-9">
                                <div>
                                    <ArchiveCharacterSheet characterId={characterId || ''} system={''} campaign={""} sheetTemplate={""}/>
                                </div>
                                
                                <IconButton className="left-bottom" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} onClick={()=>setIsGameMaster(!isGameMaster)} variant="outline" size="sm">
                                    {<LuArrowRightLeft />}
                                </IconButton>
                                <ToggleTheme/>
                            </div>
                        </div>
                    </div>
            </Box>
        </Presence>
    )
}