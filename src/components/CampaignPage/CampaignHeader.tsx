import { ClientOnly, IconButton, Separator, Skeleton,Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { Campaign } from "@/interfaces/Models";
import { useUserStore } from "@/stores/user/user.store";

export interface CampaignHeaderProps {
    campaign: Campaign; //depois mudar pra Campaign
}

export const CampaignHeader = ({
    campaign,
}: CampaignHeaderProps) => {
    const allCreatedCampaign = useUserStore.getState().createdCampaigns;
    let campaignInformation: Campaign = allCreatedCampaign[0];
    console.log(allCreatedCampaign)
    
    for(let i = 0; i < allCreatedCampaign.length; i++) {
        if(allCreatedCampaign[i].id == sessionStorage.getItem('currentCampaignId')) {
            campaign = allCreatedCampaign[i];
            console.log(campaignInformation)
            break
        } 
    }
    console.log(campaign)
    const navigate = useNavigate();

    function logout(){
        navigate("/grimoire/");
    }

    return(
        <div>
            <div className="header margin-sides flex place-content-between items-center" >
                    <Text className="header-title agreloy" lineClamp={1}>{campaign.titulo ||  ''}'s Grimoire</Text>
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