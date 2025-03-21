import { System } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Skeleton, Text } from "@chakra-ui/react"
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

    const [img,setImg] = useState("")
        
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${system?.id_foto}`, {
            method:"GET",
            headers: {
                "content-type" : "application/json"
            }
            })
            const data = await res.json()
            setImg(data.image)
    }

    if(!img || img == "") {
        getImage()
    }
    
    const navigateToSystemPage = () => {
        sessionStorage.setItem('currentSystem', JSON.stringify(system))
        sessionStorage.setItem('systemId', String(system.id))
        navigate("/grimoire/system")
    }

    return(

        <MenuRoot>
            <MenuTrigger asChild>
                <CardRoot className="" cursor={"pointer"}>
                        {img != '' ?
                            <Image 
                                src={img}
                                w={"full"}
                                h={"20vh"}
                                className="rounded-t-sm"/>
                        :
                            <Skeleton 
                            w={"full"}
                            h={"20vh"} />
                        }
                    <CardBody>
                        <Text fontSize={"lg"}>{system.nome}</Text>
                    </CardBody>
                </CardRoot>
            </MenuTrigger>
            <MenuContent>
                <MenuItem onClick={navigateToSystemPage} cursor={"pointer"} value="abrirSistema">Abrir sistema</MenuItem>
                <MenuItem onClick={()=>setOpenUserCampaigns(true)} cursor={"pointer"} value="usarSistema">Usar em uma campanha</MenuItem>
            </MenuContent>

            <DialogUserCampaigns open={openUserCampaigns} handleClose={setOpenUserCampaigns} system={system}/>
        </MenuRoot>
    )
}