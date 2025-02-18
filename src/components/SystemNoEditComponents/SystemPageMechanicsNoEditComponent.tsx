import { Text, Flex, Grid, IconButton,  } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { MechanicsCard } from "../MechanicsCard/MechanicsCard";
import { MechanicsCardDialog } from "../MechanicsCard/MechanicsCardDialog";
import { MechanicsNoEditCard } from "../MechanicsCard/MechanicsNoEditCard";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    maxHeight:string; //nao mude isso
}

export const SystemPageMechanicsNoEditComponent = ({
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
                    </div>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <MechanicsNoEditCard mechanicTitle="Combate" mechanicId=""/>
                        <MechanicsNoEditCard mechanicTitle="Furtividade" mechanicId=""/>
                        <MechanicsNoEditCard mechanicTitle="Criar poção" mechanicId=""/>
                        <MechanicsNoEditCard mechanicTitle="Diplomacia" mechanicId=""/>
                    </Grid>

                    <MechanicsCardDialog open={addNewRule} handleClose={setAddNewRule} system=""></MechanicsCardDialog>
            
            </div>
        </div>
    )
}