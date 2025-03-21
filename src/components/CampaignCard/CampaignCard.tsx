import { Campaign } from "@/interfaces/Models"
import { useUserStore } from "@/stores/user/user.store";
import {CardBody, CardRoot, Image, Skeleton, Text } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
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
        
        const myCampaigns = useUserStore.getState().createdCampaigns;
        const participatingCampaigns = useUserStore.getState().playedCampaigns;
        myCampaigns.forEach(
            (c) => {
                console.log(c)
                if(c.id == campaign.id){
                    sessionStorage.setItem('currentCampaign',JSON.stringify(c))
                    sessionStorage.setItem('systemId',String(c.id_sistema));
                    sessionStorage.setItem('isGameMaster',"true");

                    console.log('achei a campanha, id: '+c.id)
                }
            }
        )
        participatingCampaigns.forEach(
            (c) => {
                console.log(c)
                if(c.id == campaign.id){
                    sessionStorage.setItem('currentCampaign',JSON.stringify(c))
                    sessionStorage.setItem('systemId',String(c.id_sistema));
                    sessionStorage.setItem('isGameMaster',"false");

                    console.log('achei a campanha, id: '+c.id)
                }
            }
        )

        console.log('campanha atual:')
        console.log(sessionStorage.getItem('currentCampaign'))
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
                    className="rounded-t-sm"
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