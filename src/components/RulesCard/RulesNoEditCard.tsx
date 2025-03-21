import {CardBody, CardRoot, Text } from "@chakra-ui/react"
import { LuScrollText} from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";


export interface RulesCardProps {
    ruleTitle: string; // mudar para o tipo Rule depois. O tipo rule contém título e descrição, e talvez tag também 
    ruleDesc: string;
    ruleId: number;
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
                        <AccordionItem cursor={"pointer"} key={ruleId} value={String(ruleId)}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuScrollText /> {ruleTitle}
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