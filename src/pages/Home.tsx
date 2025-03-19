import { CampaignCard } from "@/components/CampaignCard/CampaignCard";
import { Avatar } from "@/components/ui/avatar";
import { getAllUserCreatedCampaigns, getAllUserPlayedCampaigns, getCampaignById } from "@/services/campaignService";
import { ClientOnly, Skeleton, IconButton, Separator, Button, Presence, Input, Alert, For, Center, Flex, MenuRoot, MenuTrigger, MenuContent, MenuItem, DialogRoot, DialogTrigger, DialogContent } from "@chakra-ui/react";
import { Box} from "@chakra-ui/react/box";
import { CardBody, CardHeader, CardRoot, CardTitle } from "@chakra-ui/react/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LuLogOut } from "react-icons/lu";
import { Form, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useMemo, useState } from "react";
import { DialogLg } from "@/components/Dialog/DialogLg";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { getAllUserCharacters } from "@/services/characterService";
import { UserSettingsDialogSm } from "@/components/Dialog/DialogSm";
import { DialogNewCampaign } from "@/components/Dialog/DialogNewCampaign";
import { useUserStore } from "@/stores/user/user.store";
import { CreateNewSystemPayload, TemporarySystemPayload } from "@/interfaces/ServicePayload";
import { Campaign, SystemType, User } from "@/interfaces/Models";
import { createNewSystem, getAllUserCreatedSystems } from "@/services/systemService";
import { getUser } from "@/services/userService";
import { SystemListCard } from "@/components/system/SystemListCard";

export default function Home() {
    const navigate = useNavigate();

    const {data: infoUsuario, isLoading: loadingInfoUser} = useQuery({
        queryKey: ["infoUsuario"],
        queryFn: getUser
    })

    const {data: campanhasCriadas, isLoading: loadingCreatedCampaigns} = useQuery({
        queryKey: ["userCreatedCampaigns"],
        queryFn: getAllUserCreatedCampaigns
    })
    
    const {data: campanhasJogadas, isLoading: loadingPlayedCampaigns} = useQuery({
        queryKey: ["userPlayedCampaigns"],
        queryFn: getAllUserPlayedCampaigns
    })

    const {data: personagens, isLoading: loadingPlayerCharacters} = useQuery({
        queryKey: ["userCharacters"],
        queryFn: getAllUserCharacters
    })

    const {data: sistemasUsuario, isLoading: loadingUserSystems} = useQuery({
        queryKey: ["userSystems"],
        queryFn: getAllUserCreatedSystems
    })

    const isEverythingLoaded = !loadingInfoUser && 
                            !loadingCreatedCampaigns && 
                            !loadingPlayedCampaigns && 
                            !loadingPlayerCharacters && 
                            !loadingUserSystems;

    let userObject: User = {
        createdCampaign: campanhasCriadas ?? [],
        playedCampaign: campanhasJogadas ?? [],
        characters: personagens ?? [],
        id: infoUsuario?.id ?? 0,
        login: infoUsuario?.login ?? "",
        email: infoUsuario?.email ?? "",
        nome: infoUsuario?.nome ?? "",
        id_foto: infoUsuario?.id_foto ?? ""
    };

    useEffect(() => {
        if (isEverythingLoaded && infoUsuario) {
            userObject = {
                createdCampaign: campanhasCriadas ?? [],
                playedCampaign: campanhasJogadas ?? [],
                characters: personagens ?? [],
                id: infoUsuario.id ?? 0,
                login: infoUsuario.login ?? "",
                email: infoUsuario.email ?? "",
                nome: infoUsuario.nome ?? "",
                id_foto: infoUsuario.id_foto ?? ""
            };
            useUserStore.getState().setUser(userObject);
            useUserStore.getState().setCreatedCampaigns(campanhasCriadas ?? []);
            useUserStore.getState().setPlayedCampaigns(campanhasJogadas ?? []);
            useUserStore.getState().setUserSystems(sistemasUsuario ?? []);

            console.log('Perfil atualizado:', userObject);
            sessionStorage.setItem('myId', String(userObject.id));
            console.log(JSON.stringify(userObject))
            sessionStorage.setItem("userObject", JSON.stringify(userObject))
            console.log(JSON.parse(sessionStorage.getItem("userObject")||''))
        }
    }, [isEverythingLoaded, infoUsuario, campanhasCriadas, campanhasJogadas, personagens, sistemasUsuario]);

    const [openDialogSm, setOpenDialogSm] = useState(false)
    const [openDialogLg, setOpenDialogLg] = useState(false)
    const [idcampanha, setidcampanha] = useState("")
    const [idcampanhavalido, setidcampanhavalido] = useState(true)
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [selectedField, setSelectedField] = useState('')
    const [openNewCampaign,setOpenNewCampaign] = useState(false);

    function logout(){
        navigate("/grimoire/");
    }
    async function validateIdCampanha(){
        const campanhaIngressada = await getCampaignById(idcampanha)
        if(campanhaIngressada.length !== 0) {
            
            setidcampanhavalido(true) //depois mudar pra uma verificação real
            navigate("/grimoire/campaign");
        }else{
            setidcampanhavalido(!idcampanhavalido) //depois mudar pra uma verificação real
        }
    }

    async function navigateNewSystem(){
        const resImg = await fetch("http://localhost:8081/upload", {
            method:"POST",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({img: ''})
        })
        const data = await resImg.json()
          
        const newSystemPayload: CreateNewSystemPayload = {
            id_foto: data.data._id,
            nome: '',
            descricao: ''
        }

        console.log(data)
        console.log(data.data._id)
        console.log(newSystemPayload)

        const systemType: SystemType =  "PRIVADO";
        const temporaryJson: TemporarySystemPayload = {
            payload: newSystemPayload,
            systemType: systemType
        }

        newSystem.mutate(temporaryJson)
    }

    const newSystem = useMutation({
        mutationKey: ["createNewSystem"],
        mutationFn: createNewSystem,
        onSuccess: (data) => {
            sessionStorage.setItem('currentSystem', JSON.stringify(data))
            console.log(data)
            navigate("/grimoire/system");
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
                    <span className="header-title agreloy">{userObject.login}'s Grimoire</span>
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


                <DialogNewCampaign open={openNewCampaign} handleClose={setOpenNewCampaign}/>
                <DialogLg title="Defina as leis do seu universo" description="Comece sua nova história com um dos sistemas que você já cadastrou no seu Grimoire, ou procure por sistemas criados pela comunidade!" open={openDialogLg} handleClose={setOpenDialogLg} systems={[]}></DialogLg> {/* depois mudar pra pegar os sistemas do usuario + os sistemas publicos */}

                <div className="place-content-around grid grid-cols-11 gap-x-8 content-spacing">
                    
                        <div className="flex col-span-2">
                            <div className="margin-top">
                                <Button mt={"2%"} mb={"2%"} textAlign={"left"} fontSize={"18px"} variant={"ghost"} onClick={()=>setOpenNewCampaign(true)}>Nova campanha</Button>
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

                            <CardRoot className="w-full h-[80vh]">
                                <CardHeader>
                                    <CardTitle className="text-center padding-bottom">SEUS SISTEMAS</CardTitle>
                                    <Separator></Separator>
                                </CardHeader>
                                <CardBody  overflowY={"auto"}>
                                <For each={sistemasUsuario}>
                                    {(item) => <Box className="margin-top"><SystemListCard system={item}></SystemListCard></Box>}
                                </For>
                            </CardBody>
                            </CardRoot>
                            
                        </div>
                </div>
                <ToggleTheme/>
                
            </Box>
        </Presence>
    )
}