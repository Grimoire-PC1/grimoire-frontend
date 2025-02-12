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
    
    const navigateCampaign = () => {
        navigate(`/grimoire/campaign/${campaign.id}`)
    }

    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                <Image 
                src={campaign.image}
                className="max-h-[25vh]"
                onClick={navigateCampaign}/>
            <CardBody>
                <Text lineClamp={1} fontSize={"lg"}>{campaign.name}</Text>
            </CardBody>
        </CardRoot>
    )
}