import { ClientOnly, IconButton, Separator, Skeleton,Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export const CampaignHeader = () => {
    const navigate = useNavigate();

    function logout(){
        navigate("/grimoire/"); 
    }

    const c = JSON.parse(sessionStorage.getItem('currentCampaign')||'')
    const titulo = c.titulo

    return(
        <div>
            <div className="header margin-sides flex place-content-between items-center" >
                    <Text className="header-title agreloy" lineClamp={1}>{titulo}'s Grimoire</Text>
                    <div className="grid grid-cols-2 gap-x-4">
                        <Avatar className="cursor-pointer" size={"lg"} name="Usuário"/>

                        <ClientOnly fallback={<Skeleton boxSize="8" />}>
                            <IconButton onClick={()=>logout()} variant="ghost" size="lg">
                                {<LuLogOut />}
                            </IconButton>
                        </ClientOnly>
                    </div>
                </div>
                <Separator></Separator>
        </div>
    )
}