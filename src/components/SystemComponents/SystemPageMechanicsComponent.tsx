import { Text, Flex, Grid, IconButton,  } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { MechanicsCard } from "../MechanicsCard/MechanicsCard";
import { MechanicsCardDialog } from "../MechanicsCard/MechanicsCardDialog";

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
    const [addNewRule,setAddNewRule] = useState(false);


    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        <Text className="text">{subtitle}</Text>
                    </div>
                    
                    <IconButton onClick={()=>setAddNewRule(true)} rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Mecanica"> 
                        <LuPlus />
                    </IconButton>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <MechanicsCard mechanicTitle="Combate" mechanicId=""/>
                        <MechanicsCard mechanicTitle="Furtividade" mechanicId=""/>
                        <MechanicsCard mechanicTitle="Criar poção" mechanicId=""/>
                        <MechanicsCard mechanicTitle="Diplomacia" mechanicId=""/>
                    </Grid>

                    <MechanicsCardDialog open={addNewRule} handleClose={setAddNewRule} system=""></MechanicsCardDialog>
            
            </div>
        </div>
    )
}