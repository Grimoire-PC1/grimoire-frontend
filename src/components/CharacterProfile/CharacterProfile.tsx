import { Character } from "@/interfaces/Models"
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

        <Avatar mt={mt} mr={mr} ml={ml} mb={mb} className="cursor-pointer" size='xl' name={character.name} />    
            
    )
}