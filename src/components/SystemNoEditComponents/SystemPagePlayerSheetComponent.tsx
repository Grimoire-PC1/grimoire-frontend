import {Text,Flex, Grid, IconButton, } from "@chakra-ui/react";
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
    
        const changes = [];
        for(let i = 1;i<5;i++){ //para todo section na tabela sectionId associado ao system atual, faça:
            for(let i = 1; i < 6;i++){ //para todo fieldId associado ao sectionId atual, faça:
                changes.push({id: 'field'+i,value:document.getElementById('field'+i)?.value}) //field+i sera trocado pelo fieldId atual da iteração
                //adicionar condicional especial pro tipo dado, que tem 3 valores associados (a lógica vai depender de como estiver o esquema no BD)
            }
        }

        console.log(changes)

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
                        <CharacterSheetPlayerEditSection sectionTitle="Identidade do Personagem" sectionId="section1" fields="field1" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="História" sectionId="section2" fields="field2" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Atributos" sectionId="section3" fields="field3" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                    </Grid>
            
            </div>
            <Toaster />
        </div>
    )
}