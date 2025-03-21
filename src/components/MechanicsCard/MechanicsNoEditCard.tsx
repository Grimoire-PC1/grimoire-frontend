import {CardBody, CardRoot, Flex, Tag, Text } from "@chakra-ui/react"
import { LuDices, } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../ui/accordion";


export interface MechanicsCardProps {
    mechanicTitle: string; // mudar para o tipo Mechanic depois.
    mechanicId: string;
}

export const MechanicsNoEditCard = ({
    mechanicTitle,
    mechanicId
}: MechanicsCardProps) => {

    const mechanicDesc = "Descricao da minha mecanica muito legal, ela serve pra guiar a história pra tal coisa e tal coisa e tal coisa";
    const rollAtEveryXTurns = 9;

    return(
        <div>
            <CardRoot size={"sm"} cursor={"pointer"}>
                <CardBody>
                    <AccordionRoot collapsible cursor={"pointer"}>
                        <AccordionItem cursor={"pointer"} key={mechanicId} value={mechanicId}>
                        <AccordionItemTrigger fontSize={"xl"} placeContent={"space-between"} cursor={"pointer"}>
                            <LuDices /> {mechanicTitle}
                        </AccordionItemTrigger>
                        <AccordionItemContent cursor={"pointer"}>

                            <Text>{mechanicDesc}</Text>

                            {
                                rollAtEveryXTurns > 0?
                                <div>
                                    <Text mt={4}>Durante esta mecânica, os jogadores rolam a iniciativa a cada {rollAtEveryXTurns} rodada(s).</Text>
                                </div>
                                :
                                rollAtEveryXTurns == 0 ?
                                <div>
                                    <Text mt={4}>Os jogadores devem rolar iniciativa uma vez antes do início da mecânica.</Text>
                                </div>
                                :
                                <div>
                                </div>
                            }

                            <Text mt={4}>Ações disponíveis para o jogador:</Text>
                                <Flex gap={1} wrap={"wrap"}>
                                    <Tag.Root>
                                        <Tag.Label>Atacar</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Defender</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Esquivar</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Bloquear</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Magia</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Usar Item</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Esconder</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Perdeu turno</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Esquivar</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Bloquear</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Magia</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Usar Item</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Esconder</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Perdeu turno</Tag.Label>
                                    </Tag.Root>
                                </Flex>
                            <Text mt={4}>Efeitos que podem ocorrer ao jogador:</Text>
                                <Flex gap={1} wrap={"wrap"}>
                                    <Tag.Root>
                                        <Tag.Label>Machucado</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Desmaiado</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Enfeitiçado</Tag.Label>
                                    </Tag.Root>
                                    <Tag.Root>
                                        <Tag.Label>Nenhum efeito</Tag.Label>
                                    </Tag.Root>
                                </Flex>
                            </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </CardBody>
            </CardRoot>
            
        </div>
    )
}