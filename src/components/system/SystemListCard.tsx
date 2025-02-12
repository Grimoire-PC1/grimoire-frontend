import { System } from "@/interfaces/Models"
import {Alert, Box, Button, CardBody, CardRoot, Image, Presence, Text } from "@chakra-ui/react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export interface SystemListCardProps {
    system: System; 
}

export const SystemListCard = ({
    system,
}: SystemListCardProps) => {

    const [openUserCampaigns,setOpenUserCampaigns] = useState(false);
    const ownSystem = false; //verificar se o sistema pertence ao usuário ou não

    const navigate = useNavigate();

    return(

        <MenuRoot>
            <MenuTrigger asChild>
                <CardRoot className="" cursor={"pointer"}>
                        {system.image && system.image != '' ?
                            <Image
                            src={system.image}
                            className={"max-h-[20vh] rounded-t-sm"}
                            />
                        :
                            <div
                            className={"h-[20vh] bg-indigo-900 rounded-t-sm"}
                            />
                        }
                    <CardBody>
                        <Text fontSize={"lg"}>{system.name}</Text>
                    </CardBody>
                </CardRoot>
            </MenuTrigger>
            <MenuContent>
                <MenuItem onClick={()=>navigate("/grimoire/system")} cursor={"pointer"} value="abrirSistema">Abrir sistema</MenuItem>
                <MenuItem onClick={()=>setOpenUserCampaigns(true)} cursor={"pointer"} value="usarSistema">Usar em uma campanha</MenuItem>
            </MenuContent>

                                    
            <Dialog open={openUserCampaigns} onClose={setOpenUserCampaigns} className="relative z-10">
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
                                                <Text fontSize={"2xl"}>Escolha uma campanha para usar {system.name}</Text>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <Box maxH={"40vh"} overflowY={"auto"} display={"block"} mt={4}>

                                                {/* substituir por uma lista das campanhas ainda sem sistema do usuário */}
                                                {/* colocar no onClick a requisição pro back-end que cria uma copia privada do sistema e associa à campanha */}

                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 1</Button>
                                                <br></br>  
                                                <Button variant={"ghost"} fontSize={"md"}>Aventura com titulo longo longo longo</Button>   
                                                <br></br>
                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 2: o retorno</Button> 
                                                <br></br>
                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 1</Button>
                                                <br></br>  
                                                <Button variant={"ghost"} fontSize={"md"}>Aventura com titulo longo longo longo</Button>   
                                                <br></br>
                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 1</Button>
                                                <br></br>  
                                                <Button variant={"ghost"} fontSize={"md"}>Aventura com titulo longo longo longo</Button>   
                                                <br></br>
                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 1</Button>
                                                <br></br>  
                                                <Button variant={"ghost"} fontSize={"md"}>Aventura com titulo longo longo longo</Button>   
                                                <br></br>
                                                <Button variant={"ghost"} fontSize={"md"}>Minha campanha 1</Button>
                                                <br></br>  
                                                <Button variant={"ghost"} fontSize={"md"}>Aventura com titulo longo longo longo</Button>   
                                                <br></br>
                                            </Box>

                                            {!ownSystem ?
                                                <Alert.Root mt={4} status="info">
                                                    <Alert.Indicator alignSelf={"center"} />
                                                    <Alert.Title>
                                                        Quando você usa um sistema da comunidade, uma cópia privada do sistema é criada na sua conta. Assim, você pode personalizar sua campanha mesmo com um sistema externo!
                                                    </Alert.Title>
                                                </Alert.Root>
                                                
                                                :
                                                <div></div>
                                            }

                                        </div>

                                    </DialogPanel>
                                </Box>
                                </div>
                            </div>
            </Dialog>
        </MenuRoot>
    )
}