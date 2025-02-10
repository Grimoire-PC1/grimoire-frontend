import {Button, CardBody, CardRoot, Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { LuPlus, LuTrash2, LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { AddNewCharacterProfile } from "../CharacterProfile/AddNewCharacterProfile";
import { Avatar } from "../ui/avatar";
import { CharacterSheetField } from "./CharacterSheetField";


export interface CharacterSheetSectionProps {
    sectionTitle: string; // mudar para o tipo CharacterSheetSection depois. O tipo CharacterSheetSection contém id, título e um array de CharacterSheetField associado a ele
    sectionId: string;
    fields: string; //CharacterSheetField[];
}

export const CharacterSheetSection = ({
    sectionTitle,
    sectionId,
    fields
}: CharacterSheetSectionProps) => {
    return(
        <CardRoot size={"sm"} cursor={"pointer"}>
            <CardBody>
                <AccordionRoot collapsible cursor={"pointer"}>
                    <AccordionItem cursor={"pointer"} key={sectionId} value={sectionId}>
                    <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                        <LuUserRoundPen /> {sectionTitle}
                    </AccordionItemTrigger>
                    <AccordionItemContent display={"grid"} gapY={4}>
                        {fields /* fazer um For e criar componentes CharacterSheetFields para cada field em fields*/}
                        <CharacterSheetField fieldId="2" fieldTitle="Aparência" fieldType="StringLonga"/>
                        <CharacterSheetField fieldId="1" fieldTitle="Espécie" fieldType="StringCurta"/>
                        <CharacterSheetField fieldId="3" fieldTitle="Idade" fieldType="Numerico"/>
                        <CharacterSheetField fieldId="4" fieldTitle="Carisma" fieldType="Dado"/>
                        <CharacterSheetField fieldId="4" fieldTitle="Foto" fieldType="Arquivo"/>
                        <div className="flex place-content-end">
                            <IconButton rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo Campo"> 
                                <LuPlus strokeWidth={1.25} />
                            </IconButton>
                            <IconButton ml={2} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo Campo"> 
                                <LuTrash2 strokeWidth={1.25} />
                            </IconButton>
                        </div>
                    </AccordionItemContent>
                    </AccordionItem>
                </AccordionRoot>
            </CardBody>
        </CardRoot>
    )
}