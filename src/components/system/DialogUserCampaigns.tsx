import { System, SystemType } from "@/interfaces/Models";
import { CreateNewCampaignPayload, CreateNewSystemPayload, TemporarySystemPayload } from "@/interfaces/ServicePayload";
import { createNewCampaign } from "@/services/campaignService";
import { createNewSystem } from "@/services/systemService";
import { useUserStore } from "@/stores/user/user.store";
import {Alert, Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";


export interface SystemListCardProps {
    system: System; //mudar pra System
    open:boolean;
    handleClose: (open: boolean) => void;
}

export const DialogUserCampaigns = ({
    system,
    open,
    handleClose
}: SystemListCardProps) => {
    const user = useUserStore.getState().user

    let ownSystem = false; 

    if(system.id_criador === 0/*user.id*/) {
        ownSystem = true; 
    }

    let systemCopy: System;
    const navigate = useNavigate();
    
    const [title,setTitle] = useState("");
    
    const setCampaignTitle = (e: any) => {
        const value = e.target.value;
        setTitle(value);
    };

    async function copySystem(){
        const resOriginImg = await fetch(`http://localhost:8081/get/${system?.id_foto}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const originRes = await resOriginImg.json()
          const originImg = originRes.image

        const resImg = await fetch("http://localhost:8081/upload", {
            method:"POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({img: originImg})
        })
        const data = await resImg.json()
            
        const newSystemPayload: CreateNewSystemPayload = {
            id_foto: data.data._id,
            nome: system.nome+" - Cópia privada",
            descricao: system.descricao
        }

        console.log(data)
        console.log(data.data._id)
        console.log(newSystemPayload)

        const systemType: SystemType =  "PRIVADO";
        const temporaryJson: TemporarySystemPayload = {
            payload: newSystemPayload,
            systemType: systemType
        }
        try {
            systemCopy = await createNewSystem(temporaryJson)
        } catch (error) {
            console.log(error);
        }
        
        //newSystem.mutate(temporaryJson)
    }

    const newSystem = useMutation({
        mutationKey: ["createNewSystem"],
        mutationFn: createNewSystem,
        onSuccess: (data: System) => {
            console.log(data)
            systemCopy = data
            console.log(systemCopy)
        },
        onError: (error) => {
            console.log(error);
        },
    });

    async function navigateNewCampaign(){
        //fazer com que essa função crie um novo objeto campanha associado ao usuário como mestre
        //navigate("/grimoire/campaign");
        const resImg = await fetch("http://localhost:8081/upload", {
            method:"POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({img: ''})
        })
        const data = await resImg.json()
        console.log(data.data._id)
        
        if(!ownSystem) {
            await copySystem();

            const newCampaignPayload: CreateNewCampaignPayload = {
                titulo: title,
                id_foto: data.data._id,
                id_sistema: systemCopy.id,
                descricao: '',
            }
            newCampaign.mutate(newCampaignPayload)
        } else {
            const newCampaignPayload: CreateNewCampaignPayload = {
                titulo: title,
                id_foto: data.data._id,
                id_sistema: system.id,
                descricao: '',
            }
            newCampaign.mutate(newCampaignPayload)
        }
        
    }

    const newCampaign = useMutation({
        mutationKey: ["createNewCampaign"],
        mutationFn: createNewCampaign,
        onSuccess: (data) => {
            useUserStore
            .getState()
            .setCreatedCampaigns([...useUserStore.getState().createdCampaigns, data]);
            console.log(data)
            sessionStorage.setItem('currentCampaignId', data.id);
            navigate("/grimoire/campaign");
        },
        onError: (error) => {
            console.log(error);
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
                            className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[45vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Text fontSize={"2xl"}>Começar uma nova campanha?</Text>
                                </div>
                            </div>
                            </div>
                            <Form>
                                <Input mb={"2"} onChange={setCampaignTitle} required placeholder="Título da campanha"/>
                            </Form>
                            <Flex justifyContent={"center"}>
                                <Button mb={"4"} className="margin-top" onClick={()=>navigateNewCampaign()} >Criar campanha</Button>
                            </Flex>

                        </DialogPanel>
                    </Box>
                    </div>
                </div>
            </Dialog>
    )
}