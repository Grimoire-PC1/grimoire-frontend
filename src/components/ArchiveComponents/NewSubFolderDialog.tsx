import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Alert, Box,Button,Input,Text } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { createFolder } from '@/services/campaignService';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    campaignId:number;
    pastaMaeId:number;
    publica:boolean;
}

export const NewSubFolderDialog = ({
    open,
    handleClose,
    handleConfirm,
    campaignId,
    pastaMaeId,
    publica,
}: DialogLgProps) => {

    const [titulo,setTitulo] = useState("");

    const mutation = useMutation({
        mutationKey: ["newFolder"],
        mutationFn: createFolder, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Sub-pasta criada com sucesso!",
                type: "success",
            })
            setTitulo("");
            handleConfirm(false);
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            description: "Houve um problema durante a criação da sub-pasta",
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
                                
                                <Text fontSize={"2xl"}>Criar nova sub-pasta</Text>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome da pasta'/>
                                        <Alert.Root  maxW={"360px"}  mt={4} status="info" title="This is the alert title">
                                            <Alert.Indicator />
                                            <Alert.Title>Esta sub-pasta terá a mesma visibilidade da pasta mãe.</Alert.Title>
                                        </Alert.Root>
                                    </Form>
                                    <Button onClick={()=>mutation.mutate({  id_campanha:campaignId,
                                                                            publica: publica,
                                                                            id_pacote_pai:pastaMaeId,
                                                                            nome:titulo})} mt={"4"} mb={"4"}>Criar</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}