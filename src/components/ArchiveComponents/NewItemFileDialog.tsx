import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Flex,Input,Presence,Text, Textarea} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '../ui/file-upload';
import { StepperInput } from '../ui/stepper-input';
import { Radio, RadioGroup } from '../ui/radio';
import { NumberInputField, NumberInputRoot } from '../ui/number-input';
import { useState } from 'react';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    pastaId:string;
}

export const NewItemFileDialog = ({
    open,
    handleClose,
    pastaId,
}: DialogLgProps) => {

    const [rollDice,setRollDice] = useState("nao");

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
                        <Text fontSize={"2xl"}>Novo item</Text>

                            <Form>
                                <Input mt={4} placeholder='Nome do item'></Input>
                                <Flex mt={4} gapX={4}>
                                    <FileUploadRoot alignItems="stretch" maxFiles={1}>
                                        <FileUploadDropzone w={"full"} h={"full"}
                                            label="Imagem do item"
                                            description=".png ou .jpg de até 5MB"
                                        />
                                        <FileUploadList />
                                    </FileUploadRoot>
                                    <Box w={"full"}>
                                        <Textarea resize={"none"} h={"15vh"} placeholder='Descrição'></Textarea>
                                        <Flex mt={2} gapX={4} alignItems={"center"}>
                                            <Text className='text'>Quantidade</Text>
                                            <StepperInput defaultValue="0" />
                                        </Flex>
                                        <Text mt={2} className='text'>Este item dispara uma rolagem de dado?</Text>
                                        <RadioGroup onValueChange={({value})=>setRollDice(value)} mt={"4"} display={"flex"} columnGap={4} defaultValue="nao">
                                            <Radio value="nao">Não</Radio>
                                            <Radio value="sim">Sim</Radio>
                                        </RadioGroup>
                                        <Box mt={4} className="flex gap-x-2 items-center">
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="qtd"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>d</Text>
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="dado"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>+</Text>
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="bonus"></NumberInputField>
                                                </NumberInputRoot>
                                        </Box>
                                    </Box>
                                </Flex>

                            </Form>
                            
                            <Flex mt={8} justifyContent={"center"}>
                                <Button>Criar item</Button>
                            </Flex>
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
    </Dialog>
    )
}