import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Flex,Input,Text} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '../ui/file-upload';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    pastaId:string;
}

export const NewImgFileDialog = ({
    open,
    handleClose,
    pastaId,
}: DialogLgProps) => {

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
                        <Text fontSize={"2xl"}>Novo arquivo de imagem</Text>

                            <Form>
                                <Input mt={4} placeholder='Nome do arquivo'></Input>
                                <FileUploadRoot mt={4} alignItems="stretch" maxFiles={1}>
                                    <FileUploadDropzone w={"full"} h={"36vh"}
                                        label="Faça o upload da imagem"
                                        description=".png ou .jpg de até 5MB"
                                    />
                                    <FileUploadList />
                                </FileUploadRoot>

                            </Form>
                            
                            <Flex mt={8} justifyContent={"center"}>
                                <Button>Criar arquivo</Button>
                            </Flex>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}