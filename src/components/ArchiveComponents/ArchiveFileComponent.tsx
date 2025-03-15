import { Box, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuFileText, LuFileImage, LuBackpack, LuUserRoundPen, LuFile } from "react-icons/lu";
import { OpenTxtFileDialog } from "./OpenTxtFileDialog";
import { OpenImgFileDialog } from "./OpenImgFileDialog";
import { OpenItemFileDialog } from "./OpenItemFileDialog";
import { useNavigate } from "react-router-dom";
import { File, Item } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { getItem } from "@/services/campaignService";

export interface ArchiveGMProps {
    campaign: string; //depois mudar pra Campaign
    folderId:string;
    file: File; //mudar para File depois
    handleConfirm: (open: boolean) => void;
    item: Item|undefined;
}

export const ArchiveFileComponent = ({
    campaign,
    folderId,
    file,
    handleConfirm,
    item
}: ArchiveGMProps) => {
    const navigate = useNavigate();

    //const [item,setItem] = useState<Item>();
    const [flag,setFlag] = useState(0);

    const [showTXT,setShowTXT] = useState(false);
    const [showIMG,setShowIMG] = useState(false);
    const [showItem,setShowItem] = useState(false);

    function openFile(f:File){
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
            case 'PERSONAGEM': {
                sessionStorage.setItem('fichaAtual',file.nome);
                navigate(`/grimoire/campaign/sheet/${file.nome}`); //pode ser o id ao inves do nome, tanto faz
                break;
            }default:{
                break;
            }
        }

    }

    useEffect(() => {
        if(flag < 2){
            setFlag(flag+1);
            console.log(item);
        }
    }, [flag]);

    return(
        <div>
            <Box onClick={()=>openFile(file)} cursor={"pointer"} w={"100px"} placeItems={"center"}><IconButton size={"2xl"} variant={"ghost"}>
                        {file.tipo === 'TEXTO' ? <LuFileText/> : 
                        file.tipo === 'IMAGEM' ? <LuFileImage/> : 
                        file.tipo === 'ITEM' ? <LuBackpack/> : 
                        file.tipo === 'PERSONAGEM' ? <LuUserRoundPen/> : 
                        <LuFile/>}  
                        </IconButton>
                <Text textAlign={"center"}>{file.nome}</Text>
            </Box>

            {file.tipo === "TEXTO" ?
                <OpenTxtFileDialog handleConfirm={handleConfirm} open={showTXT} handleClose={setShowTXT} file={file}/>
            : file.tipo === "IMAGEM" ?
                <OpenImgFileDialog handleConfirm={handleConfirm} open={showIMG} handleClose={setShowIMG} file={file}/>
            : file.tipo === "ITEM" ?
                <OpenItemFileDialog handleConfirm={handleConfirm} open={showItem} handleClose={setShowItem} file={file} item={item}/>
            : <div></div>
            }
        </div>
    )
}