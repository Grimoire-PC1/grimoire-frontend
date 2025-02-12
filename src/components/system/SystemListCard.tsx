import { System } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DialogUserCampaigns } from "./DialogUserCampaigns";


export interface SystemListCardProps {
    system: System; 
}

export const SystemListCard = ({
    system,
}: SystemListCardProps) => {

    const [openUserCampaigns,setOpenUserCampaigns] = useState(false);

    const navigate = useNavigate();

    return(

        <MenuRoot>
            <MenuTrigger asChild>
                <CardRoot className="" cursor={"pointer"}>
                        {system.image && system.image != '' ?
                            <Image
                            src={system.image}
                            className={"max-h-[20vh] rounded-t-sm"}
                            />
                        :
                            <div
                            className={"h-[20vh] bg-indigo-900 rounded-t-sm"}
                            />
                        }
                    <CardBody>
                        <Text fontSize={"lg"}>{system.name}</Text>
                    </CardBody>
                </CardRoot>
            </MenuTrigger>
            <MenuContent>
                <MenuItem onClick={()=>navigate("/grimoire/system")} cursor={"pointer"} value="abrirSistema">Abrir sistema</MenuItem>
                <MenuItem onClick={()=>setOpenUserCampaigns(true)} cursor={"pointer"} value="usarSistema">Usar em uma campanha</MenuItem>
            </MenuContent>

            <DialogUserCampaigns open={openUserCampaigns} handleClose={setOpenUserCampaigns} user="" system=""/>
        </MenuRoot>
    )
}