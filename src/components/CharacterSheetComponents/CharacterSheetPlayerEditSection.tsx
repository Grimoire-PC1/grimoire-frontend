import {CardBody, CardRoot, } from "@chakra-ui/react"
import {LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { CharacterSheetNoEditField } from "./CharacterSheetNoEditField";
import { CharacterSheetPlayerEditField } from "./CharacterSheetPlayerEditField";

export interface CharacterSheetSectionProps {
    sectionTitle: string; // mudar para o tipo CharacterSheetSection depois. O tipo CharacterSheetSection contém id, título e um array de CharacterSheetField associado a ele
    sectionId: string;
    fields: string; //CharacterSheetField[];
    characterId:string;
}

export const CharacterSheetPlayerEditSection = ({
    sectionTitle,
    sectionId,
    fields,
    characterId
}: CharacterSheetSectionProps) => {
    
    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={sectionId} value={sectionId}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuUserRoundPen /> {sectionTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent display={"grid"} gapY={4}>
                            {fields /* fazer um For e criar componentes CharacterSheetFields para cada field em fields*/}
                            <CharacterSheetPlayerEditField fieldId="2" fieldTitle="Aparência" fieldType="StringLonga" characterId={characterId}/>
                            <CharacterSheetPlayerEditField fieldId="1" fieldTitle="Espécie" fieldType="StringCurta" characterId={characterId}/>
                            <CharacterSheetPlayerEditField fieldId="3" fieldTitle="Idade" fieldType="Numerico" characterId={characterId}/>
                            <CharacterSheetPlayerEditField fieldId="4" fieldTitle="Carisma" fieldType="Dado" characterId={characterId}/>
                            <CharacterSheetPlayerEditField fieldId="4" fieldTitle="Foto" fieldType="Arquivo" characterId={characterId}/>
                        </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>
        </div>
    )
}