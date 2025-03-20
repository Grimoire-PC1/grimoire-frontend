import { ClientOnly, IconButton, MenuContent, MenuItem, MenuRoot, MenuTrigger, Presence, Separator, Skeleton,Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { System } from "@/interfaces/Models";
import { useState } from "react";
import { UserSettingsDialogSm } from "../Dialog/DialogSm";

export const SystemHeader = () => {    
    let system: System = JSON.parse(sessionStorage.getItem('currentSystem')||'{}');
    const [img, setImg] = useState("");
    const user = JSON.parse(sessionStorage.getItem("userObject")||"{}")
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [selectedField, setSelectedField] = useState('')

    const navigate = useNavigate();

    function logout(){
        sessionStorage.removeItem("grimoireToken")
        navigate("/grimoire/");
    }

    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${user?.id_foto}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const data = await res.json()
          console.log(data)
          setImg(data.image)
    }

    if(!img || img == ""){
        getImage()
    }

    function userSettings(campo:string){
        setSelectedField(campo);
        setShowUserSettings(true);
    }

    return(
        <div>
            <div className="header margin-sides flex place-content-between items-center" >
                    <Text className="header-title agreloy" lineClamp={1}>{system.nome}'s Grimoire</Text>
                    <div className="grid grid-cols-2 gap-x-4">
                        <MenuRoot>
                            <MenuTrigger asChild>
                            <Avatar className="cursor-pointer" size={"lg"} name="Usuário" src={img}/>
                            </MenuTrigger>
                            <MenuContent mt={14} mr={4} position={"absolute"}>
                                <MenuItem onClick={()=>userSettings('nome')} cursor={"pointer"} value="nome">Mudar nome</MenuItem>
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
                <Presence   present={showUserSettings}
                            animationName={{ _open: "fade-in", _closed: "fade-out" }}
                            animationDuration="slow">

                            <UserSettingsDialogSm open={showUserSettings} handleClose={setShowUserSettings} /*user=User*/ campo={selectedField}></UserSettingsDialogSm>

                </Presence>
                <Separator></Separator>
        </div>
    )
}