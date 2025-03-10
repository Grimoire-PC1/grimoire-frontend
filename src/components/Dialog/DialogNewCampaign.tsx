import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Alert, Box, Button, createListCollection, Flex, Input, } from "@chakra-ui/react";
import { Form, useNavigate } from 'react-router-dom';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user/user.store';
import { CreateNewCampaignPayload } from '@/interfaces/ServicePayload';
import { createNewCampaign } from '@/services/campaignService';
import { useState } from 'react';
import { System } from '@/interfaces/Models';

export interface DialogCampaignCodeProps {
    open:boolean,
    handleClose: (open: boolean) => void;
}

export const DialogNewCampaign = ({
    open,
    handleClose
}: DialogCampaignCodeProps) => {
    const navigate = useNavigate();

    const userSystems: System[] = useUserStore.getState().userSystems

    const [selectedSystem,setSelectedSystem] = useState("")

    const types = createListCollection({
    items: userSystems,
    })

    const [title,setTitle] = useState("");

    const setCampaignTitle = (e: any) => {
        const value = e.target.value;
        setTitle(value);
      };

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
          
        const newCampaignPayload: CreateNewCampaignPayload = {
            titulo: title,
            id_foto: data.data._id,
            id_sistema: 1,
            descricao: '',
        }
        newCampaign.mutate(newCampaignPayload)
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
                    className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle className="text-base text-large font-semibold ">
                            Começar uma nova campanha?
                        </DialogTitle>
                        <div className="margin-top-s m-b-s">
                            <p className="text ">
                                Você começará uma nova história como Mestre do Jogo. Informe o título da campanha e o sistema que ela usa para começar!
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                        <Form>
                            <Input mb={"2"} onChange={setCampaignTitle} required placeholder="Título da campanha"/>
                            <SelectRoot mt={2} collection={types} >
                            <SelectTrigger>
                                <SelectValueText placeholder="Sistema" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.items.map((type) => (
                                <SelectItem item={type} key={type.id}>
                                    {type.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </SelectRoot>
                        </Form>

                        <Alert.Root mt={4} status="info">
                                        <Alert.Indicator />
                                        <Alert.Title>Você só pode usar seus sistemas ou cópias privadas de sistemas externos para utilizar em suas campanhas. Use a aba "Sistemas Disponíveis" para procurar sistemas ou crie o seu próprio!</Alert.Title>
                                    </Alert.Root>

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