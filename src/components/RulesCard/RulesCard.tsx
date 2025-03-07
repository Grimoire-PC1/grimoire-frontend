import {CardBody, CardRoot, Flex, IconButton, Text } from "@chakra-ui/react"
import { LuPencil, LuScrollText, LuTrash2 } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { useState } from "react";
import { RulesCardEditDialog } from "./RulesCardEditDialog";
import { RulesCardDeleteDialog } from "./RulesCardDeleteDialog";


export interface RulesCardProps {
    ruleTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    ruleDesc: string;
    ruleId: string;
}

export const RulesCard = ({
    ruleTitle,
    ruleDesc,
    ruleId
}: RulesCardProps) => {

    const [editDialog,setEditDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);

    function fecharEforcar(){
        setEditDialog(false);
        setDeleteDialog(false);
        location.reload();
    }

    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={ruleId} value={ruleId}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuScrollText /> {ruleTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent cursor={"pointer"}>
                            <Text>{ruleDesc}</Text>
                            <Flex placeContent={"flex-end"} gapX={2}>
                                <IconButton onClick={()=>setEditDialog(true)} size={"xs"} variant={"outline"} aria-label="Editar"> <LuPencil/> </IconButton>
                                <IconButton onClick={()=>setDeleteDialog(true)} size={"xs"} variant={"outline"} aria-label="Apagar"> <LuTrash2/> </IconButton>
                            </Flex>
                            </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

            <RulesCardEditDialog open={editDialog} handleClose={setEditDialog} handleConfirm={fecharEforcar} ruleId={ruleId} ruleName={ruleTitle} ruleDesc={ruleDesc}></RulesCardEditDialog>
            <RulesCardDeleteDialog open={deleteDialog} handleClose={setDeleteDialog} handleConfirm={fecharEforcar} ruleId={ruleId}  ruleName={ruleTitle}></RulesCardDeleteDialog>

        </div>
    )
}