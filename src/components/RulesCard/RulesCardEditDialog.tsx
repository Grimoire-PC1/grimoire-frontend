import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Box, Button, Input, Textarea} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { createRule, updateRule } from '@/services/systemService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toaster } from '../ui/toaster';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    ruleId:string;
    ruleName:string;
    ruleDesc:string;
}

export const RulesCardEditDialog = ({
    open,
    handleClose,
    handleConfirm,
    ruleId,
    ruleName,
    ruleDesc
}: UserSettingsDialogSmProps) => {

        const [titulo,setTitulo] = useState(ruleName);
        const [desc,setDesc] = useState(ruleDesc);
    
        const mutation = useMutation({
            mutationKey: ["createRule"],
            mutationFn: updateRule,
            onSuccess: (data) => {
              console.log(data)
              toaster.create({
                          description: "Regra modificada com sucesso!",
                          type: "success",
                          })
              handleConfirm(false);
            },
            onError: (error) => {
              console.log(error);
              toaster.create({
                description: "Houve um problema modificando a regra.",
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
                                        Modificar regra de {ruleName}?
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome da regra' defaultValue={ruleName}></Input>
                                        <Textarea value={desc} onInput={e => setDesc(e.target.value)} mt={2} minH={"40px"} maxH={"200px"} resize={"vertical"} placeholder='O que essa regra impõe?' defaultValue={ruleDesc}></Textarea>
                                    </Form>
                                    <Button onClick={()=>mutation.mutate({id_regra: parseInt(ruleId),titulo: titulo, descricao: desc})} mt={"4"} mb={"4"}>Modificar Regra</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}