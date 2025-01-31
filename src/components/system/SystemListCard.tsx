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
                src={system.image != '' ? system.image : "bg-linear-to-r from-purple-950 to-slate-500 h-[25vh]"}
                className={system.image == '' ? "h-[25vh] bg-[#]":"max-h-[25vh]"}
                />
            <CardBody>
                <Text fontSize={"lg"}>{system.name}</Text>
            </CardBody>
        </CardRoot>
    )
}