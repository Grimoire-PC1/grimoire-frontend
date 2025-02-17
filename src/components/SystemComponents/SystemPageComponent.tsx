import { Input, Text, Textarea, Image,Button,} from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateSystemPayload } from "@/interfaces/ServicePayload";
import { updateSystem } from "@/services/systemService";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
}

export const SystemPageComponent = ({
    system,
}: SystemPageComponentProps) => {
    const system_image = "";

    const [modifiedSystem, setModifiedSystem] = useState(false);

    const [systemTilte, setSystemTilte] = useState({});

    const [systemDescription, setSystemDecription] = useState({});

    function mudancaNoSistema() {
        /* 
        ---- BACKEND PENDING ----

        if(systemTilte['value'] != system.name || systemDescription['value'] != system.description) {
            setModifiedSystem(true)
        } else {
            setModifiedSystem(false)
        }
        */
        setModifiedSystem(true)
    }

    const titleChange = (e: any) => {
        const value = e.target.value;
        setSystemTilte({
          ...systemTilte,
          'value': value
        });
        mudancaNoSistema()
    };
    
    const descriptionChange = (e: any) => {
        const value = e.target.value;
        setSystemDecription({
          ...systemDescription,
          'value': value
        });
        mudancaNoSistema()
    };

    const onClickTest = () => {
        const title =systemTilte['value'];
        const description = systemDescription['value'];
        console.log("title ---->", title, "description --->", description); 
        const updateSystemPayload: UpdateSystemPayload = {
            systemId: system.systemId,
            name: title,
            description: description,
            image: ''
        }
        console.log(updateSystemPayload)
        mutation.mutate(updateSystemPayload);
     };

    const mutation = useMutation({
        mutationKey: ["updateSystem"],
        mutationFn: updateSystem,
        onSuccess: () => {
          
        },
        onError: (error) => {
          console.log(error);
          
        },
    });

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Text className="subtitle-s">CRIE UMA NOVA FORMA DE CONTAR HISTÓRIAS!</Text>
                <div className="grid grid-cols-2 margin-top-xs">
                    <div className="content-end">
                        {
                            system_image == "" ?
                            <FileUploadRoot alignItems="stretch" maxFiles={1}>
                                <FileUploadDropzone w={"36vw"} h={"36vh"}
                                    label="Faça o upload da capa do seu sistema"
                                    description=".png ou .jpg de até 5MB"
                                />
                                <FileUploadList />
                            </FileUploadRoot>
                            :
                            <Image rounded={"xl"} w={"36vw"} h={"36vh"} className="bg-purple-950"></Image>
                        } 
                    </div>
                    <div className="padding-left content-end">
                        <Text className="text">Dê um nome ao seu sistema</Text>
                        <Input onChange={titleChange}></Input>
                        <Text className="text" mt={"4"}>Descreva brevemente como ele funciona</Text>
                        <Textarea resize={"none"} onChange={descriptionChange}></Textarea>
                        <Text className="text" mt={"4"}>Outras pessoas podem usar seu sistema?</Text>
                        <RadioGroup mt={"4"} display={"flex"} columnGap={4} defaultValue="1">
                            <Radio value="1">Não, meu sistema será privado</Radio>
                            <Radio value="2">Sim, meu sistema será público</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div className="text-end">
                {!modifiedSystem ?
                    <Button mt={"4"} disabled>Salvar alterações</Button> 
                    :
                    <Button mt={"4"} onClick={onClickTest}>Salvar alterações</Button>
                }
                </div>
            
            </div>
        </div>
    )
}