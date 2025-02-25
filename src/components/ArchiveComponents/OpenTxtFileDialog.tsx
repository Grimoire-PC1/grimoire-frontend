import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Editable,Flex,IconButton,Text} from "@chakra-ui/react";
import { LuSave, LuTrash2 } from 'react-icons/lu';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    file:unknown;
}

export const OpenTxtFileDialog = ({
    open,
    handleClose,
    file,
}: DialogLgProps) => {

    const file_criador = true; //futuramente não vai ser um boolean, vai ser um id e teremos que comparar o id do criador com o id do usuário
    const file_conteudo = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ipsum massa, ornare quis turpis a, laoreet scelerisque est. Aliquam nec aliquam enim. Fusce pharetra faucibus pretium. Mauris erat dolor, bibendum et auctor ultricies, pulvinar a turpis. Vestibulum non nisl luctus, mattis lorem volutpat, luctus nisi. Duis pretium nulla non nibh consequat suscipit. Nunc dignissim vitae diam non lobortis. Suspendisse nec est ac eros eleifend rutrum sit amet eget ex. Vestibulum a dui nibh. Quisque ante leo, pharetra et purus in, elementum elementum nisl. Proin elementum imperdiet dignissim. Proin luctus nibh in urna malesuada, ut ultricies lorem sagittis. Fusce lobortis cursus elit eu venenatis. Curabitur blandit imperdiet risus in finibus. Suspendisse consequat rutrum quam, sed pharetra tellus suscipit condimentum. Vivamus nibh orci, sodales ullamcorper accumsan quis, venenatis in nisl.

In ut lorem nisi. Phasellus lacus est, vehicula vitae finibus sed, laoreet sed odio. Phasellus scelerisque purus lorem. Nam in sollicitudin ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas tempus ante aliquam mattis pulvinar. Etiam ut rutrum nunc. Fusce lorem mauris, convallis et orci ac, eleifend efficitur orci. Quisque nec enim eget risus volutpat dictum id vitae tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ipsum massa, ornare quis turpis a, laoreet scelerisque est. Aliquam nec aliquam enim. Fusce pharetra faucibus pretium. Mauris erat dolor, bibendum et auctor ultricies, pulvinar a turpis. Vestibulum non nisl luctus, mattis lorem volutpat, luctus nisi. Duis pretium nulla non nibh consequat suscipit. Nunc dignissim vitae diam non lobortis. Suspendisse nec est ac eros eleifend rutrum sit amet eget ex. Vestibulum a dui nibh. Quisque ante leo, pharetra et purus in, elementum elementum nisl. Proin elementum imperdiet dignissim. Proin luctus nibh in urna malesuada, ut ultricies lorem sagittis. Fusce lobortis cursus elit eu venenatis. Curabitur blandit imperdiet risus in finibus. Suspendisse consequat rutrum quam, sed pharetra tellus suscipit condimentum. Vivamus nibh orci, sodales ullamcorper accumsan quis, venenatis in nisl.

In ut lorem nisi. Phasellus lacus est, vehicula vitae finibus sed, laoreet sed odio. Phasellus scelerisque purus lorem. Nam in sollicitudin ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas tempus ante aliquam mattis pulvinar. Etiam ut rutrum nunc. Fusce lorem mauris, convallis et orci ac, eleifend efficitur orci. Quisque nec enim eget risus volutpat dictum id vitae tellus.`

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
                                file_criador ?
                                <div>
                                    <Editable.Root p={2} fontSize={"2xl"} defaultValue={file.nome}>
                                        <Editable.Preview />
                                        <Editable.Input  />
                                    </Editable.Root>
                                    <Editable.Root p={2} className='text' defaultValue={file_conteudo}>
                                        <Editable.Preview />
                                        <Editable.Textarea h={"40vh"} maxH={"40vh"}  />
                                    </Editable.Root>
                            
                                    <Flex mt={8} gapX={1} justifyContent={"end"}>
                                        <IconButton aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                        <IconButton aria-label="Apagar"> <LuTrash2/> </IconButton>
                                    </Flex>
                                </div>
                                :
                                <div>
                                    <Text fontSize={"2xl"}>{file.nome}</Text>
                                    <Text mt={2}>{file_conteudo}</Text>
                                </div>
                            }
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}