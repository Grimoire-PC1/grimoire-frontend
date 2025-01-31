import { Character } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"


export interface CharacterProfileProps {
    character: Character; 
}

export const CampaignCard = ({
    character,
}: CharacterProfileProps) => {
    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                <Image 
                src={character.image}
                className="max-h-[25vh]"
                />
            <CardBody>
                <Text fontSize={"lg"}>{character.image}</Text>
            </CardBody>
        </CardRoot>
    )
}