import { Box, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuFileText, LuFileImage, LuBackpack, LuUserRoundPen, LuFile } from "react-icons/lu";
import { OpenTxtFileDialog } from "./OpenTxtFileDialog";
import { OpenImgFileDialog } from "./OpenImgFileDialog";
import { OpenItemFileDialog } from "./OpenItemFileDialog";
import { useNavigate } from "react-router-dom";

export interface ArchiveGMProps {
    campaign: string; //depois mudar pra Campaign
    folderId:string;
    file: unknown; //mudar para File depois
}

export const ArchiveFileComponent = ({
    campaign,
    folderId,
    file
}: ArchiveGMProps) => {
    const navigate = useNavigate();

    const [showTXT,setShowTXT] = useState(false);
    const [showIMG,setShowIMG] = useState(false);
    const [showItem,setShowItem] = useState(false);

    function openFile(f:unknown){
        switch (f.tipo){
            case 'TEXTO': {
                setShowTXT(true);
                break;
            }
            case 'IMAGEM': {
                setShowIMG(true);
                break;
            }
            case 'ITEM': {
                setShowItem(true);
                break;
            }
            case 'FICHA': {
                sessionStorage.setItem('fichaAtual',file.nome);
                navigate(`/grimoire/campaign/sheet/${file.nome}`); //pode ser o id ao inves do nome, tanto faz
                break;
            }default:{
                break;
            }
        }

    }

    return(
        <div>
            <Box onClick={()=>openFile(file)} cursor={"pointer"} w={"100px"} placeItems={"center"}><IconButton size={"2xl"} variant={"ghost"}>
                        {file.tipo === 'TEXTO' ? <LuFileText/> : 
                        file.tipo === 'IMAGEM' ? <LuFileImage/> : 
                        file.tipo === 'ITEM' ? <LuBackpack/> : 
                        file.tipo === 'FICHA' ? <LuUserRoundPen/> : 
                        <LuFile/>}  
                        </IconButton>
                <Text textAlign={"center"}>{file.nome}</Text>
            </Box>

            <OpenTxtFileDialog open={showTXT} handleClose={setShowTXT} file={file}/>
            <OpenImgFileDialog open={showIMG} handleClose={setShowIMG} file={file}/>
            <OpenItemFileDialog open={showItem} handleClose={setShowItem} file={file}/>
        </div>
    )
}