import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Alert, Box, Button, Input, Presence,Text } from "@chakra-ui/react";
import { toaster, Toaster } from '../ui/toaster';


export interface DialogCampaignCodeProps {
    open:boolean,
    handleClose: (open: boolean) => void;
}

export const DialogCampaignCode = ({
    open,
    handleClose,
}: DialogCampaignCodeProps) => {

    const campaignId = sessionStorage.getItem('currentCampaignId')||"";

    function copiarCodigo(){
        navigator.clipboard.writeText(campaignId);
        toaster.create({
            description: "Código copiado!",
            type: "success",
            })
    }

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
                                        Compartilhar código de campanha
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Text>Copie o código abaixo e compartilhe com seus jogadores para que eles consigam acessar sua campanha no Grimoire.</Text>
                                    
                                    <Input mt={4} value={campaignId} disabled cursor={"default"}></Input>

                                    <Button onClick={()=>copiarCodigo()} w={"full"} mt={"4"} mb={"4"}>Copiar código</Button>
                                </div>
                                
                            <Presence 
                                animationName={{ _open: "fade-in",_closed:"fade-out" }}
                                animationDuration="moderate"
                                present={false}>
                                <Alert.Root  maxW={"360px"}  status="error" title="This is the alert title">
                                    <Alert.Indicator />
                                    <Alert.Title>Confirme com sua senha para alterar suas informações.</Alert.Title>
                                </Alert.Root>
                            </Presence>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}