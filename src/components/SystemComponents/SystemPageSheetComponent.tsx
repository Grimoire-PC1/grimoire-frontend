import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, Grid,  } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { RulesCard } from "../RulesCard/RulesCard";
import { CharacterSheetSection } from "../CharacterSheetComponents/CharacterSheetSection";
import { Avatar } from "../ui/avatar";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
}

export const SystemPageSheetComponent = ({
    system,
}: SystemPageComponentProps) => {
    const system_image = "";

    return(
        <div className="h-[80vh] overflow-y-auto">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">COMO SEUS JOGADORES PODEM CONSTRUIR PERSONAGENS ÚNICOS?</Text>
                        <Text className="text">Crie um modelo de ficha para dar vida aos personagens dentro do seu sistema</Text>
                    </div>
                    <AddNewCharacterProfile mr="4" mb="4" mt="4" ml="4"/>
                </Flex>
                    <Grid className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <CharacterSheetSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetSection sectionTitle="Magias" sectionId="4" fields=""/>
                    </Grid>
            
            </div>
        </div>
    )
}