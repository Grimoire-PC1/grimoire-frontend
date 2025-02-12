import { Input, Text, Textarea, Image,Button,} from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
}

export const SystemPageComponent = ({
    system,
}: SystemPageComponentProps) => {
    const system_image = "";

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
                        <Input></Input>
                        <Text className="text" mt={"4"}>Descreva brevemente como ele funciona</Text>
                        <Textarea resize={"none"}></Textarea>
                        <Text className="text" mt={"4"}>Outras pessoas podem usar seu sistema?</Text>
                        <RadioGroup mt={"4"} display={"flex"} columnGap={4} defaultValue="1">
                            <Radio value="1">Não, meu sistema será privado</Radio>
                            <Radio value="2">Sim, meu sistema será público</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div className="text-end">
                <Button mt={"4"} disabled>Salvar alterações</Button> {/* habilitar botão quando alguma alteração for feita nos textos ou na imagem */}

                </div>
            
            </div>
        </div>
    )
}