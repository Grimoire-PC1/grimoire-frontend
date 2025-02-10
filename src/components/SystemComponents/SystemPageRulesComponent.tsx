import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, Grid,  } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { RulesCard } from "../RulesCard/RulesCard";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
}

export const SystemPageRulesComponent = ({
    system,
}: SystemPageComponentProps) => {
    const system_image = "";

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">COMO SEU SISTEMA CONTA UMA HISTÓRIA?</Text>
                        <Text className="text">Adicione regras de jogo para situar o mestre e os jogadores de como utilizar o seu sistema</Text>
                    </div>
                    <AddNewCharacterProfile mr="4" mb="4" mt="4" ml="4"/>
                </Flex>
                    <Grid className="grid-cols-2 margin-top-s" mb={12} gap={4}>
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
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                    

                    </Grid>
            
            </div>
        </div>
    )
}