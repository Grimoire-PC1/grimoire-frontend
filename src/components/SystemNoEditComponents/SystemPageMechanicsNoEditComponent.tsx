import { Text, Flex, Grid, For,  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MechanicsCard } from "../MechanicsCard/MechanicsCard";
import { SystemMechanic } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { getSystemMechanics } from "@/services/systemService";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    maxHeight:string; //nao mude isso
} 

export const SystemPageMechanicsNoEditComponent = ({
    system,
    title,
    maxHeight
}: SystemPageComponentProps) => {

    const [mechs,setMechs] = useState<SystemMechanic[]>();
    const [flag,setFlag] = useState(0);
    

    const mutation = useMutation({
        mutationKey: ["mechs"],
        mutationFn: getSystemMechanics,
        onSuccess: (data) => {
            console.log(data)
            setMechs(data.sort((a, b) => {
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
    }, [mechs]);

    function fecharEforcar2(){
        mutation.mutate();
    }
    
    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                    <Text className="subtitle-s">{title}</Text>
                    </div>                                      
                </Flex>
                <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                    <For each={mechs}>
                        {(m)=><MechanicsCard handleConfirm={fecharEforcar2} mechanicTitle={m.nome} mechanicId={m.id} mechanicDesc={m.descricao} mechanicActions={m.acoes.substring(2,(m.acoes.length)-2).split(",")} mechanicEffects={m.efeitos.substring(2,(m.efeitos.length)-2).split(",")}/>}
                    </For>
                </Grid>
            </div>
        </div>
    )
}