import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Alert, Box,Button,Input,Text } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { deleteFolder } from '@/services/campaignService';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: () => void;
    pastaId:number;
    pastaNome:string;
}

export const DeleteSubFolderDialog = ({
    open,
    handleClose,
    handleConfirm,
    pastaId,
    pastaNome
}: DialogLgProps) => {

    const mutation = useMutation({
            mutationKey: ["deleteFolder"],
            mutationFn: deleteFolder, 
            onSuccess: (data) => {
                console.log(data)
                toaster.create({
                    description: "Pasta excluída com sucesso!",
                    type: "success",
                })
                handleConfirm();
            },
            onError: (error) => {
                console.log(error);
                toaster.create({
                description: "Houve um problema durante a deleção da pasta",
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
                                
                                <Text fontSize={"2xl"}>Deletar pasta {pastaNome}?</Text>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Alert.Root  maxW={"360px"}  mt={4} status="error" title="This is the alert title">
                                            <Alert.Indicator />
                                            <Alert.Title>Ao apagar uma pasta, todos os arquivos e sub-pastas dentro dela serão permanentemente excluídos.</Alert.Title>
                                        </Alert.Root>
                                    </Form>
                                    <Button onClick={()=>mutation.mutate(pastaId)} mt={"4"} mb={"4"}>Deletar pasta</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}