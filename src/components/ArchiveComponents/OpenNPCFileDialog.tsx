import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Editable,Flex,IconButton,Input,Text,Image, Alert} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { LuSave, LuTrash2 } from 'react-icons/lu';
import { HiUpload } from 'react-icons/hi';
import { File } from '@/interfaces/Models';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { updateFile, deleteFile, getCampaignCharacters } from '@/services/campaignService';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    file:File;
}

export const OpenNPCFileDialog = ({
    open,
    handleClose,
    file
}: DialogLgProps) => {

    const [img,setImg] = useState("")
    const [idFoto, setIdFoto] = useState("");
    const [flag, setFlag] = useState(0);

    const getCharacters = useMutation({
        mutationKey: ["getNPC"],
        mutationFn: getCampaignCharacters,
        onSuccess: (data) => {
            const filteredData = data.filter((d) => d.id === parseInt(file.conteudo))
            console.log(filteredData);
            if(filteredData.length > 0){
                setIdFoto(filteredData[0].id_foto);
            }
        },
        onError: (error) => {
            console.log(error);
        },
        });

    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${idFoto}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const data = await res.json()
          setImg(data.image)
          console.log(data)
    }

    if(!img || img == "") {
        getImage()
    }

    useEffect(() => {
        if(flag < 2){
            getCharacters.mutate();
            setFlag(flag+1);
        }
    }, [flag]);

    return(
<Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }}>
                    <DialogPanel
                        transition
                        className=" max-h-[90vh] padding-dialog-lg relative transform overflow-y-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[35vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <Box m={2} maxH={"74vh"} overflowY={"auto"}>
                            <div>
                                <Box justifyItems={"center"}>
                                    <Text fontSize={"2xl"}>{file.nome}</Text>
                                    <Image rounded={"full"} mt={6} fit={"contain"} w={"36vh"} src={img}/>

                                    <Alert.Root  maxW={"360px"}  mt={6} status="info" title="This is the alert title">
                                        <Alert.Indicator />
                                        <Alert.Title>Este personagem é um NPC. Você pode vê-lo, mas apenas o mestre tem acesso à sua ficha.</Alert.Title>
                                    </Alert.Root>
                                </Box>
                            </div>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <Toaster/>
    </Dialog>
    )
}