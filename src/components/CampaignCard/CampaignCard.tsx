import { Campaign } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


export interface CampaignCardProps {
    campaign: Campaign; 
}

export const CampaignCard = ({
    campaign,
}: CampaignCardProps) => {
    
    const navigate = useNavigate();

    function navigateCampaignPage() {
        sessionStorage.setItem('currentCampaignId', campaign.id);
        console.log(campaign.id)
        navigate("/grimoire/campaign");
    }
    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                <Image 
                src={campaign.foto_url}
                className="max-h-[25vh]"
                />
            <CardBody onClick={navigateCampaignPage}>
                <Text lineClamp={1} fontSize={"lg"}>{campaign.titulo}</Text>
            </CardBody>
        </CardRoot>
    )
}