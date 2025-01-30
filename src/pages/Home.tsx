/*
import { useState } from "react";
import { useUserStore } from "../stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
*/

import { CampaignCard } from "@/components/CampaignCard/CampaignCard";
import { Avatar } from "@/components/ui/avatar";
import { useColorMode } from "@/components/ui/color-mode";
import { getAllUserCreatedCampaigns, getAllUserPlayedCampaigns } from "@/services/campaignService";
import { ClientOnly, Skeleton, IconButton, Separator, Button, Presence, Input, Alert, For } from "@chakra-ui/react";
import { Box} from "@chakra-ui/react/box";
import { CardBody, CardRoot, CardTitle } from "@chakra-ui/react/card";
import { useQuery } from "@tanstack/react-query";
import { LuSun, LuMoon, LuLogOut } from "react-icons/lu";
import { Form, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    
    //const user = useUserStore((state) => useState(false));

    const {data: campanhasCriadas} = useQuery({
        queryKey: ["userCreatedCampaigns"],
        queryFn: getAllUserCreatedCampaigns
    })
    
    const {data: campanhasJogadas} = useQuery({
        queryKey: ["userPlayedCampaigns"],
        queryFn: getAllUserPlayedCampaigns
    })

    const { toggleColorMode, colorMode } = useColorMode()
    const [openDialogSm, setOpenDialogSm] = useState(false)
    const [idcampanha, setidcampanha] = useState("")
    const [idcampanhavalido, setidcampanhavalido] = useState(false)
    const username = 'User'

    function logout(){
        navigate("/grimoire/");
    }

    function showUserSettings(){
    alert('user settings')
    }

      function openDialog(){
        setOpenDialogSm(true)
      }

      function validateIdCampanha(){
        setidcampanhavalido(!idcampanhavalido) //depois mudar pra uma verificação real
      }

    return(
        <Presence 
            present={true}
            animationName={{ _open: "scale-in" }}
            animationDuration="slow"
        >
            <Box bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >

                <div className="header margin-sides flex place-content-between items-center" >
                    <span className="header-title agreloy">{username}'s Grimoire</span>
                    <div className="grid grid-cols-2 gap-x-4">
                        <Avatar className="cursor-pointer" onClick={()=>showUserSettings()} size={"lg"} name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

                        <ClientOnly fallback={<Skeleton boxSize="8" />}>
                            <IconButton onClick={()=>logout()} variant="ghost" size="lg">
                                {<LuLogOut />}
                            </IconButton>
                        </ClientOnly>
                    </div>
                </div>
                <Separator></Separator>

                <Dialog open={openDialogSm} onClose={setOpenDialogSm} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="bg-white padding-dialog relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle className="text-base text-large font-semibold text-gray-900">
                                    Embarcar em uma nova aventura?
                                </DialogTitle>
                                <div className="margin-top-s m-b-s">
                                    <p className="text text-gray-500">
                                        Se o Mestre de uma campanha compartilhar o código com você, você poderá participar como jogador.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                <Form>
                                    <Input color={"black"} value={idcampanha} onChange={(e) => setidcampanha(e.target.value)} mb={"2"} required resize="none" className="height" placeholder="Código da campanha"/>
                                </Form>
                                <Button color={"white"} bg={"black"} mb={"4"} onClick={()=>validateIdCampanha()} className="margin-top" disabled={!(idcampanha != "")}>Entrar na campanha</Button>
                            </div>
                            
                        <Presence 
                        animationName={{ _open: "fade-in",_closed:"fade-out" }}
                        animationDuration="moderate"
                        present={openDialogSm && !idcampanhavalido}>
                            <Alert.Root status="error" title="This is the alert title">
                                <Alert.Indicator />
                                <Alert.Title>O ID inserido não resultou em nenhuma campanha.</Alert.Title>
                            </Alert.Root>
                        </Presence>

                        </DialogPanel>
                        </div>
                    </div>
                </Dialog>

                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                    
                        <div className="flex col-span-2">
                            <div className="margin-top w-11/12 overflow-x-hidden">
                                <Button mt={"2%"} mb={"2%"} textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Nova campanha</Button>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Novo sistema</Button>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=> openDialog()}>Entrar em campanha</Button>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"}>Pesquisar sistemas</Button>
                            </div>
                            <div className="w-1/12">
                                <Separator h={"75vh"} orientation={"vertical"}></Separator>
                            </div>
                        </div>

                        <CardRoot className="h-[75vh] col-span-3" overflowY={"scroll"}>
                            <CardBody>
                                <CardTitle className="text-center padding-bottom">SUAS CAMPANHAS</CardTitle>
                                <Separator></Separator>
                                <For each={campanhasCriadas}>
                                    {(item) => <CampaignCard campaign={item}></CampaignCard>}
                                </For>
                            </CardBody>
                        </CardRoot>
                        <CardRoot className="h-[75vh] col-span-3" overflowY={"scroll"}>
                            <CardBody>
                                <CardTitle className="text-center padding-bottom">SUAS AVENTURAS</CardTitle>
                                <Separator></Separator>
                                <For each={campanhasJogadas}>
                                    {(item) => <CampaignCard campaign={item}></CampaignCard>}
                                </For>
                            </CardBody>
                        </CardRoot>
                        <div className="col-span-3">

                            <CardRoot overflowY={"scroll"} className="w-full h-[35vh]">
                                <CardBody>
                                    <CardTitle className="text-center padding-bottom">SEUS PERSONAGENS</CardTitle>
                                    <Separator></Separator>
                                </CardBody>
                            </CardRoot>
                            
                        </div>
                </div>
                <div className="text-right right-bottom">
                        
                    <ClientOnly fallback={<Skeleton boxSize="8" />}>
                    <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                        {colorMode === "light" ? <LuSun /> : <LuMoon />}
                    </IconButton>
                    </ClientOnly>
                    
                </div>
                
            </Box>
        </Presence>
    )
}