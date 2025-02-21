import { Box, Flex,For,Icon,IconButton,Text } from "@chakra-ui/react";
import { useReducer, useState } from "react";
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

export interface ArchiveGMProps {
    campaign: string; //depois mudar pra Campaign
    folder:unknown; //mudar para Folder depois
}

export const ArchiveFolderGM = ({
    campaign,
    folder
}: ArchiveGMProps) => {
    const navigate = useNavigate();

    const campaign_folders = [{ nome: "Público", pasta_mae: "", publica: true}, {nome: "Private", pasta_mae: "", publica: false}, {nome: "NPCs", pasta_mae: "Private", publica: false},{nome: "Personagem 1 com nome longo", pasta_mae: "", publica: false},{nome: "Personagem 2", pasta_mae: "", publica: false},{nome: "Personagem 3 nome medio", pasta_mae: "", publica: false}];

    const files = [{nome: "Ficha P1", pasta: "Private", tipo: "FICHA"}, {nome: "Cajado", pasta: "Private", tipo: "ITEM"},{nome: "Pista 1", pasta: "Private", tipo: "IMAGEM"},{nome: "Documento 1", pasta: "Private", tipo: "TEXTO"}]

    function goToFolder(f:unknown){ //mudar para o tipo folder depois
        console.log(f);
        sessionStorage.setItem('pastaAtual',JSON.stringify(f));
        navigate(`/grimoire/campaign/archive/${(f.nome).toLowerCase()}`)
        location.reload();
    }

    function goBack(){
        if(folder.pasta_mae != ""){
            goToFolder(campaign_folders.filter((f) => f.nome === folder.pasta_mae)[0]) /* depois mudar simplesmente para folder.pasta_mae, que vai ter uma relação com outro folder */
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
                <For each={campaign_folders.filter((f) => f.pasta_mae === folder.nome)}>
                    {(folder)=><Box onClick={()=>goToFolder(folder)} cursor={"pointer"} w={"100px"} placeItems={"center"}>
                                    {folder.publica ? <LuFolder size={48} strokeWidth={1.25}/> : <LuFolderLock size={48} strokeWidth={1.25}/>}
                                    <Text mt={3} textAlign={"center"}>{folder.nome}</Text>
                                </Box>}
                </For>
                <For each={files.filter((f) => f.pasta === folder.nome)}>
                    {(file)=><Box cursor={"pointer"} w={"100px"} placeItems={"center"}><IconButton size={"2xl"} variant={"ghost"}>
                                            {file.tipo === 'TEXTO' ? <LuFileText/> : 
                                            file.tipo === 'IMAGEM' ? <LuFileImage/> : 
                                            file.tipo === 'ITEM' ? <LuBackpack/> : 
                                            file.tipo === 'FICHA' ? <LuUserRoundPen/> : 
                                            <LuFile/>}  
                                            </IconButton>
                                    <Text textAlign={"center"}>{file.nome}</Text>
                                </Box>}
                </For>
                </Flex>
            </Box>

            <NewSubFolderDialog open={showNewFolder} handleClose={setShowNewFolder} campaignId={campaign} pastaMaeId={folder.nome /* mudar para id depois */}/>
            <DeleteSubFolderDialog open={showDeleteFolder} handleClose={setShowDeleteFolder} campaignId={campaign} pastaId={folder.nome /* mudar para id depois */} pastaNome={folder.nome}/>
            <EditSubFolderDialog open={showEditFolder} handleClose={setShowEditFolder} campaignId={campaign} pastaId={folder.nome /* mudar para id depois */} pastaNome={folder.nome}/>
        
            <NewTxtFileDialog open={showNewTXT} handleClose={setShowNewTXT} pastaId={folder.name /* mudar para id depois */}/>
            <NewImgFileDialog open={showNewIMG} handleClose={setShowNewIMG} pastaId={folder.name /* mudar para id depois */}/>
            <NewItemFileDialog open={showNewItem} handleClose={setShowNewItem} pastaId={folder.name /* mudar para id depois */}/>
            <NewSheetFileDialog open={showNewSheet} handleClose={setShowNewSheet} pastaId={folder.name /* mudar para id depois */}/>
        </div>
    )
}