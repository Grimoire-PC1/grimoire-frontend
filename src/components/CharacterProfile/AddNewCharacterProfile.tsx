import { Avatar } from "../ui/avatar";


export interface AddNewCharacterProfileProps {
    mt: string;
    mr: string,
    ml: string,
    mb: string,
}

export const AddNewCharacterProfile = ({
    mt,
    mr,
    ml,
    mb,
}: AddNewCharacterProfileProps) => {
    return(

        <Avatar mt={mt} mr={mr} ml={ml} mb={mb} className="cursor-pointer" size='xl' name="+" />    
            
    )
}