import { Campaign } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Skeleton, Text } from "@chakra-ui/react"
import { useState } from "react";
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

    const [img,setImg] = useState("")
    
    const getImage = async () => {
        const res = await fetch(`http://localhost:8081/get/${campaign?.id_foto}`, {
            method:"GET",
            headers: {
              "content-type" : "application/json"
            }
          })
          const data = await res.json()
          setImg(data.image)
          console.log(data)
    }

    if(!img || img == "") {
        getImage()
    }

    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                {
                    img ?
                    <Image 
                    src={img}
                    w={"full"}
                    h={"20vh"}
                    onClick={navigateCampaignPage}
                    />
                    :
                    <Skeleton 
                    w={"full"}
                    h={"20vh"} />
                }
            <CardBody onClick={navigateCampaignPage}>
                <Text lineClamp={1} fontSize={"lg"}>{campaign.titulo}</Text>
            </CardBody>
        </CardRoot>
    )
}