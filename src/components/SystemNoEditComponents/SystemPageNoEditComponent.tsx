import { Text,Image, Button, Box, Skeleton,} from "@chakra-ui/react";
import { useState } from "react";
import { DialogUserCampaigns } from "../system/DialogUserCampaigns";
import { System, User } from "@/interfaces/Models";

export const SystemPageNoEditComponent = () => {
    
    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'{}');

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

    const [openDialogLg, setOpenDialogLg] = useState(false)

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">USE UMA NOVA FORMA DE CONTAR HISTÓRIAS!</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div>
                        {
                            img == "" ?
                            <Skeleton rounded={"xl"} w={"36vw"} h={"36vh"} />
                            :
                            <Image rounded={"xl"} w={"36vw"} h={"36vh"} className="bg-purple-950" src={img}></Image>
                        }
                    </div>
                    <div className="padding-left grid place-content-between">
                        <Text className="text" textAlign={"justify"}>{system.descricao}</Text>
                        
                    </div>
                </div>
                <Box mt={6} className="text-justify">
                    <Text className="text" textAlign={"justify"}>Explore as regras, modelo de ficha e mecânicas que o criador publicou. Para usar este sistema em sua campanha, você precisa criar uma cópia privada dele na sua conta. Assim, você pode continuar personalizando o sistema!</Text>
                    <Button  onClick={()=> setOpenDialogLg(true)}  mt={"4"}>Usar este sistema</Button> {/* habilitar botão quando alguma alteração for feita nos textos ou na imagem */}
                </Box>
            
            </div>
            <DialogUserCampaigns open={openDialogLg} handleClose={setOpenDialogLg} system={system}/>
        </div>
    )
}