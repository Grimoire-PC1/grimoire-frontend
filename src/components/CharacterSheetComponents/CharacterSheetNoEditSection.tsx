import {CardBody, CardRoot, For, } from "@chakra-ui/react"
import {LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { CharacterSheetNoEditField } from "./CharacterSheetNoEditField";
import { getSystemSheetTemplateSubTabs } from "@/services/systemService";
import { SheetSubTab } from "@/interfaces/Models";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export interface CharacterSheetSectionProps {
    sectionTitle: string; // mudar para o tipo CharacterSheetSection depois. O tipo CharacterSheetSection contém id, título e um array de CharacterSheetField associado a ele
    sectionId: number;
}

export const CharacterSheetNoEditSection = ({
    sectionTitle,
    sectionId,
}: CharacterSheetSectionProps) => {

    const [campos,setCampos] = useState<SheetSubTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
        mutationKey: ["subTabsNoEdit"],
        mutationFn: getSystemSheetTemplateSubTabs,
        onSuccess: (data) => {
          console.log(data)
          setCampos(data.sort((a, b) => {
            return a.id - b.id;
        }));
          setFlag(1);
        },
        onError: (error) => {
          console.log(error);
        },
      });

    useEffect(() => {
        if(flag == 0){
            mutation.mutate(sectionId);
        }
    }, [campos, flag, mutation, sectionId]);
    
    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={sectionId} value={String(sectionId)}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuUserRoundPen /> {sectionTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent display={"grid"} gapY={4}>
                            <For each={campos}>
                                {(item) => 
                                    <CharacterSheetNoEditField fieldId={String(item.id)} fieldTitle={item.nome} fieldType={item.tipo_sub_aba_ficha}/>
                                }
                            </For>
                        </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>
        </div>
    )
}