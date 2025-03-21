import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Box, Button, Flex, Input, } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { Toaster,toaster } from '../ui/toaster';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createCharacter } from '@/services/characterService';


export interface DialogCampaignCodeProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleCreate: (open: boolean) => void;
    campaignId:number;
}

export const NewCharacterDialog = ({
    open,
    handleClose,
    handleCreate,
    campaignId
}: DialogCampaignCodeProps) => {

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
        onSuccess: () => {
            toaster.create({
                        description: "Personagem criado com sucesso!",
                        type: "success",
                        })
            setTitulo("");
            setImgid("");
            setFlag(0);
            handleCreate(false);
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
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
                            <DialogPanel
                                transition
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[35vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold ">
                                        Criar um novo personagem?
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <Form>
                                    <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={6} required placeholder="Nome do personagem"/>
                                </Form>

                                <Flex justifyContent={"center"}>
                                    <Button onClick={()=>mutation.mutate({id_campanha:campaignId,nome:titulo,id_foto:imgId})} mb={"4"} className="margin-top" >Criar personagem</Button>
                                </Flex>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}