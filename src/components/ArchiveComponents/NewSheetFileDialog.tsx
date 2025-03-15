import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Flex,Input,Text } from "@chakra-ui/react";
import { Form, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { createCharacter } from '@/services/characterService';
import { createFile } from '@/services/campaignService';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    pastaId:number;
    campaignId:number;
}

export const NewSheetFileDialog = ({
    open,
    handleClose,
    pastaId,
    campaignId,
    handleConfirm
}: DialogLgProps) => {
    const navigate = useNavigate();

    const [titulo,setTitulo] = useState("");
    const [imgId, setImgid] = useState("");
    const [flag,setFlag] = useState(0);

    const createImage = async () => {
        const resImg = await fetch("http://localhost:8081/upload", {
            method:"POST",
            headers: {
            "content-type" : "application/json"
            },
            body: JSON.stringify({img: ''})
        })
        const data = await resImg.json()
        setImgid(data.data._id);
    }

    useEffect(() => {
        if(flag == 0){
            createImage();
            setFlag(1);
        }
    }, [imgId]);

    const mutation = useMutation({
        mutationKey: ["createCharacter"],
        mutationFn: createCharacter,
        onSuccess: (data) => {
            mutationFile.mutate({ id_pacote_pai:pastaId,
                tipo_arquivo: "PERSONAGEM",
                nome:titulo,
                conteudo:String(data.id),
                })
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
                        description: "Houve um problema durante a criação do personagem.",
                        type: "error",
                        })
        },
    });

    const mutationFile = useMutation({
        mutationKey: ["createFile"],
        mutationFn: createFile,
        onSuccess: () => {
            toaster.create({
                        description: "Personagem criado com sucesso!",
                        type: "success",
                        })
            setTitulo("");
            setImgid("");
            setFlag(0);
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
                        description: "Houve um problema durante a criação do personagem.",
                        type: "error",
                        })
        },
    });

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
                            <Text fontSize={"2xl"}>Crie um novo NPC (Personagem não jogável)!</Text>

                            <Form>
                                <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome do personagem'></Input>
                            </Form>
                            
                            <Flex mt={8} justifyContent={"center"}>
                                <Button disabled={titulo === ""} onClick={()=>mutation.mutate({id_campanha:campaignId,nome:titulo,id_foto:imgId})}>Criar ficha</Button>
                            </Flex>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <Toaster/>
    </Dialog>
    )
}