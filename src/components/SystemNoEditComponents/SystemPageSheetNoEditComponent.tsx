import {Text,Flex, Grid, } from "@chakra-ui/react";
import { CharacterSheetNoEditSection } from "../CharacterSheetComponents/CharacterSheetNoEditSection";

export interface SystemPageComponentProps {
    system: string; //depois mudar pra System
    title: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
    subtitle?: string; //nao mude isso, esse parâmetro é algo pra deixar partes da pagina adaptaveis
}

export const SystemPageSheetNoEditComponent = ({
    system,
    title,
    subtitle
}: SystemPageComponentProps) => {

    return(
        <div className="">
            <div className="margin-right">
                <Flex placeContent={"space-between"}>
                    <div>
                        <Text className="subtitle-s">{title}</Text>
                        {subtitle? 
                        <Text className="text">{subtitle}</Text>
                        : <div></div>}
                    </div>
                </Flex>
                    <Grid maxH={"70vh"} overflowY={"auto"} className="grid-cols-2 margin-top-s" mb={12} gap={4}>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Identidade do Personagem" sectionId="1" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="História" sectionId="2" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Atributos" sectionId="3" fields=""/>
                        <CharacterSheetNoEditSection sectionTitle="Magias" sectionId="4" fields=""/>
                    </Grid>
            
            </div>
        </div>
    )
}