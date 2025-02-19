/*
import { useState } from "react";
import { useUserStore } from "../stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
*/

import { CampaignCard } from "@/components/CampaignCard/CampaignCard";
import { Avatar } from "@/components/ui/avatar";
import { createNewCampaign, getAllUserCreatedCampaigns, getAllUserPlayedCampaigns } from "@/services/campaignService";
import { ClientOnly, Skeleton, IconButton, Separator, Button, Presence, Input, Alert, For, Center, Flex, MenuRoot, MenuTrigger, MenuContent, MenuItem, DialogRoot, DialogTrigger, DialogContent } from "@chakra-ui/react";
import { Box} from "@chakra-ui/react/box";
import { CardBody, CardHeader, CardRoot, CardTitle } from "@chakra-ui/react/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LuLogOut } from "react-icons/lu";
import { Form, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react";
import { DialogLg } from "@/components/Dialog/DialogLg";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { getAllUserCharacters } from "@/services/characterService";
import { CharacterProfile } from "@/components/CharacterProfile/CharacterProfile";
import { AddNewCharacterProfile } from "@/components/CharacterProfile/AddNewCharacterProfile";
import { UserSettingsDialogSm } from "@/components/Dialog/DialogSm";
import { CreateNewCampaignPayload, CreateNewSystemPayload, TemporarySystemPayload } from "@/interfaces/ServicePayload";
import { createNewSystem } from "@/services/systemService";
import { SystemType } from "@/interfaces/Models";
import { useUserStore } from "@/stores/user/user.store";

export default function Home() {
    const navigate = useNavigate();
    
    //const user = useUserStore((state) => useState(false));

    const {data: campanhasCriadas} = useQuery({
        queryKey: ["userCreatedCampaigns"],
        queryFn: getAllUserCreatedCampaigns,
    })
    
    const {data: campanhasJogadas} = useQuery({
        queryKey: ["userPlayedCampaigns"],
        queryFn: getAllUserPlayedCampaigns
    })

    const {data: characters} = useQuery({
        queryKey: ["userCharacters"],
        queryFn: getAllUserCharacters
    })

    const [openDialogSm, setOpenDialogSm] = useState(false)
    const [openDialogLg, setOpenDialogLg] = useState(false)
    const [idcampanha, setidcampanha] = useState("")
    const [idcampanhavalido, setidcampanhavalido] = useState(true)
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [selectedField, setSelectedField] = useState('')

    const username = 'User'

    function logout(){
        navigate("/grimoire/");
    }
    function validateIdCampanha(){
        if(idcampanha == '123456'){
            setidcampanhavalido(true) //depois mudar pra uma verificação real
            navigate("/grimoire/campaign");
        }else{
            setidcampanhavalido(!idcampanhavalido) //depois mudar pra uma verificação real
        }
    }

    function navigateNewCampaign(){
        //fazer com que essa função crie um novo objeto campanha associado ao usuário como mestre
        //navigate("/grimoire/campaign");
        const newCampaignPayload: CreateNewCampaignPayload = {
            titulo: '',
            foto_url: '',
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

    function navigateNewSystem(){
        const newSystemPayload: CreateNewSystemPayload = {
            foto_url: '',
            nome: '',
            descricao: ''
        }
        const systemType: SystemType =  'PUBLICO';
        const temporaryJson: TemporarySystemPayload = {
            payload: newSystemPayload,
            systemType: systemType
        }

        newSystem.mutate(temporaryJson)
        //navigate("/grimoire/system/");
    }

    const newSystem = useMutation({
        mutationKey: ["createNewSystem"],
        mutationFn: createNewSystem,
        onSuccess: (data) => {
            console.log(data)
            //navigate("/grimoire/campaign");
        },
        onError: (error) => {
          console.log(error);
        },
    });


    function userSettings(campo:string){
        setSelectedField(campo);
        setShowUserSettings(true);
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

                    <MenuRoot>
                        <MenuTrigger asChild>
                        <Avatar className="cursor-pointer" size={"lg"} name="Usuário" />
                        </MenuTrigger>
                        <MenuContent mt={14} mr={4} position={"absolute"}>
                            <MenuItem onClick={()=>userSettings('nome')} cursor={"pointer"} value="nome">Mudar nome</MenuItem>
                            <MenuItem onClick={()=>userSettings('username')} cursor={"pointer"} value="username">Mudar username</MenuItem>
                            <MenuItem onClick={()=>userSettings('senha')} cursor={"pointer"} value="senha">Mudar senha</MenuItem>
                            <MenuItem onClick={()=>userSettings('e-mail')} cursor={"pointer"} value="e-mail">Mudar e-mail</MenuItem>
                            <MenuItem onClick={()=>userSettings('foto')} cursor={"pointer"} value="foto">Mudar foto de perfil</MenuItem>
                            <MenuItem onClick={()=>userSettings('deletar')} color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }} cursor={"pointer"} value="deletar">Deletar conta</MenuItem>
                        </MenuContent>
                    </MenuRoot>
                        

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
                        <Box className="rounded-lg" bg={{ base: "white", _dark: "black" }} color={{ base: "black", _dark: "white" }} >
                            <DialogPanel
                                transition
                                className=" padding-dialog-sm relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle className="text-base text-large font-semibold ">
                                        Embarcar em uma nova aventura?
                                    </DialogTitle>
                                    <div className="margin-top-s m-b-s">
                                        <p className="text ">
                                            Se o Mestre de uma campanha compartilhar o código com você, você poderá participar como jogador.
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="px-4 py-3 grid-cols-1 place-content-center place-items-center gap-y-8">
                                    <Form>
                                        <Input value={idcampanha} onChange={(e) => setidcampanha(e.target.value)} mb={"2"} required resize="none" className="height" placeholder="Código da campanha"/>
                                    </Form>
                                    <Button mb={"4"} onClick={()=>validateIdCampanha()} className="margin-top" disabled={!(idcampanha != "")}>Entrar na campanha</Button>
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
                        </Box>
                        </div>
                    </div>
                </Dialog>

                <Presence   present={showUserSettings}
                            animationName={{ _open: "fade-in", _closed: "fade-out" }}
                            animationDuration="slow">

                            <UserSettingsDialogSm open={showUserSettings} handleClose={setShowUserSettings} /*user=User*/ campo={selectedField}></UserSettingsDialogSm>

                </Presence>

                <DialogLg title="Defina as leis do seu universo" description="Comece sua nova história com um dos sistemas que você já cadastrou no seu Grimoire, ou procure por sistemas criados pela comunidade!" open={openDialogLg} handleClose={setOpenDialogLg} systems={[]}></DialogLg> {/* depois mudar pra pegar os sistemas do usuario + os sistemas publicos */}

                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                    
                        <div className="flex col-span-2">
                            <div className="margin-top">
                                <Button mt={"2%"} mb={"2%"} textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=> navigateNewCampaign()}>Nova campanha</Button>
                                <br></br>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=> navigateNewSystem()}>Novo sistema</Button>
                                <br></br>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=> setOpenDialogSm(true)}>Entrar em campanha</Button>
                                <br></br>
                                <Button textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=> setOpenDialogLg(true)}>Sistemas disponíveis</Button>
                            </div>
                            <div>
                                <Separator ml={2} h={"80vh"} orientation={"vertical"}></Separator>
                            </div>
                        </div>

                        <CardRoot className="h-[80vh] col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-center padding-bottom">SUAS CAMPANHAS</CardTitle>
                                    <Separator></Separator>
                                </CardHeader>
                            <CardBody  overflowY={"auto"}>
                                <For each={campanhasCriadas}>
                                    {(item) => <CampaignCard campaign={item}></CampaignCard>}
                                </For>
                            </CardBody>
                        </CardRoot>
                        <CardRoot className="h-[80vh] col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-center padding-bottom">SUAS AVENTURAS</CardTitle>
                                    <Separator></Separator>
                                </CardHeader>
                            <CardBody  overflowY={"auto"}>
                                <For each={campanhasJogadas}>
                                    {(item) => <CampaignCard campaign={item}></CampaignCard>}
                                </For>
                            </CardBody>
                        </CardRoot>
                        <div className="col-span-3">

                            <CardRoot className="w-full h-[40vh]">
                                <CardHeader>
                                    <CardTitle className="text-center padding-bottom">SEUS PERSONAGENS</CardTitle>
                                    <Separator></Separator>
                                </CardHeader>
                                <CardBody overflowY={"scroll"}  className="flex">
                                    <Center>
                                        <Flex wrap="wrap" mt='2'>
                                            <For each={['','','','','']}>
                                                {(item) => <CharacterProfile mt='1' mr='1' ml='1' mb="1" character={item}></CharacterProfile>}
                                            </For>
                                        </Flex>
                                    </Center>
                                </CardBody>
                            </CardRoot>
                            
                        </div>
                </div>
                <ToggleTheme/>
                
            </Box>
        </Presence>
    )
}