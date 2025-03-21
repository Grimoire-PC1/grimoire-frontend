import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Alert, Box, Button, Text, } from "@chakra-ui/react";
import { toaster, Toaster } from '../ui/toaster';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteSystem } from '@/services/systemService';


export interface DialogProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    systemId:number;
    systemTitle:string;
}

export const DialogDeleteSystem = ({
    open,
    handleClose,
    systemId,
    systemTitle
}: DialogProps) => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ["deleteSystem"],
        mutationFn: deleteSystem,
        onSuccess: () => {
            toaster.create({
                        description: "Sistema deletado com sucesso!",
                        type: "success",
                        })
            navigate('/grimoire/home');
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
                        description: "Houve um problema durante a deleção. Possivelmente, ainda há campanhas ativas utilizando este sistema.",
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
                                        Deseja excluir {systemTitle}?
                                    </DialogTitle>
                                    <Text>Caso deseje excluir um sistema, certifique-se de excluir antes as campanhas que usam este sistema.</Text>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    
                                    <Alert.Root  maxW={"360px"}  mt={4} status="error" title="This is the alert title">
                                        <Alert.Indicator />
                                        <Alert.Title>Esta ação não poderá ser desfeita.</Alert.Title>
                                    </Alert.Root>
                                    <Button onClick={()=>mutation.mutate(systemId)} mt={"4"} mb={"4"}>Excluir sistema</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}