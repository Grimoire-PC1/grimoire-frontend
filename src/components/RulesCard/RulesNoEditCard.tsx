import {CardBody, CardRoot, Flex, IconButton, Text } from "@chakra-ui/react"
import { LuDices, LuPencil, LuTrash2 } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";
import { useState } from "react";
import { RulesCardEditDialog } from "./RulesCardEditDialog";
import { RulesCardDeleteDialog } from "./RulesCardDeleteDialog";


export interface RulesCardProps {
    ruleTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    ruleDesc: string;
    ruleId: string;
}

export const RulesNoEditCard = ({
    ruleTitle,
    ruleDesc,
    ruleId
}: RulesCardProps) => {

    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={ruleId} value={ruleId}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuDices /> {ruleTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent cursor={"pointer"}>
                            <Text>{ruleDesc}</Text>
                            </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>

        </div>
    )
}