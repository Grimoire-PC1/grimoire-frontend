import {CardBody, CardRoot,For,IconButton, } from "@chakra-ui/react"
import { LuPencil, LuPlus, LuTrash2, LuUserRoundPen } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { useEffect, useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SheetSubTab } from "@/interfaces/Models";
import { getSystemSheetTemplateSubTabs } from "@/services/systemService";
import { CharacterSheetDeleteSectionDialog } from "../CharacterSheetComponents/CharacterSheetDeleteSectionDialog";
import { CharacterSheetEditSectionDialog } from "../CharacterSheetComponents/CharacterSheetEditSectionDialog";
import { CharacterSheetField } from "../CharacterSheetComponents/CharacterSheetField";
import { CharacterSheetNewFieldDialog } from "../CharacterSheetComponents/CharacterSheetNewFieldDialog";
import { SoundtrackEditSectionDialog } from "./SoundtrackEditSectionDialog";
import { SoundtrackDeleteSectionDialog } from "./SoundtrackDeleteSectionDialog";
import { SoundtrackNewFieldDialog } from "./SoundtrackNewFieldDialog";


export interface CharacterSheetSectionProps {
    sectionTitle: string;
    sectionId: number;
    handleEdit: (open: boolean) => void;
}

export const SoundtrackSection = ({
    sectionTitle,
    sectionId,
    handleEdit
}: CharacterSheetSectionProps) => {
    const [,forceUpdate] = useReducer(x=>x+1,0);

    const [campos,setCampos] = useState<SheetSubTab[]>();
    const [flag,setFlag] = useState(0);
    

    const mutation = useMutation({
        mutationKey: ["playlistsSubTabs"],
        mutationFn: getSystemSheetTemplateSubTabs, //mudar pra getPlaylistsSubTabs ou sla
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
                                <IconButton onClick={()=>setNewField(true)} rounded={"full"} size={"md"} variant={"outline"} aria-label="Novo link"> 
                                    <LuPlus />
                                </IconButton>
                                <IconButton onClick={()=>setEditSection(true)}  ml={2} rounded={"full"} size={"md"} variant={"outline"} aria-label="Renomear playlist"> 
                                    <LuPencil />
                                </IconButton>
                                <IconButton onClick={()=>setDeleteSection(true)} ml={2} rounded={"full"} size={"md"} variant={"outline"} aria-label="Excluir playlist"> 
                                    <LuTrash2 />
                                </IconButton>
                            </div>
                        </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

            <SoundtrackEditSectionDialog open={editSection} handleClose={setEditSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <SoundtrackDeleteSectionDialog open={deleteSection} handleClose={setDeleteSection} handleConfirm={fecharEforcar2} sectionId={sectionId} sectionName={sectionTitle}/>
            <SoundtrackNewFieldDialog open={newField} handleClose={setNewField} handleCreate={fecharEforcar} sectionId={sectionId} sectionName={sectionTitle}/>
        </div>
    )
}