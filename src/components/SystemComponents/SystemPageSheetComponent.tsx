import { Input, Text, Textarea, Image, Separator, Button, Center, Flex, For, Grid, IconButton,  } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadDropzone,FileUploadList } from "../ui/file-upload";
import {RadioGroup, Radio } from "../ui/radio";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { RulesCard } from "../RulesCard/RulesCard";
import { CharacterSheetSection } from "../CharacterSheetComponents/CharacterSheetSection";
import { Avatar } from "../ui/avatar";
import { LuPlus } from "react-icons/lu";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
}

export const SystemPageSheetComponent = ({
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
                        <CharacterSheetSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetSection sectionTitle="Magias" sectionId="4" fields=""/>
                    </Grid>
            
            </div>
        </div>
    )
}