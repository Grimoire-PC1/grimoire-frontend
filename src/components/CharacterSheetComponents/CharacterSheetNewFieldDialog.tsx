import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Alert, Box, Button, createListCollection, Input, Textarea} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { createSheetTemplateSubTab } from '@/services/systemService';
import { SheetSubTabType } from '@/interfaces/Models';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleCreate: (open: boolean) => void;
    sectionId:number;
    sectionName:string;
}

export const CharacterSheetNewFieldDialog = ({
    open,
    handleClose,
    handleCreate,
    sectionId,
    sectionName,
}: UserSettingsDialogSmProps) => {
    const [titulo,setTitulo] = useState("");
    const [tipo,setTipo] = useState<SheetSubTabType>("TEXTO");

    const types = createListCollection({
        items: [
          { label: "Texto", value: "TEXTO" },
          { label: "Número", value: "INTEIRO" },
          { label: "Dado (quantidade - tipo de dado - bônus)", value: "DADO" },
        ],
      })

    const mutation = useMutation({
    mutationKey: ["createSubTab"],
    mutationFn: createSheetTemplateSubTab,
    onSuccess: (data) => {
        toaster.create({
                    description: "Campo criado com sucesso!",
                    type: "success",
                    })
        handleCreate(false);
    },
    onError: (error) => {
        console.log(error);
        toaster.create({
                    description: "Houve um problema durante a criação do campo.",
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
                                    <DialogTitle className="text-base text-large font-semibold">
                                        Adicionar campo em {sectionName}
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} w={"360px"} placeholder='Nome do campo'></Input>
                                        
                                        <SelectRoot onValueChange={({ value }) => setTipo(value[0])} mt={2} collection={types} >
                                        <SelectTrigger>
                                            <SelectValueText placeholder="Tipo do campo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types.items.map((type) => (
                                            <SelectItem item={type} key={type.value}>
                                                {type.label}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                        </SelectRoot>
                                    </Form>
                                    <Alert.Root mt={4} maxW={"360px"} status="info" title="This is the alert title">
                                        <Alert.Indicator />
                                        <Alert.Title>Você não pode alterar o tipo do campo após a sua criação.</Alert.Title>
                                    </Alert.Root>
                                    <Button onClick={()=>mutation.mutate({id_aba_ficha:sectionId,tipo_sub_aba_ficha:tipo,nome:titulo})} mt={"4"} mb={"4"}>Criar Campo</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}