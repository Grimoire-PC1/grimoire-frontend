import { ClientOnly, IconButton, Separator, Skeleton,Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export interface CampaignHeaderProps {
    campaign: string; //depois mudar pra Campaign
}

export const CampaignHeaderPlayer = ({
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
            <div className="header margin-sides  text-center" >
                    <Text className="header-title agreloy">{campaign}</Text>
                </div>
                <Separator></Separator>
        </div>
    )
}