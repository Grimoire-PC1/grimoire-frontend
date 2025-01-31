import { System } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"


export interface SystemListCardProps {
    system: System; 
}

function openSystemDetails(){

}

export const SystemListCard = ({
    system,
}: SystemListCardProps) => {
    return(
        <CardRoot className="" cursor={"pointer"} onClick={()=>openSystemDetails()}>
                <Image
                src={system.image}
                className={"max-h-[25vh]"}
                />
            <CardBody>
                <Text fontSize={"lg"}>{system.name}</Text>
            </CardBody>
        </CardRoot>
    )
}