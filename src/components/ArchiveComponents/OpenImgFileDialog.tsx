import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Editable,Flex,IconButton,Input,Text,Image} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { LuSave, LuTrash2 } from 'react-icons/lu';
import { HiUpload } from 'react-icons/hi';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    file:unknown;
}

export const OpenImgFileDialog = ({
    open,
    handleClose,
    file
}: DialogLgProps) => {

    const file_criador = true;

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
                                    <Image mt={2} fit={"contain"} w={"full"} src="../../../src/assets/login_image.png"/>
                            
                                    
                                    <Flex mt={8} gapX={2} justifyContent={"space-between"}>
                                        <FileUploadRoot>
                                            <FileUploadTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                <HiUpload /> Modificar imagem
                                                </Button>
                                            </FileUploadTrigger>
                                            <FileUploadList />
                                        </FileUploadRoot>
                                        <Flex gapX={1}>
                                            <IconButton aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                            <IconButton aria-label="Apagar"> <LuTrash2/> </IconButton>
                                        </Flex>
                                    </Flex>
                                </div>
                                :
                                <div>
                                    <Text fontSize={"2xl"}>{file.nome}</Text>
                                    <Image mt={4} fit={"contain"} w={"full"} src="../../../src/assets/login_image.png"/>
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