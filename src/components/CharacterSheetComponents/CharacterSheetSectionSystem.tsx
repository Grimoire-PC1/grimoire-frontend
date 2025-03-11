import {CardBody, CardRoot,For,IconButton, } from "@chakra-ui/react"
import { LuPencil, LuPlus, LuTrash2, LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { CharacterSheetField } from "./CharacterSheetField";
import { CharacterSheetEditSectionDialog } from "./CharacterSheetEditSectionDialog";
import { useEffect, useReducer, useState } from "react";
import { CharacterSheetDeleteSectionDialog } from "./CharacterSheetDeleteSectionDialog";
import { CharacterSheetNewFieldDialog } from "./CharacterSheetNewFieldDialog";
import { useMutation } from "@tanstack/react-query";
import { getCampaignSheetTemplateSubTabs } from "@/services/campaignService";
import { SheetSubTab } from "@/interfaces/Models";
import { getSystemSheetTemplateSubTabs } from "@/services/systemService";


export interface CharacterSheetSectionProps {
    sectionTitle: string; // mudar para o tipo CharacterSheetSection depois. O tipo CharacterSheetSection contém id, título e um array de CharacterSheetField associado a ele
    sectionId: number;
    handleEdit: (open: boolean) => void;
}

export const CharacterSheetSectionSystem = ({
    sectionTitle,
    sectionId,
    handleEdit
}: CharacterSheetSectionProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [campos,setCampos] = useState<SheetSubTab[]>();
    const [flag,setFlag] = useState(0);
    

    const mutation = useMutation({
        mutationKey: ["subTabs"],
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
    }, [campos]);

    function fecharEforcar(){
        mutation.mutate(sectionId);
        setNewField(false);
        forceUpdate();
    }

    function fecharEforcar2(){
        setEditSection(false);
        setDeleteSection(false);
        //location.reload();
        handleEdit(false);
    }
    

    const [editSection,setEditSection] = useState(false);
    const [newField,setNewField] = useState(false);
    const [deleteSection,setDeleteSection] = useState(false);
    
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
                                {(item) => <CharacterSheetField fieldId={item.id} fieldTitle={item.nome} fieldType={item.tipo_sub_aba_ficha} handleEdit={fecharEforcar}/>}
                            </For>
                            <div className="flex place-content-end">
                                <IconButton onClick={()=>setNewField(true)} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo Campo"> 
                                    <LuPlus />
                                </IconButton>
                                <IconButton onClick={()=>setEditSection(true)}  ml={2} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo Campo"> 
                                    <LuPencil />
                                </IconButton>
                                <IconButton onClick={()=>setDeleteSection(true)} ml={2} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo Campo"> 
                                    <LuTrash2 />
                                </IconButton>
                            </div>
                        </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

            <CharacterSheetEditSectionDialog open={editSection} handleClose={setEditSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <CharacterSheetDeleteSectionDialog open={deleteSection} handleClose={setDeleteSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <CharacterSheetNewFieldDialog open={newField} handleClose={setNewField} handleCreate={fecharEforcar} sectionId={sectionId} sectionName={sectionTitle}/>
        </div>
    )
}