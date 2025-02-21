import { Box, Flex,For,IconButton,Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuFolder, LuFolderLock, LuPlus } from "react-icons/lu";
import { NewFolderDialog } from "./NewFolderDialog";
import { useNavigate } from "react-router-dom";

export interface ArchiveGMProps {
    campaign: string; //depois mudar pra Campaign
}

export const ArchiveGM = ({
    campaign,
}: ArchiveGMProps) => {
    const navigate = useNavigate();

    const campaign_folders = [{ nome: "Público", pasta_mae: "", publica: true}, {nome: "Private", pasta_mae: "", publica: false}, {nome: "NPCs", pasta_mae: "Private", publica: false},{nome: "Personagem 1 com nome longo", pasta_mae: "", publica: false},{nome: "Personagem 2", pasta_mae: "", publica: false},{nome: "Personagem 3 nome medio", pasta_mae: "", publica: false}];

    //const files = [{nome: "Ficha P1", pasta: "P1", tipo: "FICHA"}, {nome: "Cajado", pasta: "P1", tipo: "ITEM"},{nome: "Pista 1", pasta: "Public", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Public", tipo: "TEXTO"}]

    function goToFolder(folder:unknown){ //mudar para o tipo folder depois
        console.log(folder);
        sessionStorage.setItem('pastaAtual',JSON.stringify(folder));
        navigate(`/grimoire/campaign/archive/${(folder.nome).toLowerCase()}`)
    }

    const [showNewFolder,setShowNewFolder] = useState(false);

    return(
        <div>
            <Flex alignItems={"center"} placeContent={"space-between"}>
                <Text className="subtitle-s">ORGANIZE TODA A SUA CAMPANHA EM UM SÓ LUGAR!</Text>
                
                <IconButton onClick={()=>setShowNewFolder(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Regra"> 
                    <LuPlus />
                </IconButton>
                                        
            </Flex>

            <Box mt={6} maxH={"70vh"} gap={"4"} overflowY={"auto"}>
                <Flex flexWrap={"wrap"} gap={4}>
                <For each={campaign_folders.filter((folder) => folder.pasta_mae == "")}>
                    {(folder)=><Box onClick={()=>goToFolder(folder)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {folder.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text textAlign={"center"}>{folder.nome}</Text>
                                </Box>}
                </For>
                </Flex>
            </Box>

            <NewFolderDialog open={showNewFolder} handleClose={setShowNewFolder} campaignId={campaign} pastaMaeId=""/>
        </div>
    )
}