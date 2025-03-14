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

export interface ArchiveGMProps {
    campaign: string;
    folder:Folder;
}

export const ArchiveFolderGM = ({
    campaign,
    folder,
}: ArchiveGMProps) => {

    const [titulo,setTitulo] = useState(folder.nome);
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
            foldersMutation.mutate({id_campanha:parseInt(campaign)});
            setFlag(flag+1);
        }
    }, [flag]);

    //const files = [{nome: "Ficha P1", pasta: "P1", tipo: "FICHA"}, {nome: "Cajado", pasta: "P1", tipo: "ITEM"},{nome: "Pista 1", pasta: "Public", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Public", tipo: "TEXTO"}]

    function goToFolder(f:Folder){
        console.log(f);
        sessionStorage.setItem('pastaAtual',JSON.stringify(f));
        navigate(`/grimoire/campaign/archive/${(f.nome).toLowerCase()}`);
        location.reload();
    }

    const files = [{nome: "Ficha P1", pasta: "Private", tipo: "FICHA"}, {nome: "Cajado", pasta: "Private", tipo: "ITEM"},{nome: "Pista 1", pasta: "Private", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Private", tipo: "TEXTO"}]
    
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


    function fecharEforcar(){
        foldersMutation.mutate({id_campanha:parseInt(campaign)});
        setShowNewFolder(false);
        setShowNewTXT(false);
        setShowNewIMG(false);
        setShowNewItem(false);
        setShowNewSheet(false);
        setShowDeleteFolder(false);
        setShowEditFolder(false);
        forceUpdate();
    }

    function mudarTitulo(novo:string){
        setTitulo(novo);
        fecharEforcar();
    }

    return(
        <div>
            <Flex alignItems={"center"} placeContent={"space-between"}>
                <Flex gapX={4} alignItems={"center"}>
                    <IconButton onClick={()=>goBack()} rounded={"full"} size={"xl"} variant={"ghost"} aria-label="Voltar"> 
                        <LuChevronLeft />
                    </IconButton>
                    <Text className="subtitle-s">{titulo}</Text>
                </Flex>
                
                <MenuRoot>
                    <MenuTrigger asChild>
                        <IconButton rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Editar pasta"> 
                            <LuPencil />
                        </IconButton>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem onClick={()=>setShowNewFolder(true)}  cursor={"pointer"} value="novaPasta">Nova pasta</MenuItem>
                        <MenuRoot positioning={{ placement: "right-start", gutter: 10 }}>
                        <MenuTriggerItem value="novoArquivo">Novo arquivo</MenuTriggerItem>
                        <MenuContent>
                            <MenuItem onClick={()=>setShowNewTXT(true)} cursor={"pointer"} value="txt">Texto</MenuItem>
                            <MenuItem onClick={()=>setShowNewIMG(true)} cursor={"pointer"} value="img">Imagem</MenuItem>
                            <MenuItem onClick={()=>setShowNewItem(true)} cursor={"pointer"} value="item">Item</MenuItem>
                            <MenuItem onClick={()=>setShowNewSheet(true)} cursor={"pointer"} value="ficha">Personagem</MenuItem>
                        </MenuContent>
                        </MenuRoot>
                        <MenuItem onClick={()=>setShowEditFolder(true)} cursor={"pointer"} value="editarPasta">Editar pasta</MenuItem>
                        <MenuItem onClick={()=>setShowDeleteFolder(true)} cursor={"pointer"} value="excluirPasta" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }}>Excluir pasta</MenuItem>
                    </MenuContent>
                </MenuRoot>
                                        
            </Flex>

            <Box mt={6} maxH={"70vh"} gap={"4"} overflowY={"auto"}>
                <Flex alignItems={"end"} flexWrap={"wrap"} gap={4}>
                <For each={campaign_folders.filter((f) => f.id_pacote_pai === folder.id)}>
                    {(f)=><Box onClick={()=>goToFolder(f)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {f.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text mt={3} textAlign={"center"}>{f.nome}</Text>
                                </Box>}
                </For>
                <For each={files.filter((f) => f.pasta === folder.nome)}>
                    {(file)=><ArchiveFileComponent campaign="" folderId={folder.nome} file={file}/>}
                </For>
                </Flex>
            </Box>

            <NewSubFolderDialog publica={folder.publica} open={showNewFolder} handleConfirm={fecharEforcar} handleClose={setShowNewFolder} campaignId={parseInt(campaign)} pastaMaeId={folder.id}/>
            <DeleteSubFolderDialog open={showDeleteFolder} handleConfirm={goBack} handleClose={setShowDeleteFolder} pastaId={folder.id} pastaNome={folder.nome}/>
            <EditSubFolderDialog open={showEditFolder} handleConfirm={mudarTitulo} handleClose={setShowEditFolder} pastaId={folder.id} pastaNome={folder.nome}/>
        
            <NewTxtFileDialog open={showNewTXT} handleClose={setShowNewTXT} pastaId={String(folder.id)}/>
            <NewImgFileDialog open={showNewIMG} handleClose={setShowNewIMG} pastaId={String(folder.id)}/>
            <NewItemFileDialog open={showNewItem} handleClose={setShowNewItem} pastaId={String(folder.id)}/>
            <NewSheetFileDialog open={showNewSheet} handleClose={setShowNewSheet} pastaId={String(folder.id)}/>
        </div>
    )
}