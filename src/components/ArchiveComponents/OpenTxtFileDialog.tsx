import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Editable,Flex,IconButton,Text} from "@chakra-ui/react";
import { LuSave, LuTrash2 } from 'react-icons/lu';
import { File } from '@/interfaces/Models';
import { createFile, deleteFile, updateFile } from '@/services/campaignService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toaster,Toaster } from '../ui/toaster';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    file:File;
}

export const OpenTxtFileDialog = ({
    open,
    handleClose,
    handleConfirm,
    file,
}: DialogLgProps) => {

    const file_criador = sessionStorage.getItem('isGameMaster');
    
    const [titulo,setTitulo] = useState(file.nome);
    const [conteudo,setConteudo] = useState(file.conteudo);

    const mutationEdit = useMutation({
        mutationKey: ["updateFile"],
        mutationFn: updateFile, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Arquivo modificado com sucesso!",
                type: "success",
            })
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a edição do arquivo",
            type: "error",
            })
        },
        });

    const mutationDelete = useMutation({
        mutationKey: ["deleteFile"],
        mutationFn: deleteFile, 
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                description: "Arquivo excluído com sucesso!",
                type: "success",
            })
            handleConfirm(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a deleção do arquivo",
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
                        className=" max-h-[90vh] padding-dialog-lg relative transform overflow-y-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <Box m={2} maxH={"74vh"} overflowY={"auto"}>
                            {
                                file_criador === "true" ?
                                <div>
                                    <Editable.Root p={2} fontSize={"2xl"} value={titulo} onInput={e => setTitulo(e.target.value)}>
                                        <Editable.Preview />
                                        <Editable.Input  />
                                    </Editable.Root>
                                    <Editable.Root p={2} className='text' value={conteudo} onInput={e => setConteudo(e.target.value)}>
                                        <Editable.Preview />
                                        <Editable.Textarea h={"40vh"} maxH={"40vh"}  />
                                    </Editable.Root>
                            
                                    <Flex mt={8} gapX={1} justifyContent={"end"}>
                                        <IconButton onClick={()=>mutationEdit.mutate({  id_arquivo:file.id,
                                                                                        novo_conteudo: conteudo,
                                                                                        novo_nome:titulo,
                                        })} aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                        <IconButton onClick={()=>mutationDelete.mutate(file.id)} aria-label="Apagar"> <LuTrash2/> </IconButton>
                                    </Flex>
                                </div>
                                :
                                <div>
                                    <Text fontSize={"2xl"}>{file.nome}</Text>
                                    <Text mt={2}>{file.conteudo}</Text>
                                </div>
                            }
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <Toaster/>
    </Dialog>
    )
}