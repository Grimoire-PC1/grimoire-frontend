import { Text,Flex,Grid, For, } from "@chakra-ui/react";
import { RulesNoEditCard } from "../RulesCard/RulesNoEditCard";
import { useQuery } from "@tanstack/react-query";
import { getCampaignRules } from "@/services/campaignService";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle?:string; 
    maxHeight:string; //nao mude isso
}

export const SystemPageRulesNoEditComponent = ({
    system,
    title,
    subtitle,
    maxHeight
}: SystemPageComponentProps) => {

    const {data: regras} = useQuery({
        queryKey: ["regrasDeCampanha"],
        queryFn: getCampaignRules
    })
    regras?.sort((a, b) => {
        return a.id - b.id;
    });

    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        {subtitle?<Text className="text">{subtitle}</Text>:<div></div>}
                    </div>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" pb={8} gap={4}>
                        <For each={regras}>
                            {(regra)=><RulesNoEditCard ruleId={regra.id} ruleTitle={regra.titulo} ruleDesc={regra.descricao}/>}
                        </For> 
                    </Grid>
            
            </div>
        </div>
    )
}