import { Text, Flex,Grid, IconButton, For,  } from "@chakra-ui/react";
import { RulesCard } from "../RulesCard/RulesCard";
import { LuPlus } from "react-icons/lu";
import { useReducer, useState } from "react";
import { RulesCardDialog } from "../RulesCard/RulesCardDialog";
import { getSystemRules } from "@/services/systemService";
import { useQuery } from "@tanstack/react-query";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    maxHeight:string; //nao mude isso
}

export const SystemPageRulesComponent = ({
    system,
    title,
    subtitle,
    maxHeight
}: SystemPageComponentProps) => {
    const [addNewRule,setAddNewRule] = useState(false);

    const {data: regras} = useQuery({
        queryKey: ["regras"],
        queryFn: getSystemRules
    })

    function fecharEforcar(){
        setAddNewRule(false);
        location.reload();
    }

    sessionStorage.setItem('systemId',system);

    console.log(regras)

    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        <Text className="text">{subtitle}</Text>
                    </div>
                    
                    <IconButton onClick={()=>setAddNewRule(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Regra"> 
                        <LuPlus />
                    </IconButton>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <For each={regras}>
                            {(regra)=><RulesCard ruleId={String(regra.id)} ruleTitle={regra.titulo} ruleDesc={regra.descricao}/>}
                        </For>
                    </Grid>

                    <RulesCardDialog open={addNewRule} handleClose={fecharEforcar} campaign={system}></RulesCardDialog>
            </div>
        </div>
    )
}