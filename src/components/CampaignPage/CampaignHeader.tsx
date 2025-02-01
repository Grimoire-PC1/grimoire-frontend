import { ClientOnly, IconButton, Separator, Skeleton,Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export interface CampaignHeaderProps {
    campaign: string; //depois mudar pra Campaign
}

export const CampaignHeader = ({
    campaign,
}: CampaignHeaderProps) => {
    const navigate = useNavigate();

    
    function showUserSettings(){
        alert('user settings')
    }

    function logout(){
        navigate("/grimoire/");
    }

    return(
        <div>
            <div className="header margin-sides flex place-content-between items-center" >
                    <Text className="header-title agreloy" lineClamp={1}>{campaign}'s Grimoire</Text>
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
        </div>
    )
}