import { Text, Flex,Grid, IconButton, For,  } from "@chakra-ui/react";
import { RulesCard } from "../RulesCard/RulesCard";
import { LuPlus } from "react-icons/lu";
import { useEffect, useReducer, useState } from "react";
import { RulesCardDialog } from "../RulesCard/RulesCardDialog";
import { getSystemRules } from "@/services/systemService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SystemRule } from "@/interfaces/Models";

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

    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [regras,setRegras] = useState<SystemRule[]>();
    const [flag,setFlag] = useState(0);
    

    const mutation = useMutation({
        mutationKey: ["regras"],
        mutationFn: getSystemRules,
        onSuccess: (data) => {
            console.log(data)
            setRegras(data.sort((a, b) => {
            return a.id - b.id;
        }));
            setFlag(1);
        },
        onError: (error) => {
            console.log(error);
        },
        });

    useEffect(() => {
        if(flag == 0){
            mutation.mutate();
        }
    }, [regras]);

    function fecharEforcar(){
        mutation.mutate();
        setAddNewRule(false);
        forceUpdate();
    }

    function fecharEforcar2(){
        mutation.mutate();
        forceUpdate();
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
                            {(regra)=><RulesCard handleConfirm={fecharEforcar2} ruleId={String(regra.id)} ruleTitle={regra.titulo} ruleDesc={regra.descricao}/>}
                        </For>
                    </Grid>

                    <RulesCardDialog open={addNewRule} handleClose={setAddNewRule} handleCreate={fecharEforcar} campaign={system}></RulesCardDialog>
            </div>
        </div>
    )
}