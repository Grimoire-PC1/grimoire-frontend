import {CardBody, CardRoot, Flex, Image, Text } from "@chakra-ui/react"
import { LuChevronDown, LuDices } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";


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
    return(
        <CardRoot size={"sm"} cursor={"pointer"}>
            <CardBody>
                <AccordionRoot collapsible cursor={"pointer"}>
                    <AccordionItem cursor={"pointer"} key={ruleId} value={ruleId}>
                    <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                        <LuDices /> {ruleTitle}
                    </AccordionItemTrigger>
                    <AccordionItemContent cursor={"pointer"}>{ruleDesc} </AccordionItemContent>
                    </AccordionItem>
                </AccordionRoot>
            </CardBody>
        </CardRoot>
    )
}