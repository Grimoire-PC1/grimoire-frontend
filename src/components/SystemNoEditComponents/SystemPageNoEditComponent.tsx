import { Text,Image, Button, Box,} from "@chakra-ui/react";
import { useState } from "react";
import { DialogUserCampaigns } from "../system/DialogUserCampaigns";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
}

export const SystemPageNoEditComponent = ({
    system,
}: SystemPageComponentProps) => {
    const system_image = "";
    const system_desc = 'Meu sistema é muito legal e essa é a descrição dele muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito Meu sistema é muito legal e essa é a descrição dele muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito muito ' //pegar a descrição do sistema

    const [openDialogLg, setOpenDialogLg] = useState(false)

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">USE UMA NOVA FORMA DE CONTAR HISTÓRIAS!</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div>
                        {
                            system_image == "" ?
                            <Image rounded={"xl"} w={"36vw"} h={"36vh"} className="bg-purple-950"></Image>
                            :
                            <Image rounded={"xl"} w={"36vw"} h={"36vh"}></Image>
                        }
                    </div>
                    <div className="padding-left grid place-content-between">
                        <Text className="text" textAlign={"justify"}>{system_desc}</Text>
                        
                    </div>
                </div>
                <Box mt={6} className="text-justify">
                    <Text className="text" textAlign={"justify"}>Explore as regras, modelo de ficha e mecânicas que o criador publicou. Para usar este sistema em sua campanha, você precisa criar uma cópia privada dele na sua conta. Assim, você pode continuar personalizando o sistema!</Text>
                    <Button  onClick={()=> setOpenDialogLg(true)}  mt={"4"}>Usar este sistema</Button> {/* habilitar botão quando alguma alteração for feita nos textos ou na imagem */}
                </Box>
            
            </div>
            <DialogUserCampaigns open={openDialogLg} handleClose={setOpenDialogLg} user="" system={system}/>
        </div>
    )
}