import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {Box, Button, Input,Text, Textarea} from "@chakra-ui/react";
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toaster, Toaster } from '../ui/toaster';
import { createMechanic } from '@/services/systemService';


export interface UserSettingsDialogSmProps {
    open:boolean,
    handleClose: (open: boolean) => void;
    handleCreate: (open: boolean) => void;
    system:string; //mudar para System depois
}

export const MechanicsCardDialog = ({
    open,
    handleClose,
    handleCreate,
    system
}: UserSettingsDialogSmProps) => {

    //const [needsIniciative,setNeedsIniciative] = useState("nao");
    const [titulo,setTitulo] = useState("");
    const [desc,setDesc] = useState("");
    const [acoes,setAcoes] = useState("");
    const [efeitos,setEfeitos] = useState("");

    function close(){
        //setNeedsIniciative("nao");
        handleClose(false);
    }

    const mutation = useMutation({
        mutationKey: ["createMech"],
        mutationFn: createMechanic,
        onSuccess: (data) => {
            console.log(data)
            toaster.create({
                        description: "Mecânica criada com sucesso!",
                        type: "success",
                        })
            handleCreate(false);
        },
        onError: (error) => {
            console.log(error);
            toaster.create({
            description: "Houve um problema criando a mecânica.",
            type: "error",
            })
        },
        });

    return(
    <Dialog open={open} onClose={close} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
                            <DialogPanel
                                transition
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[70vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold">
                                        Defina uma nova mecânica!
                                    </DialogTitle>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Box m={1} maxH={"60vh"} overflowY={"auto"}>
                                            <Input value={titulo} onInput={e => setTitulo(e.target.value)} mt={4} placeholder='Nome da mecânica'></Input>
                                            <Textarea value={desc} onInput={e => setDesc(e.target.value)} resize={"vertical"} maxH={"200px"} minH={"40px"} mt={4} placeholder='Qual é o objetivo desta mecânica?'></Textarea>
                                            {/*
                                            <Text mt={4}>Essa mecânica requer rolagem de iniciativa?</Text>
                                            <RadioGroup onValueChange={({value})=> setNeedsIniciative(value)} mt={"4"} display={"flex"} columnGap={4} defaultValue="nao">
                                                <Radio value="nao">Não, é uma mecânica independente de turnos</Radio>
                                                <Radio value="sim">Sim, meus jogadores precisam rolar iniciativa</Radio>
                                            </RadioGroup>
                                            <Presence   present={needsIniciative === 'sim'} 
                                                        animationName={{ _open: "fade-in", _closed:"fade-out" }}
                                                        animationDuration="slow">
                                                <NumberInputRoot mt={4}>
                                                    <NumberInputField placeholder='Rolar iniciativa a cada ... rodadas'></NumberInputField>
                                                </NumberInputRoot>
                                            </Presence>
                                             */}
                                            <Text mt={4}>Quais são as ações que seus jogadores podem realizar durante a mecânica? Escreva as ações separando-as por vírgulas como no exemplo:</Text>
                                            <Input value={acoes} onInput={e => setAcoes(e.target.value)} mt={2} placeholder='Atacar,Defender,Usar item,Usar feitiço,Outro'></Input>
                                            <Text mt={4}>Quais são os efeitos que seus jogadores podem receber após agirem? Escreva os efeitos separando-os por vírgulas como no exemplo:</Text>
                                            <Input value={efeitos} onInput={e => setEfeitos(e.target.value)} mt={2} placeholder='Desviou,Machucado,Desmaiado,Enfeitiçado,Outro'></Input>
                                        </Box>
                                    </Form>
                                    <Button onClick={()=>mutation.mutate({  nome:titulo,
                                                                            descricao:desc,
                                                                            acoes:[acoes],
                                                                            efeitos:[efeitos]})} mt={"4"} mb={"4"}>Criar Mecânica</Button>
                                </div>

                            </DialogPanel>
                        </Box>
                        </div>
                    </div>
                    <Toaster/>
    </Dialog>
    )
}