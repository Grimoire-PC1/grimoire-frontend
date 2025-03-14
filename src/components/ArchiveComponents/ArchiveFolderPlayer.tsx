import { Box, Flex,For,Icon,IconButton,Text } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { LuArrowBigLeft, LuBackpack, LuChevronLeft, LuFile, LuFileImage, LuFileText, LuFolder, LuFolderLock, LuNotebookPen, LuPencil, LuPlus, LuUserRoundPen } from "react-icons/lu";
import { NewFolderDialog } from "./NewFolderDialog";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger, MenuTriggerItem } from "../ui/menu";
import { NewSubFolderDialog } from "./NewSubFolderDialog";
import { useNavigate } from "react-router-dom";
import { DeleteSubFolderDialog } from "./DeleteSubFolderDialog";
import { EditSubFolderDialog } from "./EditSubFolderDialog";
import { NewTxtFileDialog } from "./NewTxtFileDialog";
import { NewImgFileDialog } from "./NewImgFileDialog";
import { NewItemFileDialog } from "./NewItemFileDialog";
import { NewSheetFileDialog } from "./NewSheetFileDialog";
import { ArchiveFileComponent } from "./ArchiveFileComponent";
import { Folder } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { getFolders } from "@/services/campaignService";

export interface ArchivePlayerProps {
    campaign: number;
    folder:Folder;
}

export const ArchiveFolderPlayer = ({
    campaign,
    folder
}: ArchivePlayerProps) => {
    const navigate = useNavigate();

    const [,forceUpdate] = useReducer(x=>x+1,0); 

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
            console.log("id da campanha: "+campaign)
            foldersMutation.mutate({id_campanha:campaign});
            setFlag(flag+1);
        }
    }, [flag]);

    const files = [{nome: "Ficha P1", pasta: "Personagem 1 com nome longo", tipo: "FICHA"}, {nome: "Cajado", pasta: "Private", tipo: "ITEM"},{nome: "Pista 1", pasta: "Private", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Personagem 1 com nome longo", tipo: "TEXTO"}]

    function goToFolder(f:Folder){ //mudar para o tipo folder depois
        console.log(f);
        sessionStorage.setItem('pastaAtual',JSON.stringify(f));
        navigate(`/grimoire/campaign/archive/${(f.nome).toLowerCase()}`)
        location.reload();
    }

    function goBack(){
        if(folder.id_pacote_pai != null){
            goToFolder(campaign_folders.filter((f) => f.id === folder.id_pacote_pai)[0]) /* depois mudar simplesmente para folder.id_pacote_pai, que vai ter uma relação com outro folder */
        }else{
            navigate(`/grimoire/campaign/archive`)
        }
    }

    const [showNewFolder,setShowNewFolder] = useState(false);
    const [showDeleteFolder,setShowDeleteFolder] = useState(false);
    const [showEditFolder,setShowEditFolder] = useState(false);

    const [showNewTXT,setShowNewTXT] = useState(false);
    const [showNewIMG,setShowNewIMG] = useState(false);
    const [showNewItem,setShowNewItem] = useState(false);
    const [showNewSheet,setShowNewSheet] = useState(false);



    return(
        <div>
            <Flex alignItems={"center"} placeContent={"space-between"}>
                <Flex gapX={4} alignItems={"center"}>
                    <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                        <LuChevronLeft />
                    </IconButton>
                    <Text className="subtitle-s">{folder.nome}</Text>
                </Flex>
                {/*
                <MenuRoot>
                    <MenuTrigger asChild>
                        <IconButton rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Editar pasta"> 
                            <LuPlus />
                        </IconButton>
                    </MenuTrigger>
                    <MenuContent>
                            <MenuItem onClick={()=>setShowNewTXT(true)} cursor={"pointer"} value="txt">Arquivo de texto</MenuItem>
                            <MenuItem onClick={()=>setShowNewIMG(true)} cursor={"pointer"} value="img">Imagem</MenuItem>
                            <MenuItem onClick={()=>setShowNewItem(true)} cursor={"pointer"} value="item">Item</MenuItem>
                            <MenuItem onClick={()=>setShowNewSheet(true)} cursor={"pointer"} value="ficha">Personagem</MenuItem>
                    </MenuContent>
                </MenuRoot>
                */}
                                        
            </Flex>

            <Box mt={6} maxH={"70vh"} gap={"4"} overflowY={"auto"}>
                <Flex alignItems={"end"} flexWrap={"wrap"} gap={4}>
                <For each={campaign_folders.filter((f) => f.id_pacote_pai === folder.id)}>
                    {(folder)=><Box onClick={()=>goToFolder(folder)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {folder.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text mt={3} textAlign={"center"}>{folder.nome}</Text>
                                </Box>}
                </For>
                <For each={files.filter((f) => f.pasta === folder.nome)}>
                    {(file)=><ArchiveFileComponent campaign="" folderId={folder.nome} file={file}/>}
                </For>
                </Flex>
            </Box>

            {
                /*
                <NewSubFolderDialog open={showNewFolder} handleClose={setShowNewFolder} campaignId={campaign} pastaMaeId={folder.id}/>
                <DeleteSubFolderDialog open={showDeleteFolder} handleClose={setShowDeleteFolder} campaignId={campaign} pastaId={folder.nome} pastaNome={folder.nome}/>
                <EditSubFolderDialog open={showEditFolder} handleClose={setShowEditFolder} campaignId={campaign} pastaId={folder.nome} pastaNome={folder.nome}/>
            
                <NewTxtFileDialog open={showNewTXT} handleClose={setShowNewTXT} pastaId={folder.nome}/>
                <NewImgFileDialog open={showNewIMG} handleClose={setShowNewIMG} pastaId={folder.nome}/>
                <NewItemFileDialog open={showNewItem} handleClose={setShowNewItem} pastaId={folder.nome}/>
                <NewSheetFileDialog open={showNewSheet} handleClose={setShowNewSheet} pastaId={folder.nome}/>
                */
            }
        </div>
    )
}