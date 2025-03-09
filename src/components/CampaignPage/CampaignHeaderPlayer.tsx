import { Separator, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CampaignHeaderPlayer = () => {

    const c = JSON.parse(sessionStorage.getItem('currentCampaign')||'')
    const titulo = c.titulo

    return(
        <div>
            <div className="header margin-sides  text-center" >
                    <Text className="header-title agreloy">{titulo}</Text>
                </div>
                <Separator></Separator>
        </div>
    )
}