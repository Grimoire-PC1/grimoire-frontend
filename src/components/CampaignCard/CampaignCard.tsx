import { Campaign } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"


export interface CampaignCardProps {
    campaign: Campaign; 
}

export const CampaignCard = ({
    campaign,
}: CampaignCardProps) => {
    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                <Image 
                src={campaign.image}
                className="max-h-[25vh]"
                />
            <CardBody>
                <Text lineClamp={1} fontSize={"lg"}>{campaign.name}</Text>
            </CardBody>
        </CardRoot>
    )
}