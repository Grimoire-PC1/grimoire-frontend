import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Input,Text } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { Radio, RadioGroup } from '../ui/radio';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createFolder } from '@/services/campaignService';
import { Toaster,toaster } from '../ui/toaster';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleCreate: (open: boolean) => void;
    campaignId:string;
    pastaMaeId:string;
}

export const NewFolderDialog = ({
    open,
    handleClose,
    handleCreate,
    campaignId,
    pastaMaeId,
}: DialogLgProps) => {

    const [publica,setPublica] = useState("nao");
    const [titulo,setTitulo] = useState("");

    const mutation = useMutation({
        mutationKey: ["newFolder"],
        mutationFn: createFolder, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Pasta criada com sucesso!",
                type: "success",
            })
            setPublica("nao");
            setTitulo("");
            handleCreate(false);
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            description: "Houve um problema durante a criação da pasta",
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
                                
                                <Text fontSize={"2xl"}>Criar nova pasta</Text>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome da pasta'/>
                                        <Text mt={4} className='text'>Essa pasta será visível para os jogadores?</Text>
                                        <RadioGroup onValueChange={({value})=>setPublica(value)} mt={"4"} display={"flex"} columnGap={4} defaultValue="nao">
                                            <Radio value="nao">Não, a pasta será privada</Radio>
                                            <Radio value="sim">Sim, a pasta será pública</Radio>
                                        </RadioGroup>
                                    </Form>
                                    <Button onClick={()=>mutation.mutate({  id_campanha:parseInt(campaignId),
                                                                            publica: publica === "sim" ? true : false,
                                                                            nome:titulo})} mt={"6"} mb={"4"}>Criar</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}