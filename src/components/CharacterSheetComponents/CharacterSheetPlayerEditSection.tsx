import {CardBody, CardRoot, For, } from "@chakra-ui/react"
import {LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { CharacterSheetPlayerEditField } from "./CharacterSheetPlayerEditField";
import { SheetSubTab } from "@/interfaces/Models";
import { getCampaignSheetTemplateSubTabs } from "@/services/campaignService";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export interface CharacterSheetSectionProps {
    sectionTitle: string; // mudar para o tipo CharacterSheetSection depois. O tipo CharacterSheetSection contém id, título e um array de CharacterSheetField associado a ele
    sectionId: number;
    characterId:number;
    handleEdit: (open: boolean) => void;
}

export const CharacterSheetPlayerEditSection = ({
    sectionTitle,
    sectionId,
    characterId,
    handleEdit
}: CharacterSheetSectionProps) => {

    const [campos,setCampos] = useState<SheetSubTab[]>();
    const [flag,setFlag] = useState(0);

    const mutation = useMutation({
        mutationKey: ["subTabs"],
        mutationFn: getCampaignSheetTemplateSubTabs,
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
                                    <CharacterSheetPlayerEditField fieldId={item.id} fieldTitle={item.nome} sectionId={sectionId} fieldType={item.tipo_sub_aba_ficha} characterId={characterId}/>
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