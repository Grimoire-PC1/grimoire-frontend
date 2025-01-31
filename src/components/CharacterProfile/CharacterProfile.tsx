import { Character } from "@/interfaces/Models"
import {CardBody, CardRoot, Image, Text } from "@chakra-ui/react"
import { Avatar } from "../ui/avatar";


export interface CharacterProfileProps {
    character: any; 
    mt: string;
    mr: string,
    ml: string,
    mb: string,
}

export const CharacterProfile = ({
    character,
    mt,
    mr,
    ml,
    mb,
}: CharacterProfileProps) => {
    return(

        <Avatar mt={mt} mr={mr} ml={ml} mb={mb} className="cursor-pointer" size='xl' name="Segun Adebayo" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />    
            
    )
}