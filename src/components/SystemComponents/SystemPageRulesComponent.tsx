import { Text, Flex,Grid, IconButton,  } from "@chakra-ui/react";
import { RulesCard } from "../RulesCard/RulesCard";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { RulesCardDialog } from "../RulesCard/RulesCardDialog";
import { System } from "@/interfaces/Models";

export interface SystemPageComponentProps {
    system: System; //depois mudar pra System
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
                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente. Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                    </Grid>

                    <RulesCardDialog open={addNewRule} handleClose={setAddNewRule} campaign=""></RulesCardDialog>
            
            </div>
        </div>
    )
}