import { Box, Flex,For,IconButton,Text } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { LuFolder, LuFolderLock, LuPlus } from "react-icons/lu";
import { NewFolderDialog } from "./NewFolderDialog";
import { useNavigate } from "react-router-dom";
import { Folder } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { getFolders } from "@/services/campaignService";

export interface ArchivePlayerProps {
    campaign: string; //depois mudar pra Campaign
}

export const ArchivePlayer = ({ 
    campaign,
}: ArchivePlayerProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);
    const navigate = useNavigate();
    const [campaign_folders, setFolders] = useState<Folder[]>([]);
    const [flag,setFlag] = useState(0);

    const playerCharacterNames = ['Personagem 1 com nome longo','Personagem 2'];

    const foldersMutation = useMutation({
        mutationKey: ["getFolders"],
        mutationFn: getFolders,
        onSuccess: (data) => {
          console.log(data)
          setFolders(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
            
    useEffect(() => {
        if(flag < 2){
            foldersMutation.mutate({id_campanha:parseInt(campaign)});
            setFlag(flag+1);
        }
    }, [flag]);

    //const campaign_folders = [{ nome: "Público", id_pacote_pai: "", publica: true}, {nome: "Private", id_pacote_pai: "", publica: false}, {nome: "NPCs", id_pacote_pai: "Private", publica: false},{nome: "Personagem 1 com nome longo", id_pacote_pai: "", publica: false},{nome: "Personagem 2", id_pacote_pai: "", publica: false},{nome: "Personagem 3 nome medio", id_pacote_pai: "", publica: false}];

    //const files = [{nome: "Ficha P1", pasta: "P1", tipo: "FICHA"}, {nome: "Cajado", pasta: "P1", tipo: "ITEM"},{nome: "Pista 1", pasta: "Public", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Public", tipo: "TEXTO"}]

    function goToFolder(folder:Folder){ //mudar para o tipo folder depois
        console.log(folder);
        sessionStorage.setItem('pastaAtual',JSON.stringify(folder));
        navigate(`/grimoire/campaign/archive/${(folder.nome).toLowerCase()}`)
    }

    return(
        <div>

            <Box mt={6} maxH={"70vh"} gap={"4"} overflowY={"auto"}>
                <Flex flexWrap={"wrap"} gap={4}>
                <For each={campaign_folders.filter((folder) => folder.id_pacote_pai == null)}>
                    {(folder)=><Box onClick={()=>goToFolder(folder)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {folder.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text textAlign={"center"}>{folder.nome}</Text>
                                </Box>}
                </For>
                </Flex>
            </Box>
        </div>
    )
}