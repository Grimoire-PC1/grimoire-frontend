import {CardBody, CardRoot, Flex, For, IconButton, Tag, Text } from "@chakra-ui/react"
import { LuDices, LuPencil, LuPlay, LuTrash2 } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { useState } from "react";
import { MechanicCardEditDialog } from "./MechanicCardEditDialog";
import { MechanicCardDeleteDialog } from "./MechanicCardDeleteDialog";
import { PlayableMechanicCard } from "./PlayableMechanicCard";


export interface MechanicsCardProps {
    mechanicTitle: string; // mudar para o tipo Mechanic depois.
    mechanicId: number;
    mechanicDesc:string;
    mechanicActions:string[];
    mechanicEffects:string[];
    handleConfirm: (open: boolean) => void;
}

export const MechanicsCard = ({
    mechanicTitle,
    mechanicId,
    mechanicDesc,
    mechanicActions,
    mechanicEffects,
    handleConfirm
}: MechanicsCardProps) => {

    const [editDialog,setEditDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);
    //const [playDialog,setPlayDialog] = useState(false);

    console.log(mechanicActions)

    const [openPlayableMechanic,setOpenPlayableMechanic] = useState(false);

    function fecharEforcar(){
        setEditDialog(false);
        setDeleteDialog(false);
        handleConfirm(false);
    }

    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={mechanicId} value={String(mechanicId)}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuDices /> {mechanicTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent cursor={"pointer"}>

                            <Text>{mechanicDesc}</Text>

                            <Text mt={4}>Ações disponíveis para o jogador:</Text>
                                <Flex gap={1} wrap={"wrap"}>
                                    <For each={mechanicActions}>
                                        {(a)=>  <Tag.Root>
                                                    <Tag.Label>{a}</Tag.Label>
                                                </Tag.Root>
                                        }
                                    </For>
                                </Flex>
                            <Text mt={4}>Efeitos que podem ocorrer ao jogador:</Text>
                                <Flex gap={1} wrap={"wrap"}>
                                <For each={mechanicEffects}>
                                        {(e)=>  <Tag.Root>
                                                    <Tag.Label>{e}</Tag.Label>
                                                </Tag.Root>
                                        }
                                    </For>
                                </Flex>

                            <Flex placeContent={"flex-end"} gapX={2}>
                                <IconButton onClick={()=>setEditDialog(true)} size={"xs"} variant={"outline"} aria-label="Editar"> <LuPencil/> </IconButton>
                                <IconButton onClick={()=>setDeleteDialog(true)} size={"xs"} variant={"outline"} aria-label="Apagar"> <LuTrash2/> </IconButton>
                                <IconButton onClick={()=>setOpenPlayableMechanic(true)} size={"xs"} variant={"outline"} aria-label="Jogar"> <LuPlay /> </IconButton>
                            </Flex>
                            </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

            <MechanicCardEditDialog open={editDialog} handleClose={setEditDialog} handleConfirm={fecharEforcar} mechanicId={mechanicId} mechanicDesc={mechanicDesc} mechanicName={mechanicTitle} mechanicActions={mechanicActions} mechanicReactions={mechanicEffects}></MechanicCardEditDialog>
            <MechanicCardDeleteDialog open={deleteDialog} handleClose={setDeleteDialog} handleConfirm={fecharEforcar} mechanicId={mechanicId} mechanicName={mechanicTitle}></MechanicCardDeleteDialog>
            
            <PlayableMechanicCard open={openPlayableMechanic} handleClose={setOpenPlayableMechanic} mechanicId={mechanicId} mechanicName={mechanicTitle} mechanicActions={mechanicActions} mechanicReactions={mechanicEffects}/>
        
        </div>
    )
}