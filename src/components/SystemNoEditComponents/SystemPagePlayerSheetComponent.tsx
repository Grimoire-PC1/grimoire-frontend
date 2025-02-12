import {Text,Flex, Grid, Button, IconButton, } from "@chakra-ui/react";
import { CharacterSheetNoEditSection } from "../CharacterSheetComponents/CharacterSheetNoEditSection";
import { LuSave } from "react-icons/lu";
import { Toaster, toaster } from "../ui/toaster";
import { useState } from "react";
import { CharacterSheetPlayerEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerEditSection";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle?: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    characterId:string;
}

export const SystemPagePlayerSheetComponent = ({
    system,
    title,
    subtitle,
    characterId,
}: SystemPageComponentProps) => {

    const characterName = "Saegun Adebayo"
    const [disableSaveButton,setDisableSaveButton] = useState(false);

    function saveCharacter(){
        setDisableSaveButton(true);
        //mandar pro backend salvar o personagem
        const success = true;
        //depois do processamento acabar, habilitar o botao novamente
        setDisableSaveButton(false);
        if(success){
            toaster.create({
            description: "Personagem salvo com sucesso!",
            type: "success",
            })
        }else{
            toaster.create({
                description: "Houve um problema salvando o personagem",
                type: "error",
                })
        }
    }

    return(
        <div className="">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        {characterId !== ""? 
                        <Text className="subtitle-s">FICHA DE {characterName.toUpperCase()}</Text>
                        : 
                        <Text className="subtitle-s">{title}</Text>}
                    </div>
                    <IconButton disabled={disableSaveButton}
                    onClick={()=>saveCharacter()}><LuSave /></IconButton>
                </Flex>
                    <Grid mt={2} maxH={"53vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                        <CharacterSheetPlayerEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields="" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="História" sectionId="2" fields="" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Atributos" sectionId="3" fields="" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Magias" sectionId="4" fields="" characterId={characterId}/>
                    </Grid>
            
            </div>
            <Toaster />
        </div>
    )
}