import { Text,Flex,Grid, } from "@chakra-ui/react";
import { RulesNoEditCard } from "../RulesCard/RulesNoEditCard";

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

    return(
        <div className="overflow-y-hidden">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        {subtitle?<Text className="text">{subtitle}</Text>:<div></div>}
                    </div>
                                            
                </Flex>
                    <Grid maxH={maxHeight} overflowY={"scroll"} className="grid-cols-2 margin-top-s" pb={8} gap={4}>
                        <RulesNoEditCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesNoEditCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesNoEditCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesNoEditCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                        <RulesNoEditCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesNoEditCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente. Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente.Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                    </Grid>
            
            </div>
        </div>
    )
}