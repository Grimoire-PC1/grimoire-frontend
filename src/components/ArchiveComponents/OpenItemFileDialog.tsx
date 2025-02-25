import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Box,Button,Editable,Flex,Input,Presence,Text, Textarea,Image, IconButton} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { FileUploadDropzone, FileUploadList, FileUploadRoot, FileUploadTrigger } from '../ui/file-upload';
import { StepperInput } from '../ui/stepper-input';
import { Radio, RadioGroup } from '../ui/radio';
import { NumberInputField, NumberInputRoot } from '../ui/number-input';
import { useState } from 'react';
import { LuDices, LuSave, LuTrash2 } from 'react-icons/lu';
import { HiUpload } from 'react-icons/hi';
import { DialogRollDice } from '../Dialog/DialogRollDice';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    file:unknown;
}

export const OpenItemFileDialog = ({
    open,
    handleClose,
    file,
}: DialogLgProps) => {

    const [rollDice,setRollDice] = useState("sim"); //pegar do próprio item nesse caso
    const file_criador = true;
    const file_image = true;

    const [diceRoll, setDiceRoll] = useState(false);
    const [rollValue,setRollValue] = useState(0);

    function rollDices(){
        let v = 0;
        for(let i = 0; i < file.qtd_dados;i++){
            const r = Math.floor(Math.random() * (file.tipo_dado) + 1)
            v+=r;
        }

        if(file.bonus_dado){
            v+=parseInt(file.bonus_dado);
        }

        setRollValue(v);
        setDiceRoll(true);
    }

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


                                <Flex m={2} gapX={4}>
                                    {
                                        file_image ?

                                        <Box>
                                            <Image rounded={"xl"} maxH={"50vh"} w={"50vw"} fit={"cover"} src="../../../src/assets/login_image.png"/>
                                        </Box>
                                        :
                                        <FileUploadRoot alignItems="stretch" maxFiles={1}>
                                            <FileUploadDropzone w={"full"} h={"full"}
                                                label="Imagem do item"
                                                description=".png ou .jpg de até 5MB"
                                            />
                                            <FileUploadList />
                                        </FileUploadRoot>

                                    }
                                    <Box w={"full"}>
                                        <Textarea defaultValue={file.descricao||''} resize={"none"} h={"15vh"} placeholder='Descrição'></Textarea>
                                        <Flex mt={2} gapX={4} alignItems={"center"}>
                                            <Text className='text'>Quantidade</Text>
                                            <StepperInput defaultValue={file.quantidade||1} />
                                        </Flex>
                                        <Text mt={2} className='text'>Este item dispara uma rolagem de dado?</Text>
                                        <RadioGroup onValueChange={({value})=>setRollDice(value)} mt={"4"} display={"flex"} columnGap={4} defaultValue={file.rolar_dado || "sim"}>
                                            <Radio value="nao">Não</Radio>
                                            <Radio value="sim">Sim</Radio>
                                        </RadioGroup>
                                        <Box mt={4} className="flex gap-x-2 items-center">
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField defaultValue={file.qtd_dados || 1} disabled={rollDice === 'nao'} placeholder="qtd"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>d</Text>
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField defaultValue={file.tipo_dado || 20} disabled={rollDice === 'nao'} placeholder="dado"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>+</Text>
                                                <NumberInputRoot disabled={rollDice === 'nao'}>
                                                    <NumberInputField defaultValue={file.bonus_dado || 0} disabled={rollDice === 'nao'} placeholder="bonus"></NumberInputField>
                                                </NumberInputRoot>
                                        </Box>
                                    </Box>
                                </Flex>
                                
                                <Flex mt={2} p={2} gapX={2} justifyContent={"space-between"}>
                                    {
                                        file_image ?
                                        <FileUploadRoot>
                                            <FileUploadTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                <HiUpload /> Modificar imagem
                                                </Button>
                                            </FileUploadTrigger>
                                            <FileUploadList />
                                        </FileUploadRoot>
                                        :
                                        <div></div>
                                    }
                                    
                                    <Flex gapX={1}>
                                        <IconButton aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                        <IconButton aria-label="Apagar"> <LuTrash2/> </IconButton>
                                    </Flex>
                                </Flex>
                            </div>
                            :
                            <div>
                                <Text fontSize={"2xl"}>{file.nome}</Text>


                                <Flex mt={4}>
                                    {
                                        file_image ?

                                        <Box mr={4}>
                                            <Image rounded={"xl"} maxH={"50vh"} w={"50vw"} fit={"cover"} src="../../../src/assets/login_image.png"/>
                                        </Box>
                                        :
                                        <div></div>

                                    }
                                    <Box w={"full"}>
                                        <Text className='text'>{file.descricao||'descricao do item'}</Text>
                                        <Flex mt={4} gapX={4} alignItems={"center"}>
                                            <Text className='text'>Quantidade</Text>
                                            <StepperInput defaultValue={file.quantidade||1} />
                                        </Flex>
                                        {
                                            rollDice ?
                                            <div>
                                                <Text mt={4} className='text'>Este item dispara uma rolagem de dado.</Text>
                                                <Box mt={4} className="flex gap-x-2 items-center">
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={file.qtd_dados || 1}></NumberInputField>
                                                    </NumberInputRoot>
                                                    <Text>d</Text>
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={file.tipo_dado || 20}></NumberInputField>
                                                    </NumberInputRoot>
                                                    <Text>+</Text>
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={file.bonus_dado || 0}></NumberInputField>
                                                    </NumberInputRoot>
                                                    <IconButton onClick={()=>rollDices()}><LuDices/></IconButton>
                                                </Box>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                        }
                                        
                                    </Box>
                                </Flex>
                            </div>
                        }
                        </Box>

                    </DialogPanel>
                </Box>
            </div>
        </div>
        <DialogRollDice open={diceRoll} handleClose={setDiceRoll} value={rollValue}/>
    </Dialog>
    )
}