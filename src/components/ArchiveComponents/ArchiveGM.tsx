import { Box, Flex,For,IconButton,Text } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { LuFolder, LuFolderLock, LuPlus } from "react-icons/lu";
import { NewFolderDialog } from "./NewFolderDialog";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getFolders } from "@/services/campaignService";
import { Folder } from "@/interfaces/Models";

export interface ArchiveGMProps {
    campaign: string;
}

export const ArchiveGM = ({
    campaign,
}: ArchiveGMProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);
    const navigate = useNavigate();
    const [campaign_folders, setFolders] = useState<Folder[]>([]);
    const [flag,setFlag] = useState(0);

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

    function goToFolder(folder:Folder){ //mudar para o tipo folder depois
        console.log(folder);
        sessionStorage.setItem('pastaAtual',JSON.stringify(folder));
        navigate(`/grimoire/campaign/archive/${(folder.nome).toLowerCase()}`)
    }

    const [showNewFolder,setShowNewFolder] = useState(false);

    function fecharEforcar(){
        foldersMutation.mutate({id_campanha:parseInt(campaign)});
        setShowNewFolder(false);
        forceUpdate();
    }
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
                <For each={campaign_folders.filter((folder) => folder.id_pacote_pai == null)}>
                    {(folder)=><Box onClick={()=>goToFolder(folder)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {folder.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text textAlign={"center"}>{folder.nome}</Text>
                                </Box>}
                </For>
                </Flex>
            </Box>

            <NewFolderDialog open={showNewFolder} handleCreate={fecharEforcar} handleClose={setShowNewFolder} campaignId={campaign} pastaMaeId=""/>
        </div>
    )
}