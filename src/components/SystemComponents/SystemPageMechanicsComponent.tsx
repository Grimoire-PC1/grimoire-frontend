import { Text, Flex, Grid, IconButton, For,  } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { MechanicsCard } from "../MechanicsCard/MechanicsCard";
import { MechanicsCardDialog } from "../MechanicsCard/MechanicsCardDialog";
import { useQuery } from "@tanstack/react-query";
import { getSystemMechanics, getSystemRules } from "@/services/systemService";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    maxHeight:string; //nao mude isso
}

export const SystemPageMechanicsComponent = ({
    system,
    title,
    subtitle,
    maxHeight
}: SystemPageComponentProps) => {
    const [addNewMechanic,setAddNewMechanic] = useState(false);

    const {data: mechs} = useQuery({
        queryKey: ["mechs"],
        queryFn: getSystemMechanics
    })
    mechs?.sort((a, b) => {
        return a.id - b.id;
    });

    function fecharEforcar(){
        setAddNewMechanic(false);
        location.reload();
    }

    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        <Text className="text">{subtitle}</Text>
                    </div>
                    
                    <IconButton onClick={()=>setAddNewMechanic(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Mecanica"> 
                        <LuPlus />
                    </IconButton>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <For each={mechs}>
                            {(m)=><MechanicsCard mechanicTitle={m.nome} mechanicId={m.id} mechanicDesc={m.descricao} mechanicActions={m.acoes.substring(2,(m.acoes.length)-2).split(",")} mechanicEffects={m.efeitos.substring(2,(m.efeitos.length)-2).split(",")}/>}
                        </For>
                    </Grid>

                    <MechanicsCardDialog open={addNewMechanic} handleClose={setAddNewMechanic} handleCreate={fecharEforcar} system=""></MechanicsCardDialog>
            
            </div>
        </div>
    )
}