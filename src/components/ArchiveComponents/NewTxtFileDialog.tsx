import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Flex,Input,Text, Textarea } from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { Radio, RadioGroup } from '../ui/radio';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    pastaId:string;
}

export const NewTxtFileDialog = ({
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
                        className=" h-[90vh] padding-dialog-lg relative transform overflow-y-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="">
                            <Text fontSize={"2xl"}>Novo arquivo de texto</Text>
                        </div>
                        <Box m={2} maxH={"74vh"} overflowY={"auto"}>

                            <Form>
                                <Input mt={4} placeholder='Nome do arquivo'></Input>
                                <Textarea minH={"40px"} mt={4} resize={"vertical"} h={"50vh"} maxH={"50vh"} placeholder='Conteúdo do arquivo'></Textarea>

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