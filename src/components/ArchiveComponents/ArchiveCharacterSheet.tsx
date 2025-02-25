import {Text,Flex, Grid, IconButton, } from "@chakra-ui/react";
import { LuChevronLeft, LuSave } from "react-icons/lu";
import { Toaster, toaster } from "../ui/toaster";
import { useState } from "react";
import { CharacterSheetPlayerEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerEditSection";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { CharacterSheetPlayerNoEditSection } from "../CharacterSheetComponents/CharacterSheetPlayerNoEditSection";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    campaign: string;
    sheetTemplate: string;
    characterId:string;
}

export const ArchiveCharacterSheet = ({
    characterId,
}: SystemPageComponentProps) => {

    const navigate = useNavigate();
    
    const characterName = characterId; //depois mudar pra um get q pega o nome do personagem
    const [disableSaveButton,setDisableSaveButton] = useState(false);
    const is_creator = true;

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

    function goBack(){
        const f = JSON.parse(sessionStorage.getItem('pastaAtual')||'');
        navigate(`/grimoire/campaign/archive/${(f.nome).toLowerCase()}`)
        location.reload();
    }

    return(
        <div className="">
            {
                is_creator ?
                <div className="margin-right">
                    <Flex align={"center"} placeContent={"space-between"}>
                        <Flex gapX={4} alignItems={"center"}>
                            <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                                <LuChevronLeft />
                            </IconButton>
                            <Text mr={2} className="subtitle-s">FICHA DE {characterName.toUpperCase()}</Text>
                        </Flex>
                        <Flex  gapX={2} align={"end"}>
                            <Avatar m={6} scale={1.5} size={"2xl"} src=""></Avatar>
                            <IconButton disabled={disableSaveButton} onClick={()=>saveCharacter()}><LuSave /></IconButton>
                        </Flex>
                    </Flex>

                    <Grid mt={2} maxH={"72vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                        <CharacterSheetPlayerEditSection sectionTitle="Identidade do Personagem" sectionId="section1" fields="field1" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="História" sectionId="section2" fields="field2" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Atributos" sectionId="section3" fields="field3" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                        <CharacterSheetPlayerEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                    </Grid>
                
                    <Toaster />
                </div>
                :
                <div className="margin-right">
                    <Flex placeContent={"space-between"}>
                        <Flex gapX={4} alignItems={"center"}>
                            <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                                <LuChevronLeft />
                            </IconButton>
                            <Text mr={2} className="subtitle-s">FICHA DE {characterName.toUpperCase()}</Text>
                            <Avatar size={"2xl"} src=""></Avatar>
                        </Flex>
                    </Flex>
                        <Grid mt={2} maxH={"72vh"} overflowY={"auto"} className="grid-cols-2" mb={12} gap={4}>
                            <CharacterSheetPlayerNoEditSection sectionTitle="Identidade do Personagem" sectionId="section1" fields="field1" characterId={characterId}/>
                            <CharacterSheetPlayerNoEditSection sectionTitle="História" sectionId="section2" fields="field2" characterId={characterId}/>
                            <CharacterSheetPlayerNoEditSection sectionTitle="Atributos" sectionId="section3" fields="field3" characterId={characterId}/>
                            <CharacterSheetPlayerNoEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                            <CharacterSheetPlayerNoEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                            <CharacterSheetPlayerNoEditSection sectionTitle="Magias" sectionId="section4" fields="field4" characterId={characterId}/>
                        </Grid>
                
                </div>
            }
        </div>
    )
}