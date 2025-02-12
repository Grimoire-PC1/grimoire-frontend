import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, Grid, IconButton,  } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { RulesCard } from "../RulesCard/RulesCard";
import { LuPlus } from "react-icons/lu";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
}

export const SystemPageRulesComponent = ({
    system,
    title,
    subtitle
}: SystemPageComponentProps) => {
    const system_image = "";

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        <Text className="text">{subtitle}</Text>
                    </div>
                    
                    <IconButton rounded={"full"} size={"2xl"} variant={"outline"} aria-label="Nova Regra"> 
                        <LuPlus />
                    </IconButton>
                                            
                </Flex>
                    <Grid className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <RulesCard ruleId="1" ruleTitle="Combate" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="2" ruleTitle="Turnos" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>
                        <RulesCard ruleId="3" ruleTitle="Iniciativa" ruleDesc="Quando um jogador quiser iniciar combate, ele deve rolar Iniciativa contra o oponente."/>

                    </Grid>
            
            </div>
        </div>
    )
}