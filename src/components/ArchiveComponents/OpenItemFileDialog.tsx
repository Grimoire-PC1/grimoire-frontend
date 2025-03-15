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
import { File, Item } from '@/interfaces/Models';
import { deleteFile, deleteItem, updateFile, updateItem } from '@/services/campaignService';
import { useMutation } from '@tanstack/react-query';
import { Toaster, toaster } from '../ui/toaster';

export interface DialogLgProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleConfirm: (open: boolean) => void;
    file:File;
    item:Item;
}

export const OpenItemFileDialog = ({
    open,
    handleClose,
    handleConfirm,
    file,
    item,
}: DialogLgProps) => {
    console.log("arquivo numero "+file.id)
    console.log(item);

    const [rollDice,setRollDice] = useState(item.rolar_dado); //pegar do próprio item nesse caso
    const file_criador = sessionStorage.getItem('isGameMaster');
    const file_image = true;

    const [titulo,setTitulo] = useState(item.nome);
    const [descricao, setDescricao] = useState(item.descricao);
    const [qtd, setQtd] = useState(item.quantidade);
    const [qtdDado, setQtdDado] = useState(item.qtd_dados);
    const [tipoDado, setTipoDado] = useState(item.tipo_dado);
    const [bonusDado, setBonusDado] = useState(item.bonus_dado);

    const [diceRoll, setDiceRoll] = useState(false);
    const [rollValue,setRollValue] = useState(0);

    function rollDices(){
        let v = 0;
        for(let i = 0; i < item.qtd_dados;i++){
            const r = Math.floor(Math.random() * (item.tipo_dado) + 1)
            v+=r;
        }

        if(item.bonus_dado){
            v+=item.bonus_dado;
        }

        setRollValue(v);
        setDiceRoll(true);
    }
    
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
    
    const mutationEditItem = useMutation({
        mutationKey: ["updateItem"],
        mutationFn: updateItem, 
        onSuccess: (data) => {
            mutationEdit.mutate({id_arquivo: file.id,novo_nome:titulo})
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
        onSuccess: () => {
            mutationDeleteItem.mutate(item.id);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema durante a deleção do arquivo",
            type: "error",
            })
        },
        });
    
    const mutationDeleteItem = useMutation({
        mutationKey: ["deleteItem"],
        mutationFn: deleteItem, 
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


                                <Flex m={2} gapX={4}>
                                    {
                                        /*
                                        {
                                        img == "" ?

                                        <Box>
                                            <Image rounded={"xl"} maxH={"50vh"} w={"50vw"} fit={"cover"} src={img}/>
                                        </Box>
                                        :
                                        <FileUploadRoot alignItems="stretch" maxFiles={1} onFileChange={handleUploadImage}>
                                            <FileUploadDropzone w={"full"} h={"full"}
                                                label="Imagem do item"
                                                description=".png ou .jpg de até 5MB"
                                            />
                                            <FileUploadList />
                                        </FileUploadRoot>
                                        }
                                        */
                                    }
                                    

                                    <Box w={"full"}>
                                        <Textarea value={descricao} onInput={e => setDescricao(e.target.value)} resize={"none"} h={"15vh"} placeholder='Descrição'></Textarea>
                                        <Flex mt={2} gapX={4} alignItems={"center"}>
                                            <Text className='text'>Quantidade</Text>
                                            <StepperInput defaultValue={qtd} onValueChange={({value})=>setQtd(value)} />
                                        </Flex>
                                        <Text mt={2} className='text'>Este item dispara uma rolagem de dado?</Text>
                                        <RadioGroup onValueChange={({value})=>setRollDice(value)} mt={"4"} display={"flex"} columnGap={4} defaultValue={item.rolar_dado}>
                                            <Radio value="nao">Não</Radio>
                                            <Radio value="sim">Sim</Radio>
                                        </RadioGroup>
                                        <Box mt={4} className="flex gap-x-2 items-center">
                                                <NumberInputRoot w={"5vw"} defaultValue={qtdDado} onValueChange={({value})=>setQtdDado(value)} disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="qtd"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>d</Text>
                                                <NumberInputRoot w={"5vw"} defaultValue={tipoDado} onValueChange={({value})=>setTipoDado(value)} disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="dado"></NumberInputField>
                                                </NumberInputRoot>
                                                <Text>+</Text>
                                                <NumberInputRoot w={"5vw"} defaultValue={bonusDado} onValueChange={({value})=>setBonusDado(value)} disabled={rollDice === 'nao'}>
                                                    <NumberInputField disabled={rollDice === 'nao'} placeholder="bonus"></NumberInputField>
                                                </NumberInputRoot>
                                                <IconButton onClick={()=>rollDices()}><LuDices/></IconButton>
                                        </Box>
                                    </Box>
                                </Flex>
                                
                                <Flex mt={2} p={2} gapX={2} justifyContent={"end"}>
                                    {
                                        /*
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
                                        */
                                    }
                                    
                                    <Flex gapX={1}>
                                        <IconButton onClick={()=>mutationEditItem.mutate({
                                                id:item.id,
                                                novo_nome:titulo,
                                                nova_descricao:descricao,
                                                nova_qtd_dados:qtdDado,
                                                novo_tipo_dado:tipoDado,
                                                novo_bonus_dado:bonusDado,
                                                novo_rolar_dado:rollDice,
                                                nova_quantidade:qtd,
                                        })} aria-label="Salvar alterações"> <LuSave/> </IconButton>
                                        <IconButton onClick={()=>mutationDelete.mutate(file.id)} aria-label="Apagar"> <LuTrash2/> </IconButton>
                                    </Flex>
                                </Flex>
                            </div>
                            :
                            <div>
                                <Text fontSize={"2xl"}>{file.nome}</Text>


                                <Flex mt={4}>
                                    {
                                        /*
                                    {
                                        file_image ?

                                        <Box mr={4}>
                                            <Image rounded={"xl"} maxH={"50vh"} w={"50vw"} fit={"cover"} src="../../../src/assets/login_image.png"/>
                                        </Box>
                                        :
                                        <div></div>

                                    }
                                        
                                        */
                                    }
                                    <Box w={"full"}>
                                        <Text className='text'>{item.descricao}</Text>
                                        <Flex mt={4} gapX={4} alignItems={"center"}>
                                            <Text className='text'>Quantidade</Text>
                                            <StepperInput value={item.quantidade} />
                                        </Flex>
                                        {
                                            rollDice ?
                                            <div>
                                                <Text mt={4} className='text'>Este item dispara uma rolagem de dado.</Text>
                                                <Box mt={4} className="flex gap-x-2 items-center">
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={item.qtd_dados}></NumberInputField>
                                                    </NumberInputRoot>
                                                    <Text>d</Text>
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={item.tipo_dado}></NumberInputField>
                                                    </NumberInputRoot>
                                                    <Text>+</Text>
                                                    <NumberInputRoot disabled>
                                                        <NumberInputField defaultValue={item.bonus_dado}></NumberInputField>
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
        <Toaster/>
    </Dialog>
    )
}